import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, action, size = 'md' }) {
  const iconWrap = size === 'sm' ? 'h-12 w-12' : 'h-16 w-16';
  const iconSize = size === 'sm' ? 'h-5 w-5' : 'h-7 w-7';
  const py = size === 'sm' ? 'py-10' : 'py-16';

  return (
    <div className={`flex flex-col items-center justify-center ${py} px-6 text-center animate-in-up`}>
      {/* Layered decorative rings */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-primary/[0.03] scale-[2.2] blur-md" aria-hidden />
        <div className="absolute inset-0 rounded-full border border-dashed border-border scale-[1.8]" aria-hidden />
        <div className="absolute inset-0 rounded-full border border-dashed border-border/60 scale-[1.4]" aria-hidden />
        <div className={`relative ${iconWrap} rounded-full bg-gradient-to-b from-muted to-muted/60 flex items-center justify-center shadow-enterprise-sm`}>
          <Icon className={`${iconSize} text-muted-foreground`} strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1.5 max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
