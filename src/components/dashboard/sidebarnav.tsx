import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User, // Already imported, can be used for Profile
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
import { Link } from 'react-router-dom'; // Added import

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  subItems?: NavItem[];
}

const navigationData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/', isActive: true }, // Changed href to '/' for clarity
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: User, href: '#' },
  {
    id: 'sales',
    label: 'Sales',
    icon: FileText,
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
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' }, // Added Profile link
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNavItem: React.FC<NavItem & { isOpen?: boolean; onToggle?: () => void }> = ({ 
  label, 
  icon: Icon, 
  href, 
  isActive, 
  subItems, 
  isOpen, 
  onToggle 
}) => {
  const navButtonBaseClass = 'w-full justify-start px-3 py-2 text-sm font-medium rounded-md';
  const activeClass = 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'; // Using sidebar specific colors if defined, else fallback to primary
  const inactiveClass = 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground';

  if (subItems && subItems.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              navButtonBaseClass,
              // Check if any subItem is active to highlight the parent; for simplicity, using isOpen or a dedicated parentActive prop
              // For now, relying on general inactive class for trigger, active state handled by children.
              // If the collapsible itself can be "active" (e.g. current page is one of its children), that logic would be here.
              // This example uses `isActive` prop potentially for the collapsible trigger itself if it were a link.
              isActive ? activeClass : inactiveClass 
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
            // Pass item's isActive state; a real router setup would use NavLink or useLocation here for better active state handling.
            <SidebarNavItem 
                key={item.id} 
                {...item} 
                // For sub-items, isActive might need to be determined based on current route vs sub-item.href
                // For simplicity, directly passing item.isActive from data or assuming it's handled by router.
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // For non-collapsible items
  if (href) {
    if (href.startsWith('/')) { // Internal link
      return (
        <Button
          asChild
          variant="ghost"
          className={cn(navButtonBaseClass, isActive ? activeClass : inactiveClass)}
        >
          <Link to={href}>
            <Icon className="mr-3 h-5 w-5" />
            {label}
          </Link>
        </Button>
      );
    } else { // External link (e.g. '#', or http://...)
      return (
        <Button
          asChild
          variant="ghost"
          className={cn(navButtonBaseClass, isActive ? activeClass : inactiveClass)}
        >
          <a href={href} {...(href.startsWith('#') ? {} : {target: "_blank", rel: "noopener noreferrer"})}>
            <Icon className="mr-3 h-5 w-5" />
            {label}
          </a>
        </Button>
      );
    }
  }

  // Fallback for items without href (e.g. a label-only item, though not typical for NavItem)
  return (
    <div className={cn(navButtonBaseClass, inactiveClass, 'opacity-50 cursor-not-allowed flex items-center')}>
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </div>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenCollapsible(prev => prev === id ? null : id);
  };
  
  // In a real app with react-router, you'd use useLocation() here to determine active state for items.
  // For example: const location = useLocation();
  // Then, for each item, isActive = location.pathname === item.href;
  // For this example, `isActive` is taken from the data or defaults to false.
  // The `Dashboard` item has `isActive: true` in data which will be used.
  // New `/profile` link won't be `isActive` unless its data entry includes it or dynamic logic is added.

  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground p-4 flex flex-col justify-between h-full', className)}>
      <div>
        <div className="mb-6 flex items-center space-x-2 px-2">
          <Link to="/" className="flex items-center space-x-2">
            {/* Placeholder for Logo, using text for now based on OCR. Assuming Box icon might be missing or for header. */}
            <span className="font-bold text-2xl text-primary-text">DO</span>
          </Link>
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