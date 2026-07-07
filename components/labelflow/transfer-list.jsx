'use client';
import { useState, useMemo } from 'react';
import { Search, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Globe2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TransferList({ items, valueKey = 'code', labelKey = 'name', selected, onChange }) {
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [leftChecked, setLeftChecked] = useState(new Set());
  const [rightChecked, setRightChecked] = useState(new Set());
  const [hideSelected, setHideSelected] = useState(false);

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const available = items.filter(i => !selectedSet.has(i[valueKey]));

  const filteredLeft = (hideSelected ? available : items).filter(i =>
    i[labelKey].toLowerCase().includes(leftSearch.toLowerCase())
  );
  const rightItems = items.filter(i => selectedSet.has(i[valueKey]));
  const filteredRight = rightItems.filter(i => i[labelKey].toLowerCase().includes(rightSearch.toLowerCase()));

  const moveRight = (vals) => { onChange([...new Set([...selected, ...vals])]); setLeftChecked(new Set()); };
  const moveLeft = (vals) => { onChange(selected.filter(v => !vals.includes(v))); setRightChecked(new Set()); };

  const toggle = (setter, set, v) => {
    const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
      <Panel title={`Available Countries (${available.length})`} search={leftSearch} onSearch={setLeftSearch}
        items={filteredLeft} checked={leftChecked} onToggle={(v) => toggle(setLeftChecked, leftChecked, v)}
        valueKey={valueKey} labelKey={labelKey} disabledSet={hideSelected ? new Set() : selectedSet} />

      <div className="flex md:flex-col items-center justify-center gap-2 py-4">
        <MoveBtn onClick={() => moveRight(items.filter(i => !selectedSet.has(i[valueKey])).map(i => i[valueKey]))} icon={ChevronsRight} label="Move All" />
        <MoveBtn onClick={() => moveRight([...leftChecked].filter(v => !selectedSet.has(v)))} icon={ChevronRight} disabled={leftChecked.size === 0} label="Move Selected" />
        <MoveBtn onClick={() => moveLeft([...rightChecked])} icon={ChevronLeft} disabled={rightChecked.size === 0} label="Remove Selected" />
        <MoveBtn onClick={() => moveLeft(selected)} icon={ChevronsLeft} label="Remove All" disabled={selected.length === 0} />
      </div>

      <Panel title={`Selected Countries (${rightItems.length})`} search={rightSearch} onSearch={setRightSearch}
        items={filteredRight} checked={rightChecked} onToggle={(v) => toggle(setRightChecked, rightChecked, v)}
        valueKey={valueKey} labelKey={labelKey} emptyMsg="No countries selected" />

      <div className="md:col-span-3 flex items-center justify-center gap-2 pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
          <Checkbox checked={hideSelected} onCheckedChange={setHideSelected} />
          Hide Selected in Available
        </label>
      </div>
    </div>
  );
}

function Panel({ title, search, onSearch, items, checked, onToggle, valueKey, labelKey, disabledSet, emptyMsg = 'No countries available' }) {
  return (
    <div className="rounded-lg border border-border bg-card flex flex-col min-h-[380px] max-h-[520px]">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">{title}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search country..." className="w-full h-8 pl-8 pr-2 rounded-md bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring/25" />
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto scrollbar-thin py-1">
        {items.length === 0 ? (
          <li className="h-full flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
            <Globe2 className="h-8 w-8 opacity-40" /><span className="text-xs">{emptyMsg}</span>
          </li>
        ) : items.map(item => {
          const v = item[valueKey];
          const disabled = disabledSet?.has(v);
          return (
            <li key={v}>
              <label className={cn('flex items-center gap-2 px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors', disabled && 'opacity-40 pointer-events-none')}>
                <Checkbox checked={checked.has(v)} onCheckedChange={() => onToggle(v)} />
                <span className="text-sm flex-1">{item[labelKey]}</span>
                <span className="text-[10px] text-muted-foreground">{item.region}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const MoveBtn = ({ onClick, disabled, icon: Icon, label }) => (
  <Button variant="outline" size="sm" onClick={onClick} disabled={disabled} className="gap-1.5 min-w-[140px] justify-start text-xs">
    <Icon className="h-3.5 w-3.5" />{label}
  </Button>
);
