import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  subItems?: NavItem[];
}

const navigationData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: User, href: '#' },
  {
    id: 'sales',
    label: 'Sales',
    icon: FileText, // Placeholder, main category might not have a direct href if it's a group
    subItems: [
      { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
      { id: 'invoices', label: 'Invoices', icon: Receipt, href: '#' },
    ],
  },
  { id: 'items', label: 'Items', icon: ShoppingCart, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const bottomNavigationData: NavItem[] = [
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNavItem: React.FC<NavItem & { isOpen?: boolean; onToggle?: () => void }> = ({ label, icon: Icon, href, isActive, subItems, isOpen, onToggle }) => {
  if (subItems && subItems.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start px-3 py-2 text-sm font-medium rounded-md',
              isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <Icon className="mr-3 h-5 w-5" />
            {label}
            <span className="ml-auto">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-1 py-1">
          {subItems.map((item) => (
            <SidebarNavItem key={item.id} {...item} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full justify-start px-3 py-2 text-sm font-medium rounded-md',
        isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
    >
      <a href={href}>
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </a>
    </Button>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenCollapsible(prev => prev === id ? null : id);
  };

  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col justify-between h-full', className)}>
      <div>
        <div className="mb-6 flex items-center space-x-2 px-2">
          {/* Placeholder for Logo, using text for now based on OCR */}
          <span className="font-bold text-2xl text-primary-text">DO</span>
        </div>
        <nav className="space-y-1">
          {navigationData.map((item) => (
            <SidebarNavItem 
              key={item.id} 
              {...item} 
              isOpen={openCollapsible === item.id}
              onToggle={() => item.subItems && handleToggle(item.id)}
            />
          ))}
        </nav>
      </div>
      <nav className="space-y-1 mt-auto border-t border-sidebar-border pt-4">
        {bottomNavigationData.map((item) => (
          <SidebarNavItem key={item.id} {...item} />
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNav;
