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
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative w-[500px] h-[210px] mx-auto">
            <Image
              src={ToolkitLogo}
              alt="Source2Toolkit Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-orange-400">Source2</span>
            <span className="text-blue-400">Toolkit</span>
          </h1>
          <p className="text-xl text-gray-500">
            Direct access to Source 2. No compromises.
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Build plugins that feel like native engine code.
            From simple features to deep engine hooks — all in C++ with full control over Source 2 internals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/docs"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Read Docs
            </Link>
            <div className="relative" ref={downloadRef}>
              <button
                onClick={() => setDownloadOpen(v => !v)}
                className="px-8 py-3 rounded-lg flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
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
          <div className="pt-10 text-start">
            <CodeBlock
              title="Quick Example"
              code={`
#include "source2toolkit/IToolkitPlugin.h"
#include "source2toolkit/IToolkitApi.h"

class ExamplePlugin final : public IToolkitPlugin, IToolkitListener
{
public:
    bool Load(PluginId id, IToolkitAPI* api, char* error, size_t maxlen, bool late) override
    {
        TOOLKIT_SAVEVARS();

        api->AddListener(this, this);

        TOOLKIT_LOG(this, "Hello World! We are loading!\\n");

        return true;
    }

    bool Unload(char* error, size_t maxlen) override
    {
        TOOLKIT_LOG(this, "Hello World! We are unloading!\\n");
        return true;
    }

private:
    const char* GetName() override { return "Example: Hello World"; }
    const char* GetVersion() override { return "1.0.0"; }
    const char* GetAuthor() override { return "Slynx"; }
    const char* GetDescription() override { return "A simple plugin that says hello world!"; }
};

ExamplePlugin g_Plugin;
TOOLKIT_EXPOSE(source2toolkit_example, g_Plugin);
            `}/>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-neutral-100 dark:bg-neutral-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-orange-400">
              Why Source2Toolkit?
            </h2>
            <p className="text-gray-500">
              Built for real engine-level development — not just scripting
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl hover:bg-neutral-900/20 transition">
              <LuCode className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">High-Level API</h3>
              <p className="text-gray-500 text-sm">
                Clean abstractions for rapid plugin development without boilerplate.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:bg-neutral-900/20 transition">
              <LuCpu className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Low-Level Access</h3>
              <p className="text-gray-500 text-sm">
                Full control over memory, hooks, entities and engine internals.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:bg-neutral-900/20 transition">
              <LuWrench className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Zero Overhead</h3>
              <p className="text-gray-500 text-sm">
                Designed for near-native performance with no unnecessary layers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Work Like You're Inside The Engine
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Access entities, memory and schema data exactly like native code.
                No wrappers. No limitations.
              </p>
              <ul className="text-gray-500 space-y-2">
                <li>✓ Schema-based entity access</li>
                <li>✓ Direct memory manipulation</li>
                <li>✓ Native-like workflow</li>
                <li>✓ Full control</li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-2xl" />
              <div className="relative border rounded-2xl bg-neutral-950/80 backdrop-blur shadow-xl">
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
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl rounded-2xl" />
              <div className="relative border rounded-2xl bg-neutral-950/80 backdrop-blur shadow-xl">
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
              </div>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <h3 className="text-3xl font-bold">
                Hook Anything
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Inline hooks, virtual hooks, commands, events — if it exists in memory, you can control it.
              </p>
              <ul className="text-gray-500 space-y-2">
                <li>✓ Pattern scanning</li>
                <li>✓ Virtual hooks</li>
                <li>✓ Command & event hooks</li>
                <li>✓ Full flexibility</li>
              </ul>
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

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-xl rounded-2xl" />
              <div className="relative border rounded-2xl bg-neutral-950/80 backdrop-blur shadow-xl">
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