import React from 'react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

const leadsTrackingData = [
  { name: 'March', closedWon: 68, closedLost: 72, forecast: 75 },
  { name: 'April', closedWon: 52, closedLost: 38, forecast: 60 },
  { name: 'May', closedWon: 78, closedLost: 32, forecast: 85 },
  { name: 'June', closedWon: 65, closedLost: 8, forecast: 70 },
  { name: 'July', closedWon: 82, closedLost: 42, forecast: 90 },
  { name: 'August', closedWon: 95, closedLost: 30, forecast: 100 },
];

interface LeadsTrackingGraphProps {
  className?: string;
}

const LeadsTrackingGraph: React.FC<LeadsTrackingGraphProps> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('last_6_months');

  // TODO: Implement data filtering based on timeRange if needed

  return (
    <Card className={cn('bg-card shadow-sm', className)}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-primary-text">Leads tracking</CardTitle>
          <div className="mt-1 flex items-center space-x-4">
            <p className="text-2xl font-bold text-primary-text">680 <span className="text-sm font-normal text-muted-foreground">total closed</span></p>
            <p className="text-2xl font-bold text-destructive">70 <span className="text-sm font-normal text-muted-foreground">total lost</span></p>
          </div>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_30_days">Last 30 days</SelectItem>
            <SelectItem value="last_3_months">Last 3 months</SelectItem>
            <SelectItem value="last_6_months">Last 6 months</SelectItem>
            <SelectItem value="last_12_months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend 
              verticalAlign="top" 
              align="left" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px' }}
              formatter={(value, entry) => {
                const { color } = entry;
                return <span style={{ color }}>{value.replace('closedW', 'Closed W').replace('closedL', 'Closed L')}</span>;
              }}
            />
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="closedWon" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} name="Closed won" dot={{ r:4, strokeWidth:2, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))' }}/>
            <Area type="monotone" dataKey="closedLost" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} name="Closed lost" dot={{ r:4, strokeWidth:2, fill: 'hsl(var(--destructive))' }} activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--background))', stroke: 'hsl(var(--destructive))' }}/>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;
