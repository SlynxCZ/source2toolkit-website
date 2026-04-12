"use client";

import Link from 'next/link';
import Image from 'next/image';
import ToolkitLogo from "./logo.png";
import { useEffect, useRef, useState } from 'react';
import { LuDownload, LuCpu, LuCode, LuWrench } from 'react-icons/lu';
import { CodeBlock } from '@/components/code-block';

export default function HomePage() {
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!downloadRef.current?.contains(event.target as Node)) {
        setDownloadOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDownloadOpen(false);
    };

    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keyup', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keyup', handleKey);
    };
  }, []);

  return (
    <main className="flex flex-1 flex-col">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-orange-400">Source2</span>
              <span className="text-blue-400">Toolkit</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The ultimate Source 2 scripting layer for Metamod:Source
            </p>
            <p className="text-gray-500 max-w-xl">
              Low-level power. High-level simplicity.
              Build anything from simple plugins to advanced engine hooks with full access to Source 2 internals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-4">
              <Link
                href="/docs"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium"
              >
                Get Started
              </Link>
              <div className="relative" ref={downloadRef}>
                <button
                  onClick={() => setDownloadOpen(v => !v)}
                  className="border px-8 py-3 rounded-md flex items-center justify-center w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                >
                  <LuDownload className="w-4 h-4" />
                  Download
                </button>
                <div className={`absolute mt-2 bg-white dark:bg-neutral-900 border rounded-md shadow-xl ${
                  isDownloadOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <a
                    href="https://github.com/SlynxCZ/source2toolkit/releases"
                    className="block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Latest Release
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src={ToolkitLogo} alt="Source2Toolkit Logo" width={500} height={500} />
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-neutral-100 dark:bg-neutral-950/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-orange-400">
            Why Source2Toolkit?
          </h2>
          <p className="text-gray-500">
            Designed for both beginners and hardcore engine hackers
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <LuCode className="mx-auto w-10 h-10 text-blue-400" />
            <h3 className="text-xl font-semibold">High-Level API</h3>
            <p className="text-gray-500">
              Easy-to-use abstractions for rapid plugin development.
            </p>
          </div>
          <div className="text-center space-y-4">
            <LuCpu className="mx-auto w-10 h-10 text-green-400" />
            <h3 className="text-xl font-semibold">Low-Level Access</h3>
            <p className="text-gray-500">
              Full control over memory, hooks, entities and engine internals.
            </p>
          </div>
          <div className="text-center space-y-4">
            <LuWrench className="mx-auto w-10 h-10 text-purple-400" />
            <h3 className="text-xl font-semibold">Metamod Ready</h3>
            <p className="text-gray-500">
              Built specifically for Metamod:Source with deep engine integration.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Full Engine Access
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Direct access to Source 2 internals through schema system.
                Work with entities, memory and engine structures like you are inside the game itself.
              </p>
              <ul className="text-gray-500 space-y-2">
                <li>✓ Schema-based entity access</li>
                <li>✓ Direct memory manipulation</li>
                <li>✓ No wrappers or limitations</li>
                <li>✓ Works exactly like native code</li>
              </ul>
            </div>
            <CodeBlock
              title="Entity Access"
              code={`
auto player = CCSPlayerController::FromSlot(1);
if (!player || player->IsBot())
    return;

player->PrintToCenterHtml("Hello from Source2Toolkit!");

auto pawn = player->GetPlayerPawn();
if (!pawn || !player->m_bPawnIsAlive())
    return;

pawn->m_iHealth = 1337; // With automatic SetStateChanged
player->m_iPawnHealth() = 1337; // Without automatic SetStateChanged`}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <CodeBlock
              title="Inline Hook (ProcessMovement)"
              code={`
uintptr_t addr = UTIL_FindPattern(g_ToolkitAPI->GetSource2Server(), UTIL_GetSignature("CCSPlayer_MovementServices_ProcessMovement"));
m_ProcessMovement.Configure(reinterpret_cast<void(*)(CCSPlayer_MovementServices*, void*, void*)>(addr));

KHook::Return<void> Hook_ProcessMovementPre(CCSPlayer_MovementServices* pThis, void*, void*)
{
    if (!pThis)
        return { KHook::Action::Ignore };

    auto* pawn = pThis->GetPlayerPawn();
    if (!pawn)
        return { KHook::Action::Ignore };

    auto* player = pawn->GetController();
    if (!player)
        return { KHook::Action::Ignore };

    UTIL_SetConVarBool(UTIL_FindConVar("sv_autobunnyhopping"), true);
    player->ReplicateConVar("sv_autobunnyhopping", "true");

    return { KHook::Action::Ignore };
}`}
            />
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Hook Everything
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Full control over the engine. Hook virtual functions, inline functions,
                commands, events or anything you can find in memory.
              </p>
              <ul className="text-gray-500 space-y-2">
                <li>✓ Inline hooks (pattern scanning)</li>
                <li>✓ Virtual hooks</li>
                <li>✓ Command & event hooks</li>
                <li>✓ Signature scanning</li>
              </ul>
              <p className="text-gray-400 text-sm">
                No restrictions. If it exists in memory, you can hook it.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Commands & Events
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                High-level API for common tasks like commands and game events.
                Clean, simple and powerful.
              </p>
              <ul className="text-gray-500 space-y-2">
                <li>✓ Register commands in seconds</li>
                <li>✓ Hook console and chat</li>
                <li>✓ Hook game events</li>
                <li>✓ Pre/Post execution control</li>
              </ul>
            </div>
            <CodeBlock
              title="Commands & Events"
              code={`
UTIL_RegConCommand("s2t_test", [](const CCommandContext& ctx, const CCommand&, Mode)
{
    auto* player = CCSPlayerController::FromSlot(ctx.GetPlayerSlot());
    if (!player)
        return;

    player->PrintToChat("Hello!");
});

UTIL_RegConListener("jointeam", [](const CCommandContext& ctx, const CCommand&, Mode)
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
});

UTIL_RegGameEvent("player_connect_full", [](IGameEvent* event, Mode, bool&)
{
    auto* player = static_cast<CCSPlayerController*>(event->GetPlayerController("userid"));
    if (!player)
        return Action::Ignore;

    TOOLKIT_LOG(&g_Plugin, "Player: %s\\n", player->GetPlayerName());
    return Action::Ignore;
}, Mode::Pre);`}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <CodeBlock
              title="Scheduler"
              code={`
UTIL_NextFrame([]() {
    TOOLKIT_LOG(&g_Plugin, "Next tick!");
});

UTIL_AddTimer(1.0f, []() {
    TOOLKIT_LOG(&g_Plugin, "After 1 second!");
});`}
            />
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Built-in Systems
              </h3>
              <p className="text-gray-500 mb-4">
                Everything you need is already included.
              </p>
              <ul className="text-gray-500 space-y-2">
                <li>✓ GameConfig system</li>
                <li>✓ Dynamic libraries</li>
                <li>✓ Scheduler & timers</li>
                <li>✓ ConVars & commands</li>
                <li>✓ Trace system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 text-center border-t">
        <p className="text-sm text-gray-500">
          Source2Toolkit is not affiliated with Valve Corporation.
        </p>
      </section>
    </main>
  );
}