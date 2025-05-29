import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusCircle } from 'lucide-react';

interface HeaderBarProps {
  title: string;
  className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, className }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-60 right-0 z-10 flex h-[70px] items-center justify-between border-b border-border bg-card px-6',
        className
      )}
    >
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>New Lead</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>New Contact</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>New Proposal</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default HeaderBar;
