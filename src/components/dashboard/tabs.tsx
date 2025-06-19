import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabItem {
  id: string;
  label: string;
}

const tabItems: TabItem[] = [
  { id: 'sales', label: 'Sales' },
  { id: 'leads', label: 'Leads' },
];

interface DashboardTabsProps {
  className?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  className,
  activeTab = 'leads',
  onTabChange
}) => {
  const handleValueChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleValueChange} className={cn(className)}>
      <TabsList className="bg-transparent p-0">
        {tabItems.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              'text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 text-base font-medium',
              'hover:text-primary'
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* TabsContent would be managed by the parent page component that uses these tabs */}
    </Tabs>
  );
};

export default DashboardTabs;
