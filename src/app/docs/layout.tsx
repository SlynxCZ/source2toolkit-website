import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const base = baseOptions();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...base}
      // every root folder of content/docs (Docs, API, Schema, ConVars & Commands,
      // ...) becomes a tab in the top bar, each with a sidebar of its own
      tabMode="navbar"
      nav={{ ...base.nav, mode: 'top' }}
    >
      {children}
    </DocsLayout>
  );
}
