'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const titleize = (s) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export default function Breadcrumb({ items }) {
  const pathname = usePathname() || '';
  const list = items || pathname.split('/').filter(Boolean).map((seg, i, arr) => ({
    label: titleize(seg),
    href: '/' + arr.slice(0, i + 1).join('/'),
  }));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground min-w-0">
      <Link href="/dashboard" aria-label="Home" className="h-6 w-6 rounded hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center shrink-0">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {list.map((item, i) => {
        const isLast = i === list.length - 1;
        return (
          <span key={`${item.href || item.label}-${i}`} className="flex items-center gap-1 min-w-0">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-medium text-foreground truncate max-w-[180px] sm:max-w-none" aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-none">{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
