import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import ToolkitLogo from '@/app/(home)/logo.png';
import {
  appName,
  gitConfig,
  portfolioConfig,
  discordConfig,
  steamConfig,
} from './shared';
import { docsSections } from './sections';
import { TopicsMenu } from '@/components/topics-menu';

import { FaDiscord, FaSteam } from 'react-icons/fa';
import { LuGithub, LuGlobe } from 'react-icons/lu';

const iconLinks: LinkItemType[] = [
  {
    type: 'icon',
    label: 'GitHub',
    icon: <LuGithub />,
    text: 'GitHub',
    url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    external: true,
  },
  {
    type: 'icon',
    label: 'Portfolio',
    icon: <LuGlobe />,
    text: 'Portfolio',
    url: portfolioConfig.link,
    external: true,
  },
  {
    type: 'icon',
    label: 'Discord',
    icon: <FaDiscord />,
    text: 'Discord',
    url: discordConfig.link,
    external: true,
  },
  {
    type: 'icon',
    label: 'Steam',
    icon: <FaSteam />,
    text: 'Steam',
    url: steamConfig.link,
    external: true,
  },
];

/**
 * @param withSections put the documentation sections into the navbar. The home
 * page wants them; the docs layout already shows them as navbar tabs.
 */
export function baseOptions({ withSections = false }: { withSections?: boolean } = {}): BaseLayoutProps {
  const sectionLinks: LinkItemType[] = withSections
    ? [
        ...docsSections.slice(0, 3).map(
          (section): LinkItemType => ({
            type: 'main',
            text: section.title,
            url: section.url,
            active: 'nested-url',
          }),
        ),
        // desktop: the hover panel; the mobile menu gets the plain list below
        { type: 'custom', on: 'nav', children: <TopicsMenu /> },
        {
          type: 'menu',
          on: 'menu',
          text: 'Topics',
          items: docsSections.slice(3).map((section) => ({
            text: section.title,
            description: section.description,
            url: section.url,
            icon: <section.icon />,
          })),
        },
      ]
    : [];

  return {
    nav: {
      title: (
        <span className="flex items-center gap-2.5">
          <Image
            src={ToolkitLogo}
            alt=""
            width={26}
            height={26}
            className="rounded-[3px] ring-1 ring-fd-border object-cover"
          />
          <span className="font-semibold tracking-tight">{appName}</span>
        </span>
      ),
    },
    links: [...sectionLinks, ...iconLinks],
  };
}
