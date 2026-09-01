import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { appName } from '@/lib/shared';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${appName} — Source 2 plugin framework for C++`,
    template: `%s · ${appName}`,
  },
  description:
    'Direct access to Source 2. Schema-generated entities, inline and virtual hooks, commands and events — written in C++ with no layers in between.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-fd-background">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
