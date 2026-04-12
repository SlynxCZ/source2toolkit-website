interface ApiLabelProps {
  children: React.ReactNode;
}

export function ApiLabel({ children }: ApiLabelProps) {
  return (
    <div className="text-sm font-medium text-fd-muted-foreground mt-4 mb-1">
      {children}
    </div>
  );
}