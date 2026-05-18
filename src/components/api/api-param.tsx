import type { ReactNode } from 'react';

interface ApiParamProps {
  name?: string;
  type: string;
  typeHref?: string;
  children?: ReactNode;
}

function parseTypeLink(type: string): { text: string; href?: string } {
  const match = type.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (match) return { text: match[1], href: match[2] };
  return { text: type };
}

export function ApiParam({ name, type, typeHref, children }: ApiParamProps) {
  const parsed = parseTypeLink(type);
  const resolvedHref = typeHref ?? parsed.href;
  const resolvedText = parsed.text;

  return (
    <>
      {name && <span className="text-[rgb(215,60,70)] dark:text-[rgb(250,115,130)] font-bold">{name}</span>}
      {name && ' '}
      {resolvedHref ? (
        <a href={resolvedHref} className="text-[rgb(110,65,200)] dark:text-[rgb(180,145,240)] no-underline hover:underline">
          {resolvedText}
        </a>
      ) : (
        <span className="text-[rgb(110,65,200)] dark:text-[rgb(180,145,240)]">{resolvedText}</span>
      )}
      {children && <span className="text-fd-muted-foreground"> — {children}</span>}
    </>
  );
}