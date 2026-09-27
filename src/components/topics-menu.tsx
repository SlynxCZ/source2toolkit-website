'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { docsSections } from '@/lib/sections';

/**
 * The "Topics" entry of the home navbar: opens on hover (or keyboard focus) into
 * a two-column panel of the topic sections, each with an icon tile, and a footer
 * link to the documentation overview.
 */
export function TopicsMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const topics = docsSections.slice(3);
  const active = topics.some((t) => pathname.startsWith(t.url));

  useEffect(() => setOpen(false), [pathname]);

  const close = () => setOpen(false);

  return (
    <div
      className="group/topics relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') return;
        (document.activeElement as HTMLElement | null)?.blur();
        close();
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground ${
          open || active ? 'bg-fd-accent text-fd-accent-foreground' : 'text-fd-muted-foreground'
        }`}
      >
        Topics
        <ChevronDown
          className={`size-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-150 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible translate-y-1 opacity-0 group-has-[:focus-visible]/topics:visible group-has-[:focus-visible]/topics:translate-y-0 group-has-[:focus-visible]/topics:opacity-100'
        }`}
      >
        <div className="w-[560px] overflow-hidden rounded-lg border border-fd-border bg-fd-popover shadow-2xl shadow-black/40">
          <div className="h-0.5 bg-gradient-to-r from-ember via-ember-soft/60 to-transparent" />
          <div className="grid grid-cols-2 gap-0.5 p-2">
            {topics.map((topic) => (
              <Link
                key={topic.url}
                href={topic.url}
                onClick={close}
                className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-fd-accent"
              >
                <span className="s2-icon-tile mt-0.5 size-8">
                  <topic.icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-fd-foreground">{topic.title}</span>
                  <span className="block text-xs leading-snug text-fd-muted-foreground">
                    {topic.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/docs"
            onClick={close}
            className="flex items-center justify-between border-t border-fd-border bg-fd-muted/50 px-5 py-3 text-xs font-semibold text-ember transition-colors hover:text-fd-foreground"
          >
            All documentation
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
