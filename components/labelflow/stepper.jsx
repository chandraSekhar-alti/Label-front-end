'use client';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EnterpriseStepper({ steps, current, completed, onStepClick }) {
  return (
    <div className="w-full">
      {/* Desktop / Tablet */}
      <ol className="hidden sm:flex items-start justify-between gap-2">
        {steps.map((step, i) => {
          const n = i + 1;
          const done = completed.has(n);
          const active = current === n;
          const clickable = done || n < current;
          const isLast = i === steps.length - 1;
          return (
            <li key={step} className="flex-1 flex flex-col items-center min-w-0">
              <div className="flex items-center w-full">
                <div className="flex-1 h-px" />
                <button
                  disabled={!clickable && !active}
                  onClick={() => clickable && onStepClick?.(n)}
                  aria-current={active ? 'step' : undefined}
                  aria-label={`Step ${n}: ${step}${done ? ' (completed)' : ''}`}
                  className={cn(
                    'relative z-10 h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200',
                    active && 'bg-primary text-primary-foreground ring-4 ring-primary/15 scale-110',
                    done && !active && 'bg-primary text-primary-foreground hover:scale-105 cursor-pointer',
                    !done && !active && 'bg-background text-muted-foreground border-2 border-border'
                  )}
                >
                  {done && !active ? <Check className="h-4 w-4" strokeWidth={3} /> : n}
                </button>
                {!isLast && (
                  <div className="flex-1 h-[2px] mx-2 rounded relative overflow-hidden bg-border">
                    <div className={cn('absolute inset-0 bg-primary transition-transform duration-500 origin-left', done ? 'scale-x-100' : 'scale-x-0')} />
                  </div>
                )}
              </div>
              <span className={cn('mt-3 text-xs font-medium text-center px-1 truncate max-w-full transition-colors', (active || done) ? 'text-foreground' : 'text-muted-foreground')}>{step}</span>
            </li>
          );
        })}
      </ol>

      {/* Mobile compact */}
      <div className="sm:hidden space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {current} of {steps.length}</p>
          <p className="text-xs font-semibold text-primary">{Math.round((current / steps.length) * 100)}%</p>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(current / steps.length) * 100}%` }} />
        </div>
        <p className="text-sm font-semibold text-foreground">{steps[current - 1]}</p>
      </div>
    </div>
  );
}
