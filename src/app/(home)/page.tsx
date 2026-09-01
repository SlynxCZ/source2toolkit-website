import Link from 'next/link';
import Image from 'next/image';
import ToolkitLogo from './logo.png';
import {
  Activity,
  ArrowRight,
  Boxes,
  Braces,
  GitBranch,
  LayoutList,
  MemoryStick,
  Radio,
  ScanLine,
  Terminal,
} from 'lucide-react';
import { LuGithub } from 'react-icons/lu';
import { CodeBlock } from '@/components/code-block';
import { CodeShowcase } from '@/components/home/code-showcase';
import { DownloadMenu } from '@/components/home/download-menu';
import { docsRoute, gitConfig } from '@/lib/shared';

const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const heroCode = `
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
`;

const specs = [
  { label: 'Language', value: 'C++' },
  { label: 'Runs on', value: 'MetaMod:Source' },
  { label: 'Target', value: 'Counter-Strike 2' },
  { label: 'Overhead', value: 'Near-native' },
];

const marquee = [
  'schema system',
  'inline hooks',
  'virtual hooks',
  'pattern scanning',
  'game events',
  'net messages',
  'convars',
  'chat menus',
  'custom hud',
  'scheduler',
  'tracing',
  'gameconfig',
  'memory access',
  'http & json',
  'mysql',
  'dynamic libraries',
];

const capabilities = [
  {
    icon: Boxes,
    title: 'Schema system',
    body: 'Entities, offsets and fields resolved through the schema the game itself ships — not through headers that rot on the next update.',
  },
  {
    icon: GitBranch,
    title: 'Hooks on SourceHook',
    body: 'Virtual, DVP, manual and inline hooks on one private SourceHook engine, so the core and every plugin compose correctly.',
  },
  {
    icon: Terminal,
    title: 'Commands & ConVars',
    body: 'Console and chat commands, listeners on commands the game already owns, typed ConVar refs with replication.',
  },
  {
    icon: Activity,
    title: 'Events & GameEvents',
    body: 'A fully typed game event system on top of engine-level events, hooked pre or post with the usual META_RES vocabulary.',
  },
  {
    icon: MemoryStick,
    title: 'Memory & addresses',
    body: 'Raw pointers, module handles, GameConfig signatures and resolved engine functions like spawn, set model and take damage.',
  },
  {
    icon: ScanLine,
    title: 'Scheduler & tracing',
    body: 'Timers, next-frame execution, and ray and collision trace utilities shipped with the toolkit.',
  },
  {
    icon: LayoutList,
    title: 'Menus & custom HUD',
    body: 'Chat menus with options, titles and per-player state, plus click callbacks on custom HUD layout entities.',
  },
  {
    icon: Radio,
    title: 'Network messages',
    body: 'Allocate, send and hook Source 2 net messages by numeric ID or by partial name — protobuf included.',
  },
  {
    icon: Braces,
    title: 'HTTP, JSON & MySQL',
    body: 'Async requests through Steam, a JSON value API and typed MySQL result sets, so you do not vendor three libraries first.',
  },
];

