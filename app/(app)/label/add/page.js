'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Check, ChevronLeft, ChevronRight, X, Search, Package, CalendarDays, FileText, Globe2, ClipboardList, PartyPopper, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Breadcrumb from '@/components/labelflow/breadcrumb';
import PageHeader from '@/components/labelflow/page-header';
import EnterpriseStepper from '@/components/labelflow/stepper';
import TransferList from '@/components/labelflow/transfer-list';
import { WizardProvider, useWizard } from '@/lib/wizard/wizard-context';
import { PRODUCT_FAMILIES, PRODUCTS_BY_FAMILY, CHANGE_TYPES, PROCESS_IMPACTED, CHANGE_CATEGORIES, SIGNALS, TRIGGER_TYPES, COUNTRIES, buildRegistrations } from '@/lib/data/wizard-mock';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const STEPS = ['Select Products', 'Label Change Details', 'Select Countries', 'Select Registrations'];

const detailsSchema = z.object({
  triggerDate: z.string().min(1, 'Trigger Date is required'),
  changeType: z.string().min(1, 'Change Type is required'),
  processImpacted: z.string().min(1, 'Process Impacted is required'),
  changeCategory: z.string().min(1, 'Change Category is required'),
  signal: z.string().min(1, 'Signal is required'),
  startDate: z.string().min(1, 'Start Date is required'),
  triggerType: z.string().min(1, 'Trigger Type is required'),
  shortDescription: z.string().min(5, 'Min 5 characters').max(500, 'Max 500 characters'),
  description: z.string().min(10, 'Min 10 characters').max(10000, 'Max 10000 characters'),
});

function WizardInner() {
  const router = useRouter();
  const w = useWizard();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleCancel = () => { w.reset(); router.push('/label'); };

  const goPrev = () => w.currentStep > 1 && w.setCurrentStep(w.currentStep - 1);
  const goNext = () => {
    w.markComplete(w.currentStep);
    w.setCurrentStep(w.currentStep + 1);
  };

  const canNext = {
    1: w.selectedProducts.length > 0,
    2: false, // form submits
    3: w.selectedCountries.length > 0,
    4: w.selectedRegistrations.length > 0,
  }[w.currentStep];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{label:'Dashboard',href:'/dashboard'},{label:'Label',href:'/label'},{label:'Add Label Change'}]} />
      <PageHeader title="Add Label Change" description="Create a new Label Change Request" />

      <div className="rounded-xl border border-border bg-card shadow-enterprise-sm p-6 md:p-8">
        <EnterpriseStepper steps={STEPS} current={w.currentStep} completed={w.completedSteps} onStepClick={(s) => w.setCurrentStep(s)} />

        <div className="mt-8 min-h-[420px] animate-fade-in" key={w.currentStep}>
          {w.currentStep === 1 && <Step1 />}
          {w.currentStep === 2 && <Step2 onSubmitted={goNext} />}
          {w.currentStep === 3 && <Step3 />}
          {w.currentStep === 4 && <Step4 />}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-2">
          <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={goPrev} disabled={w.currentStep === 1} className="gap-1.5"><ChevronLeft className="h-4 w-4" />Previous</Button>
            {w.currentStep < 4 ? (
              w.currentStep === 2 ? (
                <Button type="submit" form="details-form" className="gap-1.5">Next<ChevronRight className="h-4 w-4" /></Button>
              ) : (
                <Button onClick={goNext} disabled={!canNext} className="gap-1.5">Next<ChevronRight className="h-4 w-4" /></Button>
              )
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowReview(true)} className="gap-1.5"><Eye className="h-4 w-4" />Review</Button>
                <Button disabled={!canNext} onClick={() => { w.markComplete(4); setShowSuccess(true); }} className="gap-1.5"><Check className="h-4 w-4" />Finish</Button>
              </>
            )}
          </div>
        </div>
      </div>

      <ReviewDialog open={showReview} onOpenChange={setShowReview} onConfirm={() => { setShowReview(false); setShowSuccess(true); }} />
      <SuccessDialog open={showSuccess} onOpenChange={setShowSuccess} onView={() => { setShowSuccess(false); w.reset(); router.push('/label'); }} onDashboard={() => { setShowSuccess(false); w.reset(); router.push('/dashboard'); }} />
    </div>
  );
}

