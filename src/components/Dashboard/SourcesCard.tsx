import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SourceDataPoint {
  name: string;
  value: number; // This would be the count for 'Leads Came', monetary for 'Total Deals Size', or count for 'Leads Converted'
  percentage: number; // Only relevant for 'Leads Converted' as per image
  fill: string; // Chart color
  monetaryValue: number; // Specifically for displaying $ value from image
}

const leadsConvertedData: SourceDataPoint[] = [
  { name: 'Clutch', value: 50, percentage: 50, fill: 'hsl(var(--destructive))', monetaryValue: 3000 },
  { name: 'Behance', value: 40, percentage: 40, fill: 'hsl(var(--accent-yellow))', monetaryValue: 1000 },
  { name: 'Instagram', value: 10, percentage: 10, fill: 'hsl(var(--primary))', monetaryValue: 1000 }, // Using primary as a dark teal substitute
  { name: 'Dribbble', value: 10, percentage: 10, fill: 'hsl(var(--accent))', monetaryValue: 1000 },  // Using accent as light green
];

// Dummy data for other tabs to illustrate structure - not fully implemented chart switching logic
const leadsCameData: SourceDataPoint[] = [
  { name: 'Clutch', value: 100, percentage: 0, fill: 'hsl(var(--destructive))', monetaryValue: 0 }, 
  { name: 'Behance', value: 80, percentage: 0, fill: 'hsl(var(--accent-yellow))', monetaryValue: 0 },
  { name: 'Instagram', value: 50, percentage: 0, fill: 'hsl(var(--primary))', monetaryValue: 0 },
  { name: 'Dribbble', value: 40, percentage: 0, fill: 'hsl(var(--accent))', monetaryValue: 0 },
];

const totalDealsSizeData: SourceDataPoint[] = [
  { name: 'Clutch', value: 15000, percentage: 0, fill: 'hsl(var(--destructive))', monetaryValue: 15000 }, 
  { name: 'Behance', value: 8000, percentage: 0, fill: 'hsl(var(--accent-yellow))', monetaryValue: 8000 },
  { name: 'Instagram', value: 5000, percentage: 0, fill: 'hsl(var(--primary))', monetaryValue: 5000 },
  { name: 'Dribbble', value: 3000, percentage: 0, fill: 'hsl(var(--accent))', monetaryValue: 3000 },
];

type TabKey = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const dataMap: Record<TabKey, { data: SourceDataPoint[], label: string }> = {
  leadsCame: { data: leadsCameData, label: 'Leads Came' },
  leadsConverted: { data: leadsConvertedData, label: 'Leads Converted' },
  totalDealsSize: { data: totalDealsSizeData, label: 'Total Deals Size' },
};

const SourcesCard: React.FC<{ className?: string }> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<TabKey>('leadsConverted');

  const currentChartData = dataMap[activeTab].data;
  const isLeadsConvertedTab = activeTab === 'leadsConverted';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
        {/* Dropdown for 'last 6 months' omitted as per instructions */}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-1 mb-4">
          {(Object.keys(dataMap) as TabKey[]).map((tabKey) => (
            <Button
              key={tabKey}
              variant={activeTab === tabKey ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "px-3 py-1 h-auto text-xs rounded-md",
                activeTab === tabKey ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
              )}
              onClick={() => setActiveTab(tabKey)}
            >
              {dataMap[tabKey].label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50} // For Donut shape
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--card))" // Card background for segment separation
                  strokeWidth={3}
                >
                  {currentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderRadius: 'var(--radius)', borderColor: 'hsl(var(--border))' }}
                  formatter={(value: number, name: string) => {
                     const entry = currentChartData.find(d => d.name === name);
                     if (isLeadsConvertedTab && entry) return [`${entry.percentage}%`, name];
                     return [value, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {currentChartData.map((source, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: source.fill }}></span>
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground w-16 text-right mr-2">$ {source.monetaryValue.toLocaleString()}</span>
                  {isLeadsConvertedTab && (
                     <span className="text-foreground font-medium w-8 text-right">{source.percentage}%</span>
                  )}
                </div>
              </div>
            ))}
            {isLeadsConvertedTab && (
                <div className="text-xs text-muted-foreground text-right pt-1">
                    from leads total
                </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesCard;
