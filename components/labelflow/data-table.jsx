'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal, Eye, Pencil, Copy, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatusBadge from './status-badge';
import { STATUS_META, CATEGORY_META } from '@/lib/data/label-changes';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const DENSITY_ROW = {
  compact: 'h-10',
  comfortable: 'h-14',
  spacious: 'h-16',
};

const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

function renderCell(row, col) {
  const v = row[col.key];
  switch (col.type) {
    case 'status': {
      const meta = STATUS_META[v] || { label: v, variant: 'muted' };
      return <StatusBadge variant={meta.variant} label={meta.label} />;
    }
    case 'category': {
      const meta = CATEGORY_META[v] || {};
      return (
        <span className={cn('inline-flex items-center h-6 px-2 rounded-md border text-[11px] font-medium', meta.className)}>
          {v}
        </span>
      );
    }
    case 'user':
      return (
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px] font-semibold">{initials(v)}</AvatarFallback>
          </Avatar>
          <span className="text-sm truncate">{v}</span>
        </div>
      );
    case 'date':
      return <span className="text-sm text-muted-foreground">{format(new Date(v), 'MMM d, yyyy')}</span>;
    default:
      if (col.primary) return <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">{v}</span>;
      return <span className={cn('text-sm text-foreground', col.truncate && 'line-clamp-1')}>{v}</span>;
  }
}

export default function DataTable({
  columns, visibleColumns, data,
  density = 'comfortable', loading = false,
  sortKey, sortDir, onSort,
  onView, onEdit, onDuplicate, onDelete,
}) {
  const cols = columns.filter(c => visibleColumns.includes(c.key));

  if (loading) return <TableSkeleton columns={cols} density={density} />;

  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {cols.map(col => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap select-none"
              >
                {col.sortable ? (
                  <button onClick={() => onSort?.(col.key)} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group">
                    {col.label}
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  </button>
                ) : col.label}
              </th>
            ))}
            <th className="w-14 px-2 py-2.5 sticky right-0 bg-muted/40"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id} className={cn('border-b border-border last:border-b-0 hover:bg-muted/40 transition-colors group', DENSITY_ROW[density])}>
              {cols.map(col => (
                <td key={col.key} className="px-4 whitespace-nowrap max-w-[280px]">{renderCell(row, col)}</td>
              ))}
              <td className="px-2 sticky right-0 bg-card group-hover:bg-muted/40 transition-colors">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label="Row actions">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onView?.(row)} className="gap-2 cursor-pointer"><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(row)} className="gap-2 cursor-pointer"><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate?.(row)} className="gap-2 cursor-pointer"><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete?.(row)} className="gap-2 cursor-pointer text-danger focus:text-danger"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortIcon({ active, dir }) {
  if (!active) return <ChevronsUpDown className="h-3 w-3 opacity-40 group-hover:opacity-70" />;
  return dir === 'asc' ? <ArrowUp className="h-3 w-3 text-primary" /> : <ArrowDown className="h-3 w-3 text-primary" />;
}

function TableSkeleton({ columns, density }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }} className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{col.label}</th>
            ))}
            <th className="w-14" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className={cn('border-b border-border', DENSITY_ROW[density])}>
              {columns.map(col => (
                <td key={col.key} className="px-4"><div className="h-3.5 bg-muted rounded animate-pulse" style={{ width: `${40 + ((i + col.key.length) % 40)}%` }} /></td>
              ))}
              <td className="px-4"><div className="h-6 w-6 rounded bg-muted animate-pulse" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
