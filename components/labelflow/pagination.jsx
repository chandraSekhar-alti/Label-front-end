'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const getPages = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
};

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, pageSizeOptions = [10, 20, 50, 100] }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages = getPages(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-7 px-2 rounded border border-input bg-background text-xs focus:outline-none focus:ring-2 focus:ring-ring/25"
          >
            {pageSizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <span className="hidden sm:inline">Showing <span className="font-medium text-foreground">{from}</span> to <span className="font-medium text-foreground">{to}</span> of <span className="font-medium text-foreground">{total}</span></span>
      </div>

      <div className="flex items-center gap-0.5">
        <PagBtn onClick={() => onPageChange(1)} disabled={page === 1} aria="First page"><ChevronsLeft className="h-4 w-4" /></PagBtn>
        <PagBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} aria="Previous page"><ChevronLeft className="h-4 w-4" /></PagBtn>
        {pages.map((p, i) => (
          p === '...' ? (
            <span key={`e${i}`} className="px-2 text-xs text-muted-foreground select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                'h-8 min-w-[32px] px-2 rounded-md text-xs font-medium transition-all',
                p === page ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground hover:bg-muted'
              )}
            >{p}</button>
          )
        ))}
        <PagBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages} aria="Next page"><ChevronRight className="h-4 w-4" /></PagBtn>
        <PagBtn onClick={() => onPageChange(totalPages)} disabled={page === totalPages} aria="Last page"><ChevronsRight className="h-4 w-4" /></PagBtn>
      </div>
    </div>
  );
}

const PagBtn = ({ children, onClick, disabled, aria }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={aria}
    className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors"
  >{children}</button>
);
