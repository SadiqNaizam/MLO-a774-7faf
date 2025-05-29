import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LostReason {
  id: string;
  percentage: number;
  reason: string;
}

const lostReasonsData: LostReason[] = [
  { id: 'lr1', percentage: 40, reason: 'The proposal is unclear' },
  { id: 'lr2', percentage: 20, reason: 'However venture pursuit' }, // Text from image, might be typo
  { id: 'lr3', percentage: 10, reason: 'Other' },
  { id: 'lr4', percentage: 30, reason: 'The proposal is unclear' }, // Duplicated reason, as per image
];

interface OtherStat {
  id: string;
  value: string | number;
  label: string;
  tooltip?: string;
}

const otherStatsData: OtherStat[] = [
  { id: 'os1', value: 900, label: 'total leads count' },
  { id: 'os2', value: 12, label: 'days in average to convert lead' },
  { id: 'os3', value: 30, label: 'inactive leads', tooltip: 'Information about inactive leads.' },
];

const LeadsSummary: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Reasons of leads lost</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {lostReasonsData.map((item) => (
              <div key={item.id}>
                <p className="text-3xl font-bold text-foreground">{item.percentage}%</p>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Other data</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {otherStatsData.map((item) => (
              <div key={item.id}>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{item.label}</span>
                  {item.tooltip && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsSummary;
