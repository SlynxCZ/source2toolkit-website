'use client';

import { codeToHtml } from 'shiki';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, lang = 'cpp', title, showLineNumbers = false }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighted = await codeToHtml(code.trim(), {
          lang,
          theme: resolvedTheme === 'dark' ? 'github-dark' : 'github-light',
          transformers: showLineNumbers ? [{
            line(node, line) {
              node.properties['data-line'] = line;
            }
          }] : []
        });
        setHtml(highlighted);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setLoading(false);
      }
    };

    highlight();
  }, [code, lang, showLineNumbers, resolvedTheme]);

  if (loading) {
    return (
      <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-8 border border-neutral-200 dark:border-neutral-800">
        <div className="text-gray-500 text-sm text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 text-sm text-gray-600 dark:text-gray-400 font-medium">
          {title}
        </div>
      )}
      <div
        className="overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:m-0 [&_code]:text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}