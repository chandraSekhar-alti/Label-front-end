'use client';

import PageHeader from './page-header';
import Breadcrumb from './breadcrumb';
import EmptyState from './empty-state';
import { Button } from '@/components/ui/button';
import { Plus, Construction } from 'lucide-react';

export default function PlaceholderPage({ title, description, moduleName }) {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />New {moduleName || 'Item'}</Button>
          </>
        }
      />
      <div className="rounded-lg border border-border bg-card shadow-enterprise-sm">
        <EmptyState
          icon={Construction}
          title={`${moduleName || title} module coming soon`}
          description="This module is part of the LabelFlow foundation. The business screens will be implemented in the next phase."
        />
      </div>
    </div>
  );
}
