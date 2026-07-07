export default function PageHeader({ title, description, actions, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-border ${className}`}>
      <div className="min-w-0">
        <h1 className="text-page-title truncate">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap shrink-0">{actions}</div>}
    </div>
  );
}
