import { LayoutDashboard, BarChart3, Package, AppWindow, FileCheck, Tag, Settings, User, LogOut } from 'lucide-react';

export const primaryNav = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'reports', label: 'Reports', href: '/reports', icon: BarChart3 },
  { key: 'products', label: 'Products', href: '/products', icon: Package },
  { key: 'applications', label: 'Applications', href: '/applications', icon: AppWindow },
  { key: 'registrations', label: 'Registrations', href: '/registrations', icon: FileCheck },
  { key: 'label', label: 'Label', href: '/label', icon: Tag },
];

export const secondaryNav = [
  { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
  { key: 'profile', label: 'Profile', href: '/profile', icon: User },
  { key: 'logout', label: 'Logout', href: '/logout', icon: LogOut },
];
