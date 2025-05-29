import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelCard from '../components/Dashboard/FunnelCard';
import SourcesCard from '../components/Dashboard/SourcesCard';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import LeadsSummary from '../components/Dashboard/LeadsSummary';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard Overview">
      {/* Row 1: FunnelCard and SourcesCard */}
      {/* This div creates the first row in the flex-col layout of MainAppLayout's content area */}
      {/* Inside this row, a grid is used to place FunnelCard and SourcesCard side-by-side */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <FunnelCard className="xl:col-span-3" />
        <SourcesCard className="xl:col-span-2" />
      </div>
      
      {/* Row 2: LeadsTrackingChart */}
      {/* This component will take the full width of its row in the flex-col layout */}
      <LeadsTrackingChart />
      
      {/* Row 3: LeadsSummary */}
      {/* This component will also take the full width of its row */}
      <LeadsSummary />
    </MainAppLayout>
  );
};

export default IndexPage;
