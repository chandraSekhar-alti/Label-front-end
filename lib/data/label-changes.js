// Mock enterprise data for Label Changes Dashboard
// All records end with 'Test' per specification

const PRODUCT_FAMILIES = [
  'Ambrisentan Test', 'Remdesivir Test', 'BIC/FTC/TAF Test', 'EVG/COBI/FTC/TAF Test',
  'Adefovir Dipivoxil Test', 'Sofosbuvir Test', 'Ledipasvir Test', 'Tenofovir Test',
  'Emtricitabine Test', 'Velpatasvir Test',
];

const CHANGE_TYPES = ['CCDS Update Test', 'Local Change Test', 'Safety Update Test', 'Efficacy Update Test', 'Regulatory Test'];
const CATEGORIES = ['Category 1 Test', 'Category 2 Test', 'Category 3 Test', 'No Category Test'];
const STATUSES = ['completed', 'in_progress', 'draft', 'cancelled', 'pending'];
const CREATORS = [
  'John Doe Test', 'Sarah Chen Test', 'Michael Roberts Test', 'Priya Sharma Test',
  'David Kim Test', 'Emma Wilson Test', 'Alex Johnson Test', 'Maria Garcia Test',
];
const DESCRIPTIONS = [
  'Safety & Efficacy Update Test', 'Section 12.2.5 PK Special Populations Test',
  'Addition of Week 156 Data Test', 'Autotest LCSD Update Test',
  'Contraindications Update Test', 'Dosing Recommendation Test',
  'Pediatric Population Update Test', 'Adverse Reactions Test',
  'Drug Interactions Update Test', 'Storage Conditions Test',
];

const seed = (i) => {
  const rnd = (arr) => arr[(i * 7 + 3) % arr.length];
  const d = new Date(2026, 6, 1 + (i % 30));
  return {
    id: `LC-2026-${String(10500 + i).padStart(5, '0')}-TEST`,
    changeType: rnd(CHANGE_TYPES),
    productFamily: rnd(PRODUCT_FAMILIES),
    category: rnd(CATEGORIES),
    shortDescription: rnd(DESCRIPTIONS),
    status: STATUSES[(i * 3) % STATUSES.length],
    createdBy: rnd(CREATORS),
    createdDate: d.toISOString(),
  };
};

export const LABEL_CHANGES = Array.from({ length: 64 }, (_, i) => seed(i));

export const LABEL_CHANGE_COLUMNS = [
  { key: 'id',               label: 'Label Change ID',   width: 190, sortable: true, primary: true },
  { key: 'changeType',       label: 'Change Type',        width: 160, sortable: true },
  { key: 'productFamily',    label: 'Product Family',     width: 180, sortable: true },
  { key: 'category',         label: 'Category',           width: 150, sortable: true, type: 'category' },
  { key: 'shortDescription', label: 'Short Description',  width: 260, sortable: false, truncate: true },
  { key: 'status',           label: 'Status',             width: 140, sortable: true, type: 'status' },
  { key: 'createdBy',        label: 'Created By',         width: 170, sortable: true, type: 'user' },
  { key: 'createdDate',      label: 'Created Date',       width: 130, sortable: true, type: 'date' },
];

export const STATUS_META = {
  completed:   { label: 'Completed',   variant: 'success' },
  in_progress: { label: 'In Progress', variant: 'info' },
  draft:       { label: 'Draft',       variant: 'muted' },
  cancelled:   { label: 'Cancelled',   variant: 'danger' },
  pending:     { label: 'Pending',     variant: 'warning' },
};

export const CATEGORY_META = {
  'Category 1 Test': { className: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30' },
  'Category 2 Test': { className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30' },
  'Category 3 Test': { className: 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30' },
  'No Category Test': { className: 'bg-muted text-muted-foreground border-border' },
};
