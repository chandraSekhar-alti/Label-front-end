'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { STATUS_META } from '@/lib/data/label-changes';

const PRODUCT_FAMILY_OPTIONS = ['Ambrisentan Test', 'Remdesivir Test', 'BIC/FTC/TAF Test', 'EVG/COBI/FTC/TAF Test', 'Adefovir Dipivoxil Test'];
const CATEGORY_OPTIONS = ['Category 1 Test', 'Category 2 Test', 'Category 3 Test', 'No Category Test'];
const CREATOR_OPTIONS = ['John Doe Test', 'Sarah Chen Test', 'Michael Roberts Test', 'Priya Sharma Test'];

export default function FilterDrawer({ open, onOpenChange, filters, onFiltersChange, onApply, onReset }) {
  const toggle = (key, value) => {
    const set = new Set(filters[key] || []);
    set.has(value) ? set.delete(value) : set.add(value);
    onFiltersChange({ ...filters, [key]: Array.from(set) });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b border-border flex-row items-center justify-between space-y-0">
          <div>
            <SheetTitle className="text-base">Filter Label Changes</SheetTitle>
            <SheetDescription className="text-xs">Refine the results by applying filters</SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-6">
          {/* Status */}
          <FilterGroup title="Status">
            {Object.entries(STATUS_META).map(([k, m]) => (
              <CheckRow key={k} checked={(filters.status || []).includes(k)} onChange={() => toggle('status', k)} label={m.label} />
            ))}
          </FilterGroup>

          <FilterGroup title="Category">
            {CATEGORY_OPTIONS.map(c => (
              <CheckRow key={c} checked={(filters.category || []).includes(c)} onChange={() => toggle('category', c)} label={c} />
            ))}
          </FilterGroup>

          <FilterGroup title="Product Family">
            {PRODUCT_FAMILY_OPTIONS.map(p => (
              <CheckRow key={p} checked={(filters.productFamily || []).includes(p)} onChange={() => toggle('productFamily', p)} label={p} />
            ))}
          </FilterGroup>

          <FilterGroup title="Date Range">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">From</Label>
                <Input type="date" value={filters.dateFrom || ''} onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">To</Label>
                <Input type="date" value={filters.dateTo || ''} onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })} />
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Created By">
            {CREATOR_OPTIONS.map(u => (
              <CheckRow key={u} checked={(filters.createdBy || []).includes(u)} onChange={() => toggle('createdBy', u)} label={u} />
            ))}
          </FilterGroup>
        </div>

        <div className="px-6 py-4 border-t border-border flex items-center gap-2 bg-muted/30">
          <Button variant="outline" className="flex-1" onClick={onReset}>Reset</Button>
          <Button className="flex-1" onClick={onApply}>Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const FilterGroup = ({ title, children }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">{title}</p>
    <div className="space-y-2">{children}</div>
  </div>
);

const CheckRow = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <Checkbox checked={checked} onCheckedChange={onChange} />
    <span className="text-sm text-foreground group-hover:text-primary transition-colors">{label}</span>
  </label>
);
