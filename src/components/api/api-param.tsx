import type { ReactNode } from 'react';

interface ApiParamProps {
  name?: string;
  type: string;
  typeHref?: string;
  children?: ReactNode;
}

export function ApiParam({ name, type, typeHref, children }: ApiParamProps) {
  return (
    <>
      {name && <span className="text-[rgb(215,60,70)] dark:text-[rgb(250,115,130)] font-bold">{name}</span>}
      {name && ' '}
      {typeHref ? (
        <a href={typeHref} target="_blank" rel="noopener noreferrer" className="text-[rgb(110,65,200)] dark:text-[rgb(180,145,240)] no-underline hover:underline">
          {type}
        </a>
      ) : (
        <span className="text-[rgb(110,65,200)] dark:text-[rgb(180,145,240)]">{type}</span>
      )}
      {children && <span className="text-fd-muted-foreground"> — {children}</span>}
    </>
  );
}