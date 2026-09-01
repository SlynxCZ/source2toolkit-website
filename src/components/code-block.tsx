'use client';

import { codeToHtml } from 'shiki';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  lang = 'cpp',
  title,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighted = await codeToHtml(code.trim(), {
          lang,
          theme: resolvedTheme === 'dark' ? 'vesper' : 'github-light',
          transformers: showLineNumbers
            ? [
                {
                  line(node, line) {
                    node.properties['data-line'] = line;
                  },
                },
              ]
            : [],
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

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const onCopy = () => {
    void navigator.clipboard.writeText(code.trim()).then(() => setCopied(true));
  };

  return (
    <figure
      className={cn(
        'group relative border border-fd-border bg-fd-card overflow-hidden',
        className,
      )}
    >
      <figcaption className="flex items-center gap-2.5 border-b border-fd-border bg-fd-muted/50 px-3 py-2">
        <span className="size-2 bg-ember shrink-0" aria-hidden />
        <span className="s2-eyebrow text-fd-muted-foreground truncate">
          {title ?? lang}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy code"
          className="ml-auto shrink-0 text-fd-muted-foreground hover:text-fd-foreground transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="size-3.5 text-ember" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </figcaption>

      {loading ? (
        <div className="p-4 font-mono text-xs text-fd-muted-foreground">
          <span className="s2-dot">…</span> highlighting
        </div>
      ) : (
        <div
          className="overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:m-0 [&_code]:text-[13px] [&_code]:leading-relaxed [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </figure>
  );
}
