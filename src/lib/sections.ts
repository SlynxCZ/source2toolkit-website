import {
  Activity,
  BookOpen,
  Boxes,
  Braces,
  Database,
  GitBranch,
  PanelsTopLeft,
  Radio,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

export interface DocsSection {
  title: string;
  /** short label for tight spots (mobile nav) */
  short?: string;
  url: string;
  icon: LucideIcon;
  description: string;
}

/**
 * The top-level sections of the documentation, in navbar order. Each one is a
 * root folder in content/docs (its meta.json has `"root": true`), so it gets its
 * own sidebar; this list is what the home page and the menus show.
 */
export const docsSections: DocsSection[] = [
  {
    title: 'Docs',
    url: '/docs',
    icon: BookOpen,
    description: 'Introduction, installation, development and guides.',
  },
  {
    title: 'API',
    url: '/docs/core-api',
    icon: Braces,
    description: 'Every interface, type and macro of the SDK.',
  },
  {
    title: 'Schema',
    url: '/docs/schema',
    icon: Database,
    description: 'Entity classes, enums and engine structures.',
  },
  {
    title: 'ConVars & Commands',
    short: 'Commands',
    url: '/docs/convars-commands',
    icon: Terminal,
    description: 'Console variables, console and chat commands.',
  },
  {
    title: 'Entities',
    url: '/docs/entities',
    icon: Boxes,
    description: 'Finding, creating and changing entities and players.',
  },
  {
    title: 'Protobuf',
    url: '/docs/protobuf',
    icon: Radio,
    description: 'Sending and hooking network and user messages.',
  },
  {
    title: 'Events',
    url: '/docs/events',
    icon: Activity,
    description: 'Game events and the toolkit\'s listener callbacks.',
  },
  {
    title: 'Panorama',
    url: '/docs/panorama',
    icon: PanelsTopLeft,
    description: 'Server-driven custom HUD layouts.',
  },
  {
    title: 'Hooks',
    url: '/docs/hooks',
    icon: GitBranch,
    description: 'KHook detours, engine addresses and gamedata.',
  },
];
