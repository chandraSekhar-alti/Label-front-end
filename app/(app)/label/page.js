'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Breadcrumb from '@/components/labelflow/breadcrumb';
import PageHeader from '@/components/labelflow/page-header';
import EmptyState from '@/components/labelflow/empty-state';
import TableToolbar from '@/components/labelflow/table-toolbar';
import DataTable from '@/components/labelflow/data-table';
import Pagination from '@/components/labelflow/pagination';
import FilterDrawer from '@/components/labelflow/filter-drawer';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Plus, ChevronDown, FileText, Archive, Send, Trash2, AlertTriangle, PackageOpen, RotateCcw } from 'lucide-react';
import { LABEL_CHANGES, LABEL_CHANGE_COLUMNS } from '@/lib/data/label-changes';

const EMPTY_FILTERS = { status: [], category: [], productFamily: [], createdBy: [], dateFrom: '', dateTo: '' };

export default function LabelChangesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [density, setDensity] = useState('comfortable');
  const [visibleColumns, setVisibleColumns] = useState(LABEL_CHANGE_COLUMNS.map(c => c.key));
  const [sortKey, setSortKey] = useState('createdDate');
  const [sortDir, setSortDir] = useState('desc');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    ['status', 'category', 'productFamily', 'createdBy'].forEach(k => { c += (appliedFilters[k] || []).length; });
    if (appliedFilters.dateFrom) c += 1;
    if (appliedFilters.dateTo) c += 1;
    return c;
  }, [appliedFilters]);

  const filtered = useMemo(() => {
    let rows = LABEL_CHANGES;
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.id.toLowerCase().includes(q) ||
        r.changeType.toLowerCase().includes(q) ||
        r.productFamily.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.shortDescription.toLowerCase().includes(q) ||
        r.createdBy.toLowerCase().includes(q)
      );
    }
    if (appliedFilters.status?.length) rows = rows.filter(r => appliedFilters.status.includes(r.status));
    if (appliedFilters.category?.length) rows = rows.filter(r => appliedFilters.category.includes(r.category));
    if (appliedFilters.productFamily?.length) rows = rows.filter(r => appliedFilters.productFamily.includes(r.productFamily));
    if (appliedFilters.createdBy?.length) rows = rows.filter(r => appliedFilters.createdBy.includes(r.createdBy));
    if (appliedFilters.dateFrom) rows = rows.filter(r => new Date(r.createdDate) >= new Date(appliedFilters.dateFrom));
    if (appliedFilters.dateTo) rows = rows.filter(r => new Date(r.createdDate) <= new Date(appliedFilters.dateTo));

    const sorted = [...rows].sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (av == null) return 1; if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [search, appliedFilters, sortKey, sortDir]);

  const total = filtered.length;
  const pagedRows = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  // Reset to page 1 when filters/search change
  useEffect(() => { setPage(1); }, [search, appliedFilters, pageSize]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); toast.success('Data refreshed'); }, 700);
  };

  const handleToggleColumn = (key) => {
    setVisibleColumns(v => v.includes(key) ? v.filter(k => k !== key) : [...v, key]);
  };

  const handleApplyFilters = () => { setAppliedFilters(filters); setFilterOpen(false); toast.success('Filters applied'); };
  const handleResetFilters = () => { setFilters(EMPTY_FILTERS); setAppliedFilters(EMPTY_FILTERS); toast.info('Filters cleared'); };

  const handleAddLabelChange = () => router.push('/label/add');

  if (error) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Label', href: '/label' }, { label: 'Label Changes' }]} />
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-8 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-danger/10 flex items-center justify-center mb-3">
            <AlertTriangle className="h-6 w-6 text-danger" />
          </div>
          <h3 className="font-semibold">Something went wrong</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">We couldn&apos;t load Label Changes. Please check your connection and try again.</p>
          <Button className="mt-5 gap-1.5" onClick={() => { setError(false); setLoading(true); setTimeout(() => setLoading(false), 700); }}>
            <RotateCcw className="h-4 w-4" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Label', href: '/label' }, { label: 'Label Changes' }]} />

      <PageHeader
        title="Label Changes"
        description="Track and manage all label change requests across product families"
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">Actions <ChevronDown className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">Bulk actions</DropdownMenuLabel>
                <DropdownMenuItem className="gap-2 cursor-pointer"><FileText className="h-4 w-4" /> Export as PDF</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer"><FileText className="h-4 w-4" /> Export as CSV</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer"><Send className="h-4 w-4" /> Send for review</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer"><Archive className="h-4 w-4" /> Archive</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer text-danger focus:text-danger"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={handleAddLabelChange}>
              <Plus className="h-4 w-4" /> Add Label Change
            </Button>
          </>
        }
      />

      <div className="rounded-lg border border-border bg-card shadow-enterprise-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-card">
          <TableToolbar
            search={search}
            onSearchChange={setSearch}
            onExport={() => toast.success('Export started', { description: `${total} records` })}
            onRefresh={handleRefresh}
            onOpenFilters={() => setFilterOpen(true)}
            density={density}
            onDensityChange={setDensity}
            columns={LABEL_CHANGE_COLUMNS}
            visibleColumns={visibleColumns}
            onToggleColumn={handleToggleColumn}
            activeFilterCount={activeFilterCount}
            refreshing={refreshing}
          />
        </div>

        {!loading && pagedRows.length === 0 ? (
          <EmptyState
            icon={PackageOpen}
            title="No Label Changes Found"
            description={search || activeFilterCount > 0 ? "Try adjusting your search or filters to see more results." : "Get started by creating your first label change."}
            action={
              (search || activeFilterCount > 0) ? (
                <Button variant="outline" size="sm" onClick={() => { setSearch(''); handleResetFilters(); }} className="gap-1.5"><RotateCcw className="h-4 w-4" /> Clear all</Button>
              ) : (
                <Button size="sm" onClick={handleAddLabelChange} className="gap-1.5"><Plus className="h-4 w-4" /> Add Label Change</Button>
              )
            }
          />
        ) : (
          <>
            <DataTable
              columns={LABEL_CHANGE_COLUMNS}
              visibleColumns={visibleColumns}
              data={pagedRows}
              density={density}
              loading={loading}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
              onView={(row) => toast.info(`View ${row.id}`)}
              onEdit={(row) => toast.info(`Edit ${row.id}`)}
              onDuplicate={(row) => toast.success(`Duplicated ${row.id}`)}
              onDelete={(row) => toast.error(`Deleted ${row.id}`)}
            />
            {!loading && (
              <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={setPageSize} />
            )}
          </>
        )}
      </div>

      <FilterDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApplyFilters}
        onReset={() => { setFilters(EMPTY_FILTERS); setAppliedFilters(EMPTY_FILTERS); }}
      />
    </div>
  );
}
