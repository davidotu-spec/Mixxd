
import React from 'react';
import SummaryCard from './SummaryCard';
import ComplianceChart from './ComplianceChart';
import CostSavingsChart from './CostSavingsChart';
import ThreatsChart from './ThreatsChart';
import { ShieldIcon } from './icons/ShieldIcon';
import { DollarIcon } from './icons/DollarIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white">Welcome back, Alex</h1>
      <p className="text-gray-400 mt-1">Here's a snapshot of your cloud environment.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <SummaryCard 
          title="Active Threats" 
          value="18" 
          change="+3" 
          changeType="bad" 
          icon={ShieldIcon} 
          iconBgColor="bg-red-500/20"
          iconColor="text-red-400"
        />
        <SummaryCard 
          title="Potential Savings" 
          value="$2,150" 
          change="+12%" 
          changeType="good" 
          icon={DollarIcon} 
          iconBgColor="bg-green-500/20"
          iconColor="text-green-400"
        />
        <SummaryCard 
          title="Compliance Score" 
          value="85%" 
          change="-2%" 
          changeType="bad" 
          icon={CheckBadgeIcon}
          iconBgColor="bg-orange-500/20"
          iconColor="text-orange-400"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-white font-semibold">Compliance Status</h2>
          <p className="text-sm text-gray-400 mb-4">SOC 2 Framework</p>
          <ComplianceChart />
        </div>
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-white font-semibold">Monthly Cost Savings</h2>
          <p className="text-sm text-gray-400 mb-4">Last 6 months</p>
          <CostSavingsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-white font-semibold">Threats Detected Over Time</h2>
          <p className="text-sm text-gray-400 mb-4">Last 6 weeks</p>
          <ThreatsChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
