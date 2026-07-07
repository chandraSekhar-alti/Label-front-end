// Enterprise mock data for LabelFlow foundation

export const currentUser = {
  id: 'usr_001',
  name: 'John Doe',
  email: 'john.doe@labelflow.io',
  role: 'Administrator',
  department: 'Regulatory Affairs',
  avatar: null,
  initials: 'JD',
};

export const dashboardStats = [
  { id: 'total-products', label: 'Total Products', value: '1,284', change: '+12.4%', trend: 'up', icon: 'Package' },
  { id: 'active-labels', label: 'Active Labels', value: '5,967', change: '+3.1%', trend: 'up', icon: 'Tag' },
  { id: 'pending-review', label: 'Pending Review', value: '47', change: '-8.2%', trend: 'down', icon: 'Clock' },
  { id: 'registrations', label: 'Registrations', value: '2,793', change: '+18.7%', trend: 'up', icon: 'FileCheck' },
];

export const recentActivity = [
  { id: 1, user: 'Sarah Chen', action: 'created a label change', target: 'LC-2026-07-10523', time: '2 min ago', avatar: 'SC' },
  { id: 2, user: 'Michael Roberts', action: 'approved registration', target: 'REG-4821', time: '18 min ago', avatar: 'MR' },
  { id: 3, user: 'Priya Sharma', action: 'updated product family', target: 'Ambrisentan', time: '1 hour ago', avatar: 'PS' },
  { id: 4, user: 'David Kim', action: 'archived report', target: 'Q2 Compliance Report', time: '3 hours ago', avatar: 'DK' },
  { id: 5, user: 'Emma Wilson', action: 'submitted CCDS Update', target: 'LC-2026-07-10522', time: '5 hours ago', avatar: 'EW' },
];

export const announcements = [
  { id: 1, title: 'System maintenance scheduled', description: 'Planned downtime this Saturday, 02:00 UTC', tag: 'Maintenance', priority: 'info' },
  { id: 2, title: 'New compliance regulations effective', description: 'EU MDR updates take effect August 1st', tag: 'Regulatory', priority: 'warning' },
  { id: 3, title: 'Q3 KPI review meeting', description: 'Regulatory Affairs sync — July 15th', tag: 'Event', priority: 'info' },
];

export const quickActions = [
  { id: 1, label: 'Add Label Change', icon: 'Tag', href: '/label' },
  { id: 2, label: 'New Product', icon: 'Package', href: '/products' },
  { id: 3, label: 'View Reports', icon: 'BarChart3', href: '/reports' },
  { id: 4, label: 'Registrations', icon: 'FileCheck', href: '/registrations' },
];

export const notifications = [
  { id: 1, title: 'New label change awaits your review', time: '5 min ago', unread: true },
  { id: 2, title: 'Michael commented on REG-4821', time: '1 hour ago', unread: true },
  { id: 3, title: 'Weekly digest is ready', time: 'Yesterday', unread: false },
];
