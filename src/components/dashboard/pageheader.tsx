import React from 'react';
import { cn } from '@/lib/utils';
import DashboardTabs from './Tabs'; // Assuming Tabs.tsx is in the same directory

interface PageHeaderProps {
  title: string;
  className?: string;
  // Potentially props for Tabs if active tab is managed here
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title,
  className,
  activeTab = 'leads', // Default based on image
  onTabChange 
}) => {
  return (
    <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-6', className)}>
      <h1 className="text-3xl font-bold text-primary-text mb-4 md:mb-0">{title}</h1>
      <DashboardTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default PageHeader;
