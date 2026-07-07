import { cn } from '@/lib/utils';

const VARIANTS = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/25',
  info:    'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/25',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/25',
  danger:  'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/25',
  muted:   'bg-muted text-muted-foreground border-border',
};

const DOT = {
  success: 'bg-emerald-500',
  info: 'bg-sky-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  muted: 'bg-muted-foreground/60',
};

export default function StatusBadge({ variant = 'muted', label, showDot = true, className }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 h-6 px-2 rounded-full border text-[11px] font-medium whitespace-nowrap',
      VARIANTS[variant] || VARIANTS.muted,
      className
    )}>
      {showDot && <span className={cn('h-1.5 w-1.5 rounded-full', DOT[variant] || DOT.muted)} />}
      {label}
    </span>
  );
}
