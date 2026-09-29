import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { FaDiscord, FaSteam } from 'react-icons/fa';
import { LuGithub, LuGlobe } from 'react-icons/lu';
import ToolkitLogo from '@/app/(home)/logo.png';
import { discordConfig, docsRoute, gitConfig, portfolioConfig, steamConfig } from '@/lib/shared';
import { docsSections } from '@/lib/sections';

const gh = `https://github.com/${gitConfig.user}`;

const socials = [
  { label: 'Discord', href: discordConfig.link, icon: FaDiscord },
  { label: 'GitHub', href: `${gh}/${gitConfig.repo}`, icon: LuGithub },
  { label: 'Steam', href: steamConfig.link, icon: FaSteam },
  { label: 'Portfolio', href: portfolioConfig.link, icon: LuGlobe },
];

interface FooterLink {
  label: string;
  href: string;
}

const project: FooterLink[] = [
  { label: 'Core', href: `${gh}/source2toolkit` },
  { label: 'SDK', href: `${gh}/source2toolkit-sdk` },
  { label: 'Releases', href: `${gh}/source2toolkit/releases` },
  { label: 'Issues', href: `${gh}/source2toolkit/issues` },
  { label: 'Sample plugin', href: `${gh}/source2toolkit/tree/main/samples/cs2_sample` },
];

const help: FooterLink[] = [
  { label: 'Installation', href: `${docsRoute}/installation` },
  { label: 'FAQ', href: `${docsRoute}/resources/faq` },
  { label: 'Links', href: `${docsRoute}/resources/links` },
  { label: 'Contributing', href: `${docsRoute}/development/contributing` },
  { label: 'Credits', href: `${docsRoute}/resources/credits` },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-fd-border bg-fd-card/40">
      <div className="h-1 bg-gradient-to-r from-ember/30 via-ember to-ember/30" />

      <div className="mx-auto grid max-w-6xl gap-10 border-fd-border px-6 py-12 md:grid-cols-2 md:border-x lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="min-w-0">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src={ToolkitLogo} alt="" width={28} height={28} className="size-7" />
            <span className="text-base font-semibold">Source2Toolkit</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fd-muted-foreground">
            A native C++ plugin framework for Counter-Strike 2 servers, running on
            Metamod:Source. Open source under the GPLv3; your plugins can be
            licensed however you like.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={label}
                  aria-label={label}
                  className="flex size-9 items-center justify-center border border-fd-border text-fd-muted-foreground transition-colors hover:border-ember hover:bg-ember/10 hover:text-fd-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn
          title="Documentation"
          links={docsSections.map((s) => ({ label: s.title, href: s.url }))}
        />
        <FooterColumn title="Project" links={project} />

        <div>
          <FooterColumn title="Help" links={help} />
          <a
            href={discordConfig.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 flex w-full items-center justify-center gap-2 bg-ember px-4 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            <FaDiscord className="size-4" />
            Join the Discord
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-fd-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-fd-border px-6 py-5 text-xs text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between md:border-x">
          <p className="font-mono">
            © {new Date().getFullYear()} Source2Toolkit ·{' '}
            <a
              href={portfolioConfig.link}
              target="_blank"
              rel="noreferrer noopener"
              className="text-fd-foreground transition-colors hover:text-ember"
            >
              Michal Přikryl
            </a>
          </p>
          <p>Not affiliated with Valve Corporation.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="s2-eyebrow border-b border-ember pb-3 text-ember">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => {
          const external = link.href.startsWith('http');
          const cls = 'text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground';
          return (
            <li key={link.href}>
              {external ? (
                <a href={link.href} target="_blank" rel="noreferrer noopener" className={cls}>
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={cls}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
