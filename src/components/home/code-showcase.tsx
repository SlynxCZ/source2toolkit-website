'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/code-block';

interface Sample {
  id: string;
  tab: string;
  file: string;
  title: string;
  description: string;
  bullets: string[];
  code: string;
}

const samples: Sample[] = [
  {
    id: 'entities',
    tab: 'Entities',
    file: 'entities.cpp',
    title: 'Work like you are inside the engine',
    description:
      'Controllers, pawns and schema fields are generated from the game itself. Read and write them exactly like native code — with or without automatic SetStateChanged.',
    bullets: ['Schema-based access', 'Automatic networking', 'Zero wrappers'],
    code: `
auto player = CCSPlayerController::FromSlot(1);
if (!player || player->IsBot())
    return;

player->PrintToCenterHtml("Hello from Source2Toolkit!");

auto pawn = player->GetPlayerPawn();
if (!pawn || !player->m_bPawnIsAlive())
    return;

pawn->m_iHealth = 1337; // With automatic SetStateChanged
player->m_iPawnHealth() = 1337; // Without automatic SetStateChanged`,
  },
  {
    id: 'hooks',
    tab: 'Hooks',
    file: 'movement_hook.cpp',
    title: 'Hook anything that exists in memory',
    description:
      'Pattern scan a module, point an inline hook at the address and take over the call. SourceHook is the engine, so it is the same vocabulary Metamod plugins already use.',
    bullets: ['Pattern scanning', 'Virtual & inline hooks', 'META_RES control'],
    code: `
SH_DECL_INLINEHOOK1_void(CheckJumpButtonLegacy, CCSPlayerLegacyJump, void*);

CConVarRef<bool> sv_autobunnyhopping("sv_autobunnyhopping");
IToolkitModule* libserver = IToolkitModule::New(g_pSource2Server);

m_addr = libserver->FindPattern(GAMECONFIG_SIGNATURE("CCSPlayerLegacyJump_CheckJumpButtonLegacy"));
m_iHookID = SH_ADD_INLINEHOOK(CheckJumpButtonLegacy, m_addr,
                              SH_MEMBER(this, &Plugin::Hook_CheckJumpButtonLegacy), false);

void Plugin::Hook_CheckJumpButtonLegacy(void* mv)
{
    CCSPlayerLegacyJump* pThis = META_IFACEPTR(CCSPlayerLegacyJump);

    CCSPlayer_MovementServices* ms = pThis->m_pMovementServices;
    CCSPlayerPawn* pawn = ms ? ms->GetPawn() : nullptr;
    CCSPlayerController* player = pawn ? pawn->GetController() : nullptr;

    bool canBhop = true;
    bool originalBhop = sv_autobunnyhopping.Get();

    if (canBhop && !originalBhop)
    {
        sv_autobunnyhopping.Set(true);
        SH_CALL(CheckJumpButtonLegacy, m_addr, pThis)(mv);
        sv_autobunnyhopping.Set(false);

        RETURN_META(MRES_SUPERCEDE);
    }

    RETURN_META(MRES_IGNORED);
}`,
  },
  {
    id: 'commands',
    tab: 'Commands',
    file: 'commands.cpp',
    title: 'Register commands in seconds',
    description:
      'Console commands, chat triggers and listeners for commands the game already owns — intercept them before the engine ever sees them.',
    bullets: ['Console & chat', 'Listeners on native commands', 'Supersede or ignore'],
    code: `
REG_CON_COMMAND("s2t_test", [](const CCommandContext& ctx, const CCommand&, bool)
{
    auto* player = CCSPlayerController::FromSlot(ctx.GetPlayerSlot());
    if (!player)
        return;

    player->PrintToChat("Hello!");
});

REG_CON_LISTENER("jointeam", [](const CCommandContext& ctx, const CCommand& args, bool) -> META_RES
{
    auto* player = CCSPlayerController::FromSlot(ctx.GetPlayerSlot());
    if (!player)
        return MRES_IGNORED;

    int team = args.ArgC() > 1 ? atoi(args.Arg(1)) : 0;

    if (team == 3)
    {
        if (!CanBeCt(player) || player->m_iTeamNum() == team)
            return MRES_SUPERCEDE;

        MoveToTeam(player, team);
        return MRES_SUPERCEDE;
    }

    return MRES_IGNORED;
}, false);`,
  },
  {
    id: 'events',
    tab: 'Events',
    file: 'events.cpp',
    title: 'Game events, typed and hookable',
    description:
      'Subscribe to any game event, pull typed data straight out of it and decide what the engine gets to do next. The trailing bool picks pre or post.',
    bullets: ['Every game event', 'Pre/Post timing', 'Typed accessors'],
    code: `
HOOK_GAME_EVENT("player_connect_full", [](IGameEvent* event, bool post, bool&) -> META_RES
{
    auto* player = static_cast<CCSPlayerController*>(event->GetPlayerController("userid"));
    if (!player)
        return MRES_IGNORED;

    TOOLKIT_LOG(&g_Plugin, "Player: %s\n", player->GetPlayerName());
    return MRES_IGNORED;
}, false);`,
  },
];

export function CodeShowcase() {
  const [active, setActive] = useState(samples[0].id);
  const current = samples.find((s) => s.id === active) ?? samples[0];

  return (
    <div className="grid gap-px border border-fd-border bg-fd-border lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
      {/* rail */}
      <div className="flex min-w-0 flex-row overflow-x-auto bg-fd-background lg:flex-col lg:overflow-visible">
        {samples.map((sample, index) => {
          const isActive = sample.id === current.id;
          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => setActive(sample.id)}
              className={`group relative flex shrink-0 items-center gap-3 px-5 py-4 text-left transition-colors lg:w-full ${
                isActive
                  ? 'bg-fd-muted text-fd-foreground'
                  : 'text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground'
              } cursor-pointer`}
            >
              <span
                className={`absolute inset-x-0 bottom-0 h-px lg:inset-y-0 lg:left-0 lg:h-auto lg:w-px ${
                  isActive ? 'bg-ember' : 'bg-transparent'
                }`}
                aria-hidden
              />
              <span className="s2-eyebrow text-fd-muted-foreground/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium">{sample.tab}</span>
            </button>
          );
        })}
        <div className="hidden flex-1 bg-fd-background lg:block" />
      </div>

      {/* panel */}
      <div className="min-w-0 bg-fd-background p-5 sm:p-8">
        <h3 className="text-2xl font-semibold sm:text-3xl">{current.title}</h3>
        <p className="mt-3 max-w-2xl text-fd-muted-foreground">
          {current.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {current.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 font-mono text-xs text-fd-muted-foreground"
            >
              <span className="size-1.5 bg-ember" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
        <CodeBlock
          key={current.id}
          className="mt-7"
          title={current.file}
          code={current.code}
        />
      </div>
    </div>
  );
}
