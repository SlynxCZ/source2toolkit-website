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
    tab: 'Game hooks',
    file: 'bhop.cpp',
    title: 'Hook the game without a signature',
    description:
      'The core hooks the functions plugins reach for most — TakeDamage, CanAcquire, PostThink, the movement and jump code — from its own gamedata. Register a handler, get a context, answer like KHook does. No signature, no prototype, no rebuild when Valve moves an argument.',
    bullets: ['~35 game functions', 'Survives engine updates', 'CallOriginal & { action, value }'],
    code: `
CConVarRef<bool> sv_autobunnyhopping("sv_autobunnyhopping");

// No KHOOK_INIT(), no signature: the core places the detour from its gamedata
// the first time anybody listens, and whose handler it is, it reads off it.
g_pToolkitGameHooks->HookCheckJumpButtonLegacy([](LegacyJumpContext& ctx, bool post) -> Action
{
    if (sv_autobunnyhopping.Get())
        return Action::Ignore;

    // The game's own code, right now, with bunnyhopping on for this one call.
    sv_autobunnyhopping.Set(true);
    ctx.CallOriginal();
    sv_autobunnyhopping.Set(false);

    return Action::Supersede;   // it has run already
}, false);

// A function with a return value: the value goes with the action.
g_pToolkitGameHooks->HookTakeDamage([](TakeDamageContext& ctx, bool post) -> GameHookReturn<TakeDamageContext::Return>
{
    if (IsSpawnProtected(ctx.entity))
        return { Action::Supersede, 0 };

    return Action::Ignore;
}, false);`,
  },
  {
    id: 'khook',
    tab: 'KHook',
    file: 'switch_team.cpp',
    title: 'And anything else that exists in memory',
    description:
      'What the game hooks do not cover, hook yourself: a gamedata entry, an address the toolkit already resolved, or a pattern of your own. KHook is the engine Metamod itself runs, so it is the same vocabulary Metamod plugins already use.',
    bullets: ['Gamedata, addresses & patterns', 'Virtual & function hooks', 'KHook::Action control'],
    code: `
class Plugin final : public IToolkitPlugin
{
    KHook::Return<void> Hook_SwitchTeam(CCSPlayerController* pThis, int nTeam);
    KHook::Return<void> Hook_SnapViewAngles(CBasePlayerPawn* pThis, QAngle* pAngles);

    // A gamedata entry by name: a game update is a gamedata update.
    KHOOK_MEMBER(m_hSwitchTeam, "CCSPlayerController::SwitchTeam", &Plugin::Hook_SwitchTeam, nullptr);

    // A pattern of your own, the platform's picked at compile time.
    KHOOK_MEMBER(m_hSnapViewAngles,
                 g_pServerModule->FindPattern(WIN_LINUX("48 89 7C 24 ? 55 48 8B EC", "55 48 89 E5 41 57 49 89 FF")),
                 &Plugin::Hook_SnapViewAngles, nullptr);
};

KHook::Return<void> Plugin::Hook_SwitchTeam(CCSPlayerController* pThis, int nTeam)
{
    if (nTeam == CS_TEAM_SPECTATOR && IsInDuel(pThis))
        return { KHook::Action::Supersede };   // stays where they are

    return { KHook::Action::Ignore };
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
g_pToolkitCommands->RegisterConCommand("s2t_test", [](const ToolkitCommandContext& ctx, const ToolkitCommandArgs&, bool)
{
    auto* player = CCSPlayerController::FromSlot(ctx.GetPlayerSlot());
    if (!player)
        return;

    player->PrintToChat("Hello!");
});

g_pToolkitCommands->RegisterConListener("jointeam", [](const ToolkitCommandContext& ctx, const ToolkitCommandArgs& args, bool) -> Action
{
    auto* player = CCSPlayerController::FromSlot(ctx.GetPlayerSlot());
    if (!player)
        return Action::Ignore;

    int team = args.ArgC() > 1 ? atoi(args.Arg(1)) : 0;

    if (team == 3)
    {
        if (!CanBeCt(player) || player->m_iTeamNum() == team)
            return Action::Supersede;

        MoveToTeam(player, team);
        return Action::Supersede;
    }

    return Action::Ignore;
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
HOOK_GAME_EVENT("player_connect_full", [](IGameEvent* event, bool post, bool&) -> Action
{
    auto* player = static_cast<CCSPlayerController*>(event->GetPlayerController("userid"));
    if (!player)
        return Action::Ignore;

    TOOLKIT_LOG(&g_Plugin, "Player: %s\\n", player->GetPlayerName());
    return Action::Ignore;
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
