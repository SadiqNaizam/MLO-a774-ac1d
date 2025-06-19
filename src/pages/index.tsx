import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import StatCard from '../components/Dashboard/StatCard';
import LeadsTrackingGraph from '../components/Dashboard/LeadsTrackingGraph';
import ReasonsSummary from '../components/Dashboard/ReasonsSummary';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { CalendarDays, TrendingUp, TrendingDown, Users } from 'lucide-react'; 
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { cn } from '../lib/utils';

// Data Interfaces
interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  colorClass: string; // Tailwind CSS class for background color
  averageTimeOnStage?: boolean;
}

interface Source {
  name: string;
  value: number; // Monetary value
  percentage: number;
  color: string; // Hex/HSL color string for Recharts
}

// Dummy Data
const totalActiveLeads = 600;
const funnelStagesData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 300, value: 200, duration: '2 days', colorClass: 'bg-orange-400' },
  { id: 'qualified', name: 'Qualified', count: 150, value: 100, duration: '2 days', colorClass: 'bg-yellow-400', averageTimeOnStage: true },
  { id: 'inConversation', name: 'In conversation', count: 80, value: 100, duration: '5 days', colorClass: 'bg-sky-500' },
  { id: 'negotiations', name: 'Negotiations', count: 40, value: 50, duration: '8 days', colorClass: 'bg-teal-500' },
  { id: 'closedWon', name: 'Closed won', count: 30, value: 50, duration: '10 days', colorClass: 'bg-purple-500' },
];

const initialSourcesData: Source[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: 'hsl(var(--destructive))' },
  { name: 'Behance', value: 1500, percentage: 25, color: 'hsl(48, 96%, 56%)' }, // Custom gold/yellow
  { name: 'Instagram', value: 900, percentage: 15, color: 'hsl(var(--primary))' },
  { name: 'Dribbble', value: 600, percentage: 10, color: 'hsl(var(--accent))' },
];

