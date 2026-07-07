'use client';

import { useState } from 'react';
import { Search, Bell, Settings, Globe, HelpCircle, Menu, Check, Palette } from 'lucide-react';
import { useTheme, THEME_META } from '@/lib/theme/theme-context';
import { currentUser, notifications } from '@/lib/data/mock';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function TopNav({ onMenuClick }) {
  const { theme, setTheme, themes } = useTheme();
  const router = useRouter();
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('labelflow-auth');
    router.push('/login');
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 gap-3 sticky top-0 z-30 backdrop-blur-sm bg-card/95">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, labels, registrations..."
            className="w-full h-9 pl-9 pr-16 rounded-md bg-muted/50 border border-transparent focus:border-ring focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20 text-sm placeholder:text-muted-foreground transition-all"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Language */}
        <button className="h-9 px-2 rounded-md hover:bg-muted flex items-center gap-1.5 text-sm text-muted-foreground transition-colors" aria-label="Language">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline text-xs font-medium">EN</span>
        </button>

        {/* Theme switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors" aria-label="Change theme">
              <Palette className="h-[18px] w-[18px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">Appearance</DropdownMenuLabel>
            {themes.map(t => (
              <DropdownMenuItem key={t} onClick={() => setTheme(t)} className="gap-3 cursor-pointer">
                <span className="h-4 w-4 rounded-full border border-border shrink-0" style={{ backgroundColor: THEME_META[t].color }} />
                <span className="flex-1">{THEME_META[t].name}</span>
                {theme === t && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <button className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors" aria-label="Help">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors relative" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-card" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
              <Badge variant="secondary" className="text-[10px]">{unreadCount} new</Badge>
            </div>
            <DropdownMenuSeparator />
            {notifications.map(n => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2.5 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <button onClick={() => router.push('/settings')} className="h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors" aria-label="Settings">
          <Settings className="h-[18px] w-[18px]" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-md hover:bg-muted transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{currentUser.initials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">{currentUser.name}</span>
                <span className="text-[10px] text-muted-foreground">{currentUser.role}</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-danger focus:text-danger">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