const steps = [
  {
    title: 'Install MetaMod:Source',
    body: 'Source2Toolkit loads through MetaMod. Drop it into /game/csgo/ and register it in gameinfo.gi.',
    code: 'Game csgo/addons/metamod',
  },
  {
    title: 'Drop in the toolkit',
    body: 'Extract the release and copy the /addons directory into your server /game/csgo/ folder.',
    code: '/game/csgo/addons/source2toolkit',
  },
  {
    title: 'Verify and build',
    body: 'Restart the server, confirm the plugin is loaded, then start writing against the API.',
    code: 'meta list',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="s2-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-40 -left-32 size-[36rem] rounded-full bg-ember/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl border-fd-border px-6 py-20 md:border-x md:py-28">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <Image
                  src={ToolkitLogo}
                  alt="Source2Toolkit"
                  width={44}
                  height={44}
                  priority
                  className="rounded-[4px] ring-1 ring-fd-border"
                />
                <p className="s2-eyebrow flex items-center gap-2 text-fd-muted-foreground">
                  <span className="s2-dot inline-block size-1.5 bg-ember" />
                  Source 2 · C++ · Server side
                </p>
              </div>

              <h1 className="mt-8 text-[2.75rem] leading-[1.02] font-semibold sm:text-6xl">
                Direct access
                <br />
                to Source 2.
                <br />
                <span className="text-ember">No compromises.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fd-muted-foreground">
                A plugin framework for Counter-Strike 2 that keeps you at engine
                level. Schema-based entities, SourceHook detours and native
                events — in C++, with nothing between your code and the game.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={docsRoute}
                  className="flex items-center justify-center gap-2 bg-ember px-6 py-3 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
                >
                  Read the docs
                  <ArrowRight className="size-4" />
                </Link>
                <DownloadMenu />
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-px border border-fd-border bg-fd-border sm:grid-cols-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-fd-background px-4 py-3">
                    <dt className="s2-eyebrow text-fd-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative min-w-0 lg:mt-3">
              <div className="pointer-events-none absolute -inset-3 bg-gradient-to-br from-ember/15 via-transparent to-transparent blur-2xl" />
              <CodeBlock
                className="relative shadow-2xl shadow-black/10"
                title="hello_world.cpp"
                code={heroCode}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- marquee */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border md:border-x">
          <div className="overflow-hidden bg-fd-muted/40 py-3.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="s2-marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                  {marquee.map((item) => (
                    <span
                      key={item + copy}
                      className="s2-eyebrow flex items-center gap-7 px-7 text-fd-muted-foreground"
                    >
                      {item}
                      <span
                        className="size-1 rotate-45 bg-ember/70"
                        aria-hidden
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- capabilities */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-20 md:border-x md:py-24">
          <p className="s2-eyebrow text-ember">01 — Capabilities</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Built for engine-level development, not scripting
          </h2>
          <p className="mt-4 max-w-2xl text-fd-muted-foreground">
            Every subsystem is a thin, deliberate layer over the engine, and all
            of them ship in the box. Use the high-level API where it saves you
            time, and drop straight to memory where it does not.
          </p>

          <div className="mt-12 grid gap-px border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <article
                key={item.title}
                className="group relative bg-fd-background p-7 transition-colors hover:bg-fd-muted/50"
              >
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <item.icon className="size-5 text-ember" />
                  <span className="s2-eyebrow text-fd-muted-foreground/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fd-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- showcase */}
      <section className="border-b border-fd-border bg-fd-muted/25">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-20 md:border-x md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="s2-eyebrow text-ember">02 — In practice</p>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold sm:text-4xl">
                The same API you would have written yourself
              </h2>
            </div>
            <Link
              href={docsRoute}
              className="group flex items-center gap-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground"
            >
              Browse the full API
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12">
            <CodeShowcase />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ quickstart */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-20 md:border-x md:py-24">
          <p className="s2-eyebrow text-ember">03 — Quickstart</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Three steps to a loaded plugin
          </h2>

          <ol className="mt-12 grid gap-px border border-fd-border bg-fd-border md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-fd-background p-7">
                <span className="s2-eyebrow inline-flex size-8 items-center justify-center border border-fd-border text-ember">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fd-muted-foreground">
                  {step.body}
                </p>
                <code className="mt-5 block overflow-x-auto border border-fd-border bg-fd-muted/60 px-3 py-2 font-mono text-xs whitespace-nowrap text-fd-foreground">
                  {step.code}
                </code>
              </li>
            ))}
          </ol>

          <Link
            href={`${docsRoute}/installation`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ember"
          >
            Full installation guide
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------- cta */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="s2-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 size-[32rem] rounded-full bg-ember/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl border-fd-border px-6 py-24 text-center md:border-x">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl">
            Stop fighting the engine. Start using it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fd-muted-foreground">
            Open source, actively developed, and built by people running real
            servers.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={docsRoute}
              className="flex items-center justify-center gap-2 bg-ember px-6 py-3 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-fd-border bg-fd-card px-6 py-3 text-sm font-medium transition-colors hover:border-ember/60 hover:bg-fd-muted"
            >
              <LuGithub className="size-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- footer */}
      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-fd-border px-6 py-10 text-xs text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between md:border-x">
        <p className="font-mono">Source2Toolkit — built by Slynx</p>
        <p>Not affiliated with Valve Corporation.</p>
      </footer>
    </main>
  );
}