const sourceTimeRanges = [
  { value: 'today', label: 'Today' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_6_months', label: 'Last 6 months' },
  { value: 'last_12_months', label: 'Last 12 months' },
] as const;

const sourceDisplayOptions = [
  { value: 'leads_came', label: 'Leads came' },
  { value: 'leads_converted', label: 'Leads Converted' },
  { value: 'total_deals_size', label: 'Total deals size' },
] as const;


const DashboardOverviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'leads'>('leads');
  const [currentSourceTimeRange, setCurrentSourceTimeRange] = useState<typeof sourceTimeRanges[number]['value']>('last_6_months');
  const [activeSourceDisplay, setActiveSourceDisplay] = useState<typeof sourceDisplayOptions[number]['value']>('leads_converted');

  // In a real app, this data would be fetched or filtered based on state
  const displayedSourcesData = initialSourcesData;

  const renderFunnelStageProgress = () => (
    <div className="flex w-full h-3 rounded-full overflow-hidden my-2 bg-muted/70"> {/* Adjusted bg-muted opacity */}
      {funnelStagesData.map((stage) => (
        <TooltipProvider key={stage.id} delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(stage.colorClass, "h-full transition-all duration-300 ease-in-out")}
                style={{ width: `${(stage.count / totalActiveLeads) * 100}%` }}
                aria-label={`${stage.name}: ${stage.count} leads`}
              />
            </TooltipTrigger>
            <TooltipContent className="backdrop-blur-md"> {/* Added backdrop-blur-md */}
              <p>{stage.name}: {stage.count} leads ({((stage.count / totalActiveLeads) * 100).toFixed(1)}%)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}\
    </div>
  );

  const CustomPieLegend = (props: { payload?: Array<{ value: string; color: string }> }) => {
    const { payload } = props;
    if (!payload) return null;

    return (
      <ul className="mt-4 space-y-2 text-sm">
        {payload.map((entry, index) => {
          const sourceItem = displayedSourcesData.find(s => s.name === entry.value);
          if (!sourceItem) return null;
          return (
            <li key={`item-${index}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-muted-foreground capitalize">{sourceItem.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-primary-text mr-2">${sourceItem.value.toLocaleString()}</span>
                <span className="text-muted-foreground">{sourceItem.percentage}%</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <MainAppLayout>
      <div className="flex flex-col gap-6">
        <PageHeader 
          title="Dashboard" 
          activeTab={activeTab} 
          onTabChange={(tabId) => setActiveTab(tabId as 'sales' | 'leads')} 
        />

        {activeTab === 'leads' && (
          <div className="flex flex-col gap-6">
            {/* StatCard already has backdrop-blur-lg from its definition */}
            <StatsCardGrid>
              <StatCard 
                title="Funnel count"
                description={`${totalActiveLeads} active leads`}
              >
                {renderFunnelStageProgress()}
                <ul className="space-y-3 mt-4">
                  {funnelStagesData.map((stage) => (
                    <li key={stage.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className={cn("w-2.5 h-2.5 rounded-full mr-2.5", stage.colorClass)} />
                        <span className="text-muted-foreground w-28 truncate" title={stage.name}>{stage.name}</span>
                        <span className="ml-2 font-medium text-primary-text w-10 text-right">{stage.count}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-3 w-12 text-right">${stage.value}</span>
                        {stage.averageTimeOnStage ? (
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-xs bg-foreground/80 text-background px-1.5 py-0.5 rounded cursor-default tabular-nums w-[50px] text-center"> {/* Adjusted bg opacity */}
                                  {stage.duration}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="backdrop-blur-md"> {/* Added backdrop-blur-md */}
                                <p>Average time on this stage</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-muted-foreground text-xs tabular-nums w-[50px] text-center">{stage.duration}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </StatCard>

              <StatCard 
                title="Sources"
                action={
                  <Select value={currentSourceTimeRange} onValueChange={(value) => setCurrentSourceTimeRange(value as typeof sourceTimeRanges[number]['value'])}>
                    <SelectTrigger className="w-auto md:w-[150px] text-xs h-9 bg-transparent hover:bg-muted/30"> {/* Adjusted SelectTrigger background */}
                      <CalendarDays className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-md"> {/* Added backdrop-blur-md */}
                      {sourceTimeRanges.map(option => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
              >
                <div className="h-[180px] w-full mt-2 mb-2"> 
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={displayedSourcesData}
                        cx="50%"
                        cy="50%"
                        innerRadius="55%"
                        outerRadius="80%"
                        paddingAngle={3}
                        dataKey="percentage"
                        nameKey="name"
                      >
                        {displayedSourcesData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} className="focus:outline-none" />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value: number, name: string) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover) / 0.8)', // Popover with alpha for Tooltip
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                          color: 'hsl(var(--popover-foreground))',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          backdropFilter: 'blur(8px)', // explicit blur for recharts tooltip
                        }}
                        labelStyle={{ fontWeight: '500' }}
                        cursor={{fill: 'hsl(var(--accent) / 0.2)'}}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <CustomPieLegend payload={displayedSourcesData.map(s => ({value: s.name, color: s.color}))} />
                <div className="mt-3 text-xs text-muted-foreground text-right">
                  from leads total
                </div>
                <ToggleGroup 
                  type="single" 
                  value={activeSourceDisplay}
                  onValueChange={(value) => {
                    if (value) setActiveSourceDisplay(value as typeof sourceDisplayOptions[number]['value']);
                  }}
                  className="w-full mt-3 grid grid-cols-3 gap-1"
                  aria-label="Source Data Display Type"
                >
                  {sourceDisplayOptions.map(opt => (
                     <ToggleGroupItem 
                       key={opt.value} 
                       value={opt.value} 
                       aria-label={opt.label}
                       className="text-xs px-2 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-primary data-[state=on]:font-semibold hover:bg-muted/50 h-auto flex-1 border border-transparent data-[state=on]:border-border" // Adjusted hover
                     >
                       {opt.label}
                     </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </StatCard>
            </StatsCardGrid>

            <LeadsTrackingGraph /> {/* StatCard inside this already has blur */}
            <ReasonsSummary /> {/* StatCard inside this already has blur */}
          </div>
        )}

        {activeTab === 'sales' && (
          <Card className="shadow-sm backdrop-blur-lg"> {/* Added backdrop-blur-lg */}
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary-text">Sales Overview</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Detailed sales metrics, performance charts, and revenue data. (Placeholder)
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <p className="text-muted-foreground">
                Sales-specific components and data visualizations would be displayed here. 
                This section is currently a placeholder for future development.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[\
                  { title: "Total Revenue", value: "$1,250,800", change: "+12.5%", icon: TrendingUp, iconColor: "text-success" },
                  { title: "New Customers", value: "320", change: "+8.2%", icon: Users, iconColor: "text-success" },
                  { title: "Avg. Deal Size", value: "$3,908", change: "-1.1%", icon: TrendingDown, iconColor: "text-destructive" }\
                ].map((item, i) => (
                  <Card key={i} className="bg-card backdrop-blur-lg"> {/* Added backdrop-blur-lg to inner cards too */}
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                      <item.icon className={cn("h-4 w-4", item.iconColor)} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary-text">{item.value}</div>
                      <p className={cn("text-xs", item.iconColor)}>\
                        {item.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}\
              </div>
            </CardContent>
          </Card>
        )}\
      </div>
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;