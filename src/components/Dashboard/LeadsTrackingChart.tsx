import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 85, closedLost: 65 },
  { month: 'April', closedWon: 60, closedLost: 38 },
  { month: 'May', closedWon: 75, closedLost: 58 },
  { month: 'June', closedWon: 30, closedLost: 82 },
  { month: 'July', closedWon: 65, closedLost: 45 },
  { month: 'August', closedWon: 95, closedLost: 32 },
];

const LeadsTrackingChart: React.FC<{ className?: string }> = ({ className }) => {
  const totalClosed = 680;
  const totalLost = 70;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
        {/* Dropdown for 'last 6 months' omitted */}
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex space-x-6">
          <div>
            <span className="text-3xl font-bold text-foreground">{totalClosed}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">total closed</span>
          </div>
          <div>
            <span className="text-3xl font-bold text-foreground">{totalLost}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">total lost</span>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={leadsTrackingData}
              margin={{
                top: 5,
                right: 20, // Adjusted right margin for better label visibility
                left: -20, // Adjusted left margin for YAxis numbers
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dx={-5}
              />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    borderRadius: 'var(--radius)', 
                    borderColor: 'hsl(var(--border))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="top" 
                align="left" 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingBottom: '20px', marginLeft: '20px' }}
                formatter={(value, entry) => (
                  <span style={{ color: 'hsl(var(--muted-foreground))', marginLeft: '5px' }}>{value}</span>
                )}
              />
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="closedWon"
                stroke="hsl(var(--accent))"
                fillOpacity={1}
                fill="url(#colorClosedWon)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: 'hsl(var(--accent))', strokeWidth: 2, stroke: 'hsl(var(--card))'}}
                activeDot={{ r: 6, fill: 'hsl(var(--accent))', strokeWidth: 2, stroke: 'hsl(var(--card))'}}
                name="Closed won"
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorClosedLost)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: 'hsl(var(--destructive))', strokeWidth: 2, stroke: 'hsl(var(--card))'}}
                activeDot={{ r: 6, fill: 'hsl(var(--destructive))', strokeWidth: 2, stroke: 'hsl(var(--card))'}}
                name="Closed lost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
