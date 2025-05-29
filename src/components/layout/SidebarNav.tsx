import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  FileSpreadsheet,
  ShoppingBag,
  Mail as MailIcon,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu as MenuIcon,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard' as const, icon: LayoutGrid },
  { href: '/leads', label: 'Leads' as const, icon: Users },
  { href: '/customers', label: 'Customers' as const, icon: User },
  { href: '/proposals', label: 'Proposals' as const, icon: FileText },
  { href: '/invoices', label: 'Invoices' as const, icon: FileSpreadsheet },
  { href: '/items', label: 'Items' as const, icon: ShoppingBag },
  { href: '/mail', label: 'Mail' as const, icon: MailIcon },
  { href: '/shoebox', label: 'Shoebox' as const, icon: Archive },
  { href: '/calendar', label: 'Calendar' as const, icon: CalendarDays },
];

const helpNavItems: NavItem[] = [
  { href: '/help-center', label: 'Help' as const, icon: HelpCircle },
  { href: '/settings', label: 'Settings' as const, icon: Settings },
  { href: '/support', label: 'Help' as const, icon: HelpCircle }, // As per image, two help links
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
        className
      )}
    >
      <div className="flex h-[70px] items-center gap-3 border-b border-sidebar-border px-4">
        <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-muted/20">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          Bo
        </div>
        {/* Optional: App Name <span className="text-lg font-semibold">App Name</span> */}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary' // Active: Light primary background, primary text
                  : 'text-muted-foreground hover:bg-muted/20 hover:text-sidebar-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-sidebar-border px-3 py-4">
        {helpNavItems.map((item, index) => (
          <NavLink
            key={`${item.href}-${index}`} // Ensure unique key if hrefs could be same for different help items
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/20 hover:text-sidebar-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default SidebarNav;
