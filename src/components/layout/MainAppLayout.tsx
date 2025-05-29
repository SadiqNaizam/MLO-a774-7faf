import React from 'react';
import SidebarNav from './SidebarNav';
import HeaderBar from './HeaderBar';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle: string; // Passed to HeaderBar
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle, className }) => {
  return (
    <div className={cn("h-screen flex flex-col overflow-hidden bg-background", className)}>
      {/* SidebarNav is fixed and positioned by its own styles */}
      <SidebarNav />
      {/* HeaderBar is fixed and positioned by its own styles */}
      <HeaderBar title={pageTitle} />
      
      {/* Main content area container */}
      {/* This div needs to be explicitly positioned to avoid being obscured by fixed SidebarNav and HeaderBar */}
      {/* It also needs to be scrollable as per requirements */}
      <main 
        className={cn(
          "ml-60",                      // Offset for SidebarNav width (w-60 = 240px)
          "mt-[70px]",                  // Offset for HeaderBar height (h-[70px])
          "p-6",                        // Padding for the content area itself (mainContent.layout)
          "flex-1",                     // Take up remaining vertical space (parent is flex-col h-screen)
          "overflow-y-auto",            // Make this area scrollable (mainContent.sizing)
          "min-w-0"                     // Prevent content from breaking layout (mainContent.sizing)
        )}
      >
        {/* This inner div is the 'mainContent.container' for card/chart arrangement */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
