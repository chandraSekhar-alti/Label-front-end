'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md animate-in-up">
        <div className="relative mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/[0.04] scale-[2.5] blur-lg" aria-hidden />
          <div className="absolute inset-0 rounded-full border border-dashed border-border scale-[2]" aria-hidden />
          <div className="absolute inset-0 rounded-full border border-dashed border-border/60 scale-[1.5]" aria-hidden />
          <div className="relative h-20 w-20 rounded-full bg-gradient-to-b from-muted to-muted/60 flex items-center justify-center shadow-enterprise-md mx-auto">
            <SearchX className="h-9 w-9 text-muted-foreground" strokeWidth={1.75} />
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Error 404</p>
        <h1 className="text-2xl font-bold mt-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
        </p>
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" onClick={() => history.back()} className="gap-1.5"><ArrowLeft className="h-4 w-4" />Back</Button>
          <Link href="/dashboard"><Button className="gap-1.5"><Home className="h-4 w-4" />Go to Dashboard</Button></Link>
        </div>
      </div>
    </div>
  );
}
