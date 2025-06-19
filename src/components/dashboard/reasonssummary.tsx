import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReasonItem {
  percentage: number;
  reason: string;
}

const reasonsData: ReasonItem[] = [
  { percentage: 40, reason: 'The proposal is unclear' },
  { percentage: 20, reason: 'However venture pursuit' },
  { percentage: 10, reason: 'Other miscellaneous factors' }, 
  { percentage: 30, reason: 'Timeline or budget mismatch' }, 
];

interface OtherDataItem {
  value: string | number;
  label: string;
  tooltip?: string;
}

const otherDataItems: OtherDataItem[] = [
  { value: 900, label: 'total leads count' },
  { value: 12, label: 'days in average to convert lead' },
  { value: 30, label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days.' },
];

interface ReasonsSummaryProps {
  className?: string;
}

const ReasonsSummary: React.FC<ReasonsSummaryProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <Card className="bg-card shadow-sm backdrop-blur-lg"> {/* Added backdrop-blur-lg */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary-text">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reasonsData.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="w-16">
                <p className="text-2xl font-bold text-primary-text">{item.percentage}%</p>
              </div>
              <p className="text-sm text-muted-foreground flex-1">{item.reason}</p>
            </div>
          ))}\
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm backdrop-blur-lg"> {/* Added backdrop-blur-lg */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary-text">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          {otherDataItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start">
              <p className="text-3xl font-bold text-primary-text">{item.value}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span>{item.label}</span>
                {item.tooltip && (
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-popover text-popover-foreground p-2 rounded-md shadow-lg max-w-xs backdrop-blur-md"> {/* Added backdrop-blur-md */}
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}\
              </div>
            </div>
          ))}\
        </CardContent>
      </Card>
    </div>
  );
};

export default ReasonsSummary;