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
      title: appName,
    },
    links: [
      {
        type: 'icon',
        icon: <LuGithub />,
        url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        label: 'GitHub',
      },
      {
        type: 'icon',
        icon: <LuGlobe />,
        url: portfolioConfig.link,
        label: 'Portfolio',
      },
      {
        type: 'icon',
        icon: <FaDiscord />,
        url: discordConfig.link,
        label: 'Discord',
      },
      {
        type: 'icon',
        icon: <FaSteam />,
        url: steamConfig.link,
        label: 'Steam',
      },
    ],
  };
}