function Step1() {
  const w = useWizard();
  const [search, setSearch] = useState('');
  const products = w.productFamily ? PRODUCTS_BY_FAMILY[w.productFamily] || [] : [];
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const allSelected = filtered.length > 0 && filtered.every(p => w.selectedProducts.find(sp => sp.id === p.id));

  const toggleAll = () => {
    if (allSelected) w.setSelectedProducts(w.selectedProducts.filter(sp => !filtered.find(p => p.id === sp.id)));
    else {
      const merged = [...w.selectedProducts];
      filtered.forEach(p => { if (!merged.find(m => m.id === p.id)) merged.push(p); });
      w.setSelectedProducts(merged);
    }
  };
  const toggle = (p) => {
    const exists = w.selectedProducts.find(sp => sp.id === p.id);
    w.setSelectedProducts(exists ? w.selectedProducts.filter(sp => sp.id !== p.id) : [...w.selectedProducts, p]);
  };

  return (
    <div className="space-y-5">
      <div className="max-w-md space-y-1.5">
        <Label className="text-sm">Product Family <span className="text-danger">*</span></Label>
        <Select value={w.productFamily} onValueChange={(v) => { w.setProductFamily(v); w.setSelectedProducts([]); }}>
          <SelectTrigger><SelectValue placeholder="Select a product family" /></SelectTrigger>
          <SelectContent>{PRODUCT_FAMILIES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {w.productFamily && (
        <>
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full h-9 pl-9 rounded-md bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring/25" />
            </div>
            <Badge variant="secondary" className="gap-1.5"><Package className="h-3 w-3" />{w.selectedProducts.length} selected</Badge>
          </div>

          <div className="rounded-lg border border-border overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[600px]">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="px-4 py-2.5 w-12"><Checkbox checked={allSelected} onCheckedChange={toggleAll} /></th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product Name</th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product Type</th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product Phase</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-10 text-sm text-muted-foreground">No products found</td></tr>
                ) : filtered.map(p => {
                  const sel = !!w.selectedProducts.find(sp => sp.id === p.id);
                  return (
                    <tr key={p.id} onClick={() => toggle(p)} className={cn('border-b border-border last:border-0 cursor-pointer hover:bg-muted/40 transition-colors', sel && 'bg-primary/5')}>
                      <td className="px-4 py-3"><Checkbox checked={sel} /></td>
                      <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{p.type}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{p.phase}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Step2({ onSubmitted }) {
  const w = useWizard();
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(detailsSchema), defaultValues: w.details, mode: 'onChange',
  });
  const short = watch('shortDescription') || '';
  const desc = watch('description') || '';

  const onSubmit = (data) => { w.setDetails(data); onSubmitted(); };

  const F = ({ name, label, required, children }) => (
    <div className="space-y-1.5">
      <Label className="text-sm">{label} {required && <span className="text-danger">*</span>}</Label>
      {children}
      {errors[name] && <p className="text-xs text-danger">{errors[name]?.message}</p>}
    </div>
  );

  const Sel = ({ name, placeholder, options }) => (
    <Controller name={name} control={control} render={({ field }) => (
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className={cn(errors[name] && 'border-danger focus:ring-danger/30')}><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
    )} />
  );
  const Dt = ({ name }) => (
    <Controller name={name} control={control} render={({ field }) => (
      <Input type="date" {...field} className={cn(errors[name] && 'border-danger focus-visible:ring-danger/30')} />
    )} />
  );

  return (
    <form id="details-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <F name="triggerDate" label="Trigger Date" required><Dt name="triggerDate" /></F>
      <F name="changeType" label="Change Type" required><Sel name="changeType" placeholder="Select Change Type" options={CHANGE_TYPES} /></F>
      <F name="startDate" label="Start Date" required><Dt name="startDate" /></F>
      <F name="processImpacted" label="Process Impacted" required><Sel name="processImpacted" placeholder="Select Process Impacted" options={PROCESS_IMPACTED} /></F>
      <F name="changeCategory" label="Change Category" required><Sel name="changeCategory" placeholder="Select Change Category" options={CHANGE_CATEGORIES} /></F>
      <F name="triggerType" label="Trigger Type" required><Sel name="triggerType" placeholder="Select Trigger Type" options={TRIGGER_TYPES} /></F>
      <div className="md:col-span-3"><F name="signal" label="Signal" required><div className="max-w-sm"><Sel name="signal" placeholder="Select Signal" options={SIGNALS} /></div></F></div>
      <div className="md:col-span-3">
        <F name="shortDescription" label="Label Change Short Description" required>
          <Controller name="shortDescription" control={control} render={({ field }) => (
            <Textarea {...field} maxLength={500} rows={2} placeholder="e.g., Safety & Efficacy Update - Study CS-US-XXX Test" className={cn(errors.shortDescription && 'border-danger focus-visible:ring-danger/30')} />
          )} />
          <p className="text-[11px] text-muted-foreground text-right">{short.length}/500</p>
        </F>
      </div>
      <div className="md:col-span-3">
        <F name="description" label="Label Change Description" required>
          <Controller name="description" control={control} render={({ field }) => (
            <Textarea {...field} maxLength={10000} rows={5} placeholder="e.g., Section 12.2.5 PK in Special Populations. Revised PK data... Test" className={cn(errors.description && 'border-danger focus-visible:ring-danger/30')} />
          )} />
          <p className="text-[11px] text-muted-foreground text-right">{desc.length}/10000</p>
        </F>
      </div>
    </form>
  );
}

function Step3() {
  const w = useWizard();
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div><span className="text-muted-foreground">Selected Product Family: </span><span className="font-semibold">{w.productFamily || '—'}</span></div>
        <div><span className="text-muted-foreground">Selected Products: </span><span className="font-semibold">{w.selectedProducts.length}</span></div>
      </div>
      <TransferList items={COUNTRIES} selected={w.selectedCountries} onChange={w.setSelectedCountries} valueKey="code" labelKey="name" />
    </div>
  );
}

function Step4() {
  const w = useWizard();
  const [search, setSearch] = useState('');
  const regs = useMemo(() => buildRegistrations(w.selectedProducts, w.selectedCountries), [w.selectedProducts, w.selectedCountries]);
  const filtered = regs.filter(r => JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));
  const allSel = filtered.length > 0 && filtered.every(r => w.selectedRegistrations.includes(r.id));
  const toggle = (id) => w.setSelectedRegistrations(w.selectedRegistrations.includes(id) ? w.selectedRegistrations.filter(x => x !== id) : [...w.selectedRegistrations, id]);
  const toggleAll = () => {
    if (allSel) w.setSelectedRegistrations(w.selectedRegistrations.filter(x => !filtered.find(r => r.id === x)));
    else w.setSelectedRegistrations([...new Set([...w.selectedRegistrations, ...filtered.map(r => r.id)])]);
  };

  const cols = ['Country','Region','Product','Application Number','Registration Number','Trade Name','Package Name','Procedure Type','Registration Status','Market Status'];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <div><span className="text-muted-foreground">Products: </span><span className="font-semibold">{w.selectedProducts.length}</span></div>
          <div><span className="text-muted-foreground">Countries: </span><span className="font-semibold">{w.selectedCountries.length}</span></div>
          <div><span className="text-muted-foreground">Selected: </span><span className="font-semibold">{w.selectedRegistrations.length}</span></div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search registrations..." className="w-full h-9 pl-9 rounded-md bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring/25" />
        </div>
      </div>
      <div className="rounded-lg border border-border overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="px-3 py-2.5 w-10"><Checkbox checked={allSel} onCheckedChange={toggleAll} /></th>
              {cols.map(c => <th key={c} className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={11} className="text-center py-10 text-muted-foreground">No registrations match your criteria</td></tr>
            ) : filtered.map(r => {
              const sel = w.selectedRegistrations.includes(r.id);
              return (
                <tr key={r.id} onClick={() => toggle(r.id)} className={cn('border-b border-border last:border-0 cursor-pointer hover:bg-muted/40 transition-colors', sel && 'bg-primary/5')}>
                  <td className="px-3 py-3"><Checkbox checked={sel} /></td>
                  <td className="px-3 py-3 whitespace-nowrap">{r.country}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{r.region}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{r.product}</td>
                  <td className="px-3 py-3 whitespace-nowrap font-mono text-xs">{r.applicationNumber}</td>
                  <td className="px-3 py-3 whitespace-nowrap font-mono text-xs">{r.registrationNumber}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{r.tradeName}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{r.packageName}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{r.procedureType}</td>
                  <td className="px-3 py-3 whitespace-nowrap"><Badge variant="secondary" className="text-[10px]">{r.registrationStatus}</Badge></td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{r.marketStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReviewDialog({ open, onOpenChange, onConfirm }) {
  const w = useWizard();
  const SumCard = ({ icon: Icon, title, children }) => (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-3"><div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4 w-4" /></div><h4 className="font-semibold text-sm">{title}</h4></div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-thin">
        <h3 className="text-lg font-bold">Review Your Submission</h3>
        <p className="text-sm text-muted-foreground">Please confirm the details below before finishing.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <SumCard icon={Package} title="Products">
            <p><span className="text-muted-foreground">Family: </span>{w.productFamily}</p>
            <p><span className="text-muted-foreground">Selected: </span>{w.selectedProducts.length}</p>
          </SumCard>
          <SumCard icon={Globe2} title="Countries">
            <p><span className="text-muted-foreground">Selected: </span>{w.selectedCountries.length}</p>
            <p className="text-xs text-muted-foreground truncate">{w.selectedCountries.slice(0,6).join(', ')}{w.selectedCountries.length > 6 ? '...' : ''}</p>
          </SumCard>
          <SumCard icon={ClipboardList} title="Registrations">
            <p><span className="text-muted-foreground">Selected: </span>{w.selectedRegistrations.length}</p>
          </SumCard>
          <SumCard icon={FileText} title="Details">
            <p><span className="text-muted-foreground">Change Type: </span>{w.details.changeType || '—'}</p>
            <p><span className="text-muted-foreground">Category: </span>{w.details.changeCategory || '—'}</p>
            <p><span className="text-muted-foreground">Trigger: </span>{w.details.triggerDate ? format(new Date(w.details.triggerDate), 'MMM d, yyyy') : '—'}</p>
          </SumCard>
        </div>
        {w.details.shortDescription && (
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Short Description</p>
            <p className="text-sm">{w.details.shortDescription}</p>
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Back</Button>
          <Button onClick={onConfirm} className="gap-1.5"><Check className="h-4 w-4" />Confirm & Finish</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SuccessDialog({ open, onOpenChange, onView, onDashboard }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mb-2 animate-fade-in">
          <PartyPopper className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold">Label Change Request Created Successfully</h3>
        <p className="text-sm text-muted-foreground">Your label change request has been submitted and is now pending review.</p>
        <div className="flex gap-2 pt-3">
          <Button variant="outline" className="flex-1" onClick={onDashboard}>Back to Dashboard</Button>
          <Button className="flex-1" onClick={onView}>View Request</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AddLabelChangePage() {
  return <WizardProvider><WizardInner /></WizardProvider>;
}
