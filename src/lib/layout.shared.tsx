import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import ToolkitLogo from '@/app/(home)/logo.png';
import {
  appName,
  docsRoute,
  gitConfig,
  portfolioConfig,
  discordConfig,
  steamConfig,
} from './shared';

import { FaDiscord, FaSteam } from 'react-icons/fa';
import { LuGithub, LuGlobe } from 'react-icons/lu';

export function baseOptions(): BaseLayoutProps {
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
    links: [
      {
        type: 'main',
        text: 'Documentation',
        url: docsRoute,
      },
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
    ],
  };
}
