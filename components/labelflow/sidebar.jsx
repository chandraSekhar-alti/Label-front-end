'use client';

import { useRouter, usePathname } from 'next/navigation';
import { primaryNav, secondaryNav } from '@/lib/data/nav';
import { ChevronLeft, PanelLeftClose, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar({ collapsed, onToggle, mobile = false, onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href) => pathname === href || pathname?.startsWith(href + '/');

  const handleClick = (href, key) => {
    if (key === 'logout') {
      if (typeof window !== 'undefined') localStorage.removeItem('labelflow-auth');
      router.push('/login');
      return;
    }
    router.push(href);
    onNavigate?.();
  };

  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border',
        'transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        mobile ? 'w-72' : collapsed ? 'w-[72px]' : 'w-64'
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-2 px-4 h-16 border-b border-sidebar-border shrink-0', collapsed && !mobile && 'justify-center px-0')}>
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-enterprise-sm">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        {(!collapsed || mobile) && (
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[15px] tracking-tight">LabelFlow</span>
            <span className="text-[10px] uppercase tracking-widest text-sidebar-muted">Enterprise</span>
          </div>
        )}
      </div>

      {(!collapsed || mobile) && (
        <div className="px-4 pt-5 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">Modules</p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-0.5">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <button
              key={item.key}
              onClick={() => handleClick(item.href, item.key)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative w-full group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                'transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                active && 'bg-sidebar-accent text-sidebar-accent-foreground',
                collapsed && !mobile && 'justify-center px-0'
              )}
              title={collapsed ? item.label : undefined}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-primary" />}
              <span className={cn('flex items-center justify-center h-5 w-5 shrink-0 transition-colors', active ? 'text-primary' : 'text-sidebar-muted group-hover:text-sidebar-accent-foreground')}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              {(!collapsed || mobile) && <span className="flex-1 text-left truncate">{item.label}</span>}
            </button>
          );
        })}

        {(!collapsed || mobile) && (
          <div className="pt-6 pb-2 px-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">Account</p>
          </div>
        )}
        {(collapsed && !mobile) && <div className="my-4 mx-3 border-t border-sidebar-border" />}

        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const danger = item.key === 'logout';
          return (
            <button
              key={item.key}
              onClick={() => handleClick(item.href, item.key)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'w-full group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                active && 'bg-sidebar-accent text-sidebar-accent-foreground',
                danger && 'hover:bg-danger/10 hover:text-danger',
                collapsed && !mobile && 'justify-center px-0'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors', danger ? 'text-sidebar-muted group-hover:text-danger' : 'text-sidebar-muted group-hover:text-sidebar-accent-foreground')} />
              {(!collapsed || mobile) && <span className="flex-1 text-left truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {!mobile && (
        <div className="p-2 border-t border-sidebar-border shrink-0">
          <button
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'w-full flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
              collapsed && 'justify-center px-0'
            )}
          >
            {collapsed ? <ChevronLeft className="h-4 w-4 rotate-180" /> : <><PanelLeftClose className="h-4 w-4" /><span>Collapse</span></>}
          </button>
        </div>
      )}
    </aside>
  );
}
