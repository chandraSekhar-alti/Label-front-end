'use client';

import { Download, LayoutList, Filter, Columns3, RefreshCw, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function TableToolbar({
  search, onSearchChange,
  onExport, onRefresh, onOpenFilters,
  density = 'comfortable', onDensityChange,
  columns = [], visibleColumns = [], onToggleColumn,
  activeFilterCount = 0,
  refreshing = false,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
      {/* Left: search */}
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Label Changes..."
          className="w-full h-9 pl-9 pr-9 rounded-md bg-background border border-input text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/25 focus:border-ring transition-all"
        />
        {search && (
          <button onClick={() => onSearchChange('')} className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded hover:bg-muted text-muted-foreground" aria-label="Clear search">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-1 flex-wrap">
        <Button variant="ghost" size="sm" onClick={onExport} className="gap-1.5 text-muted-foreground hover:text-foreground">
          <Download className="h-4 w-4" /> Export
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <LayoutList className="h-4 w-4" /> Density
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">Row density</DropdownMenuLabel>
            {['compact', 'comfortable', 'spacious'].map(d => (
              <DropdownMenuItem key={d} onClick={() => onDensityChange(d)} className="capitalize cursor-pointer gap-2">
                <span className={cn('h-2 w-2 rounded-full', density === d ? 'bg-primary' : 'bg-muted')} />
                {d}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" onClick={onOpenFilters} className="gap-1.5 text-muted-foreground hover:text-foreground relative">
          <Filter className="h-4 w-4" /> Filters
          {activeFilterCount > 0 && (
            <span className="h-4 min-w-[16px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">{activeFilterCount}</span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <Columns3 className="h-4 w-4" /> Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map(col => (
              <DropdownMenuCheckboxItem
                key={col.key}
                checked={visibleColumns.includes(col.key)}
                onCheckedChange={() => onToggleColumn(col.key)}
                disabled={col.primary}
              >
                {col.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" onClick={onRefresh} className="gap-1.5 text-muted-foreground hover:text-foreground">
          <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} /> Refresh
        </Button>
      </div>
    </div>
  );
}
