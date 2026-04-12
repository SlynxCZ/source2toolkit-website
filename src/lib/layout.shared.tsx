import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {
  appName,
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
      title: <>{appName}</>,
    },
    links: [
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