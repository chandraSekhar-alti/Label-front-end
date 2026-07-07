'use client';

import Breadcrumb from '@/components/labelflow/breadcrumb';
import PageHeader from '@/components/labelflow/page-header';
import { useTheme, THEME_META } from '@/lib/theme/theme-context';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <PageHeader title="Settings" description="Configure your workspace preferences" />

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-sm mb-1">Appearance</h3>
        <p className="text-xs text-muted-foreground mb-4">Choose a theme for the entire application. Changes apply instantly.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                'relative flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left',
                theme === t ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80 hover:bg-muted/40'
              )}
            >
              <div className="h-10 w-10 rounded-md border border-border shrink-0" style={{ backgroundColor: THEME_META[t].color }} />
              <div className="flex-1">
                <p className="text-sm font-medium">{THEME_META[t].name}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Theme</p>
              </div>
              {theme === t && (
                <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-sm mb-1">Language</h3>
        <p className="text-xs text-muted-foreground mb-4">Select your preferred language.</p>
        <select className="h-9 px-3 rounded-md border border-border bg-background text-sm w-full max-w-xs">
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>Français</option>
          <option>Deutsch</option>
          <option>Español</option>
          <option>日本語</option>
        </select>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-sm mb-1">Notifications</h3>
        <p className="text-xs text-muted-foreground">Email and in-app notification preferences will be available in the next phase.</p>
      </div>
    </div>
  );
}
