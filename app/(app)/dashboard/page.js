'use client';

import Breadcrumb from '@/components/labelflow/breadcrumb';
import PageHeader from '@/components/labelflow/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser, dashboardStats, recentActivity, announcements, quickActions } from '@/lib/data/mock';
import { Package, Tag, Clock, FileCheck, TrendingUp, TrendingDown, ArrowUpRight, BarChart3, Plus, Megaphone, Zap, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const ICONS = { Package, Tag, Clock, FileCheck, BarChart3, Zap };

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(' ')[0]}`}
        description="Here's what's happening across your organization today."
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm" className="gap-1.5" onClick={() => router.push('/label')}><Plus className="h-4 w-4" />New Label Change</Button>
          </>
        }
      />

      {/* Welcome / Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map(stat => {
          const Icon = ICONS[stat.icon] || Package;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={stat.id} className="group rounded-lg border border-border bg-card p-5 hover:shadow-enterprise-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className={cn(
                  'flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full',
                  stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                )}>
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome banner */}
      <div className="rounded-lg border border-border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6 flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">You&apos;re on the Enterprise plan</h3>
            <p className="text-sm text-muted-foreground">Access all modules including Label Wizard, Reports & Country Dependencies.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">Learn more <ArrowUpRight className="h-3.5 w-3.5" /></Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-sm">Recent Activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest events across your workspace</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">View all <ArrowUpRight className="h-3 w-3" /></Button>
          </div>
          <ul className="divide-y divide-border">
            {recentActivity.map(item => (
              <li key={item.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-muted/40 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-[11px] font-semibold">{item.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{item.user}</span>
                    <span className="text-muted-foreground"> {item.action} </span>
                    <span className="font-medium text-primary">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-lg border border-border bg-card">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-sm">Quick Actions</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Jump right in</p>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {quickActions.map(action => {
                const Icon = ICONS[action.icon] || Zap;
                return (
                  <button key={action.id} onClick={() => router.push(action.href)} className="group flex flex-col items-start gap-2 p-3 rounded-md border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                    <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium leading-tight">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Announcements */}
          <div className="rounded-lg border border-border bg-card">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Announcements</h3>
            </div>
            <ul className="divide-y divide-border">
              {announcements.map(a => (
                <li key={a.id} className="px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={a.priority === 'warning' ? 'destructive' : 'secondary'} className="text-[10px] px-1.5 py-0">{a.tag}</Badge>
                  </div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
