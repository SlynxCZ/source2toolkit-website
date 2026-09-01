'use client';

import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuDownload, LuExternalLink } from 'react-icons/lu';
import { gitConfig } from '@/lib/shared';

const releasesUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/releases`;

const builds = [
  {
    label: 'Latest release',
    hint: 'stable · tagged',
    href: `${releasesUrl}/latest`,
  },
  {
    label: 'All releases',
    hint: 'changelog · archives',
    href: releasesUrl,
  },
  {
    label: 'Source code',
    hint: 'build it yourself',
    href: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  },
];

export function DownloadMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keyup', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keyup', handleKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex w-full items-center justify-center gap-2 border border-fd-border bg-fd-card px-5 py-3 text-sm font-medium text-fd-foreground transition-colors hover:border-ember/60 hover:bg-fd-muted cursor-pointer"
      >
        <LuDownload className="size-4" />
        Download
        <LuChevronDown
          className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        role="menu"
        className={`absolute left-0 right-0 z-30 mt-1 min-w-[16rem] border border-fd-border bg-fd-popover shadow-xl transition-all duration-150 ${
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <p className="s2-eyebrow border-b border-fd-border px-4 py-2 text-fd-muted-foreground">
          Choose build
        </p>
        {builds.map((build) => (
          <a
            key={build.label}
            href={build.href}
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            className="flex items-center gap-3 border-b border-fd-border/60 px-4 py-3 text-sm last:border-b-0 hover:bg-fd-muted"
          >
            <span className="flex-1">
              <span className="block font-medium">{build.label}</span>
              <span className="block font-mono text-[11px] text-fd-muted-foreground">
                {build.hint}
              </span>
            </span>
            <LuExternalLink className="size-3.5 text-fd-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  );
}
