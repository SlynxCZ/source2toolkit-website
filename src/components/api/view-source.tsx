import { ExternalLink } from 'lucide-react';

interface ViewSourceProps {
  href: string;
}

export function ViewSource({ href }: ViewSourceProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="view-source-link inline-block -mt-8 float-right text-xs opacity-50 no-underline font-normal hover:opacity-80 transition-opacity"
      title="View Source"
    >
      <ExternalLink className="w-4 h-4 inline" />
    </a>
  );
}