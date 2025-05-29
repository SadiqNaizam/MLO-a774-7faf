import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
  textColor?: string; // Tailwind text color class for progress bar text if needed
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-destructive' }, // Red
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-accent-yellow' }, // Yellow
  { id: 'in-conversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-primary' }, // Blue from theme
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-accent' }, // Green
  { id: 'closed-won', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-500' }, // Purple
];

const FunnelCard: React.FC<{ className?: string }> = ({ className }) => {
  const totalLeadsInFunnel = funnelData.reduce((sum, stage) => sum + stage.count, 0);
  const activeLeads = 600; // This is a top-level number from the image, distinct from funnel stages sum

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">{activeLeads}</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>

        <TooltipProvider>
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-6 bg-muted">
            {funnelData.map((stage) => {
              const percentage = totalLeadsInFunnel > 0 ? (stage.count / totalLeadsInFunnel) * 100 : 0;
              return (
                <Tooltip key={stage.id} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn("h-full transition-all duration-300 ease-in-out", stage.color)}
                      style={{ width: `${percentage}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stage.name}: {stage.count} leads</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        <div className="space-y-3">
          {funnelData.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn("w-2.5 h-2.5 rounded-full", stage.color)}></div>
              <div className="text-foreground truncate">{stage.name}</div>
              <div className="text-muted-foreground text-right">{stage.count}</div>
              <div className="text-muted-foreground text-right">$ {stage.value}</div>
              {stage.id === 'in-conversation' ? (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <div className="text-muted-foreground text-right cursor-default">2 days</div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-white text-xs p-2 rounded-sm">
                            <p>{stage.time}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="text-muted-foreground text-right">{stage.time}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelCard;
