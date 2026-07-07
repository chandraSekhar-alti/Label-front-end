'use client';

import Breadcrumb from '@/components/labelflow/breadcrumb';
import PageHeader from '@/components/labelflow/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser } from '@/lib/data/mock';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <PageHeader title="Profile" description="Manage your personal information and preferences" />

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">{currentUser.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{currentUser.name}</h3>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentUser.role} • {currentUser.department}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input defaultValue={currentUser.name} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input defaultValue={currentUser.email} type="email" />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Input defaultValue={currentUser.role} disabled />
          </div>
          <div className="space-y-1.5">
            <Label>Department</Label>
            <Input defaultValue={currentUser.department} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
