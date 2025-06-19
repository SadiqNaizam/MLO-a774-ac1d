import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardGridProps {
  children: React.ReactNode;
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ children, className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {children}
    </div>
  );
};

export default StatsCardGrid;
