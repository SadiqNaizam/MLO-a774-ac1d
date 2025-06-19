import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

interface StatCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode; // For elements like dropdowns in the header
  className?: string;
  contentClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  description,
  children,
  action,
  className,
  contentClassName
}) => {
  return (
    <Card className={cn('bg-card shadow-sm backdrop-blur-lg', className)}> {/* Added backdrop-blur-lg */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-primary-text">{title}</CardTitle>
          {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
        </div>
        {action && <div className="ml-auto">{action}</div>}
      </CardHeader>
      <CardContent className={cn(contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default StatCard;