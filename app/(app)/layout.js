'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/labelflow/sidebar';
import TopNav from '@/components/labelflow/top-nav';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sparkles } from 'lucide-react';

export default function AppLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = typeof window !== 'undefined' ? localStorage.getItem('labelflow-auth') : null;
    if (!auth) router.replace('/login');
    else setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">Loading LabelFlow…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:block h-screen sticky top-0 z-40">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72 border-0">
          <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="page-container animate-in-up">{children}</div>
        </main>
        <footer className="h-12 border-t border-border bg-card flex items-center justify-between px-4 md:px-6 lg:px-8 text-xs text-muted-foreground">
          <span>© 2026 LabelFlow, Inc.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Status</a>
            <span className="hidden sm:inline">v1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
