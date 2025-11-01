import React, { useState, useMemo } from 'react';
import SummaryCard from './SummaryCard';
import CostBreakdownChart from './CostBreakdownChart';
import CostTrendChart from './CostTrendChart';
import { DollarIcon } from './icons/DollarIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { optimizationOpportunitiesData } from '../constants';
import { OptimizationCategory, OptimizationOpportunity } from '../types';

const categoryIcons: Record<OptimizationCategory, React.ElementType> = {
    'Rightsizing': CpuChipIcon,
    'Idle Resource': TrashIcon,
    'Storage Tiering': ServerStackIcon,
    'Reserved Instances': DollarIcon,
};

const categoryStyles: Record<OptimizationCategory, string> = {
    'Rightsizing': 'border-blue-500/50',
    'Idle Resource': 'border-red-500/50',
    'Storage Tiering': 'border-yellow-500/50',
    'Reserved Instances': 'border-green-500/50',
};

const OpportunityCard: React.FC<{ opportunity: OptimizationOpportunity }> = ({ opportunity }) => {
    const Icon = categoryIcons[opportunity.category];
    return (
        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-colors border-l-4 ${categoryStyles[opportunity.category]}`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-400"/>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{opportunity.category}</span>
                    </div>
                    <h3 className="text-md font-semibold text-white mt-2">{opportunity.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{opportunity.description}</p>
                    <p className="text-sm text-gray-500 mt-2 font-mono text-xs">
                        Resource: {opportunity.resource}
                    </p>
                </div>
                <div className="flex-shrink-0 text-left md:text-right mt-2 md:mt-0">
                    <p className="text-gray-400 text-sm">Potential Savings</p>
                    <p className="text-2xl font-bold text-green-400">${opportunity.potentialSavings.toFixed(2)}</p>
                    <p className="text-gray-500 text-xs">per month</p>
                </div>
            </div>
        </div>
    );
};


const FinOpsHub: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<OptimizationCategory | 'All'>('All');
    const categoryFilters: (OptimizationCategory | 'All')[] = ['All', 'Rightsizing', 'Idle Resource', 'Storage Tiering', 'Reserved Instances'];

    const filteredOpportunities = useMemo(() => {
        if (activeFilter === 'All') {
            return optimizationOpportunitiesData;
        }
        return optimizationOpportunitiesData.filter(v => v.category === activeFilter);
    }, [activeFilter]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white">FinOps Hub</h1>
            <p className="text-gray-400 mt-1">Analyze, optimize, and manage your cloud spending.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <SummaryCard
                    title="Current Monthly Spend"
                    value="$12,450"
                    change="-2.5%"
                    changeType="good"
                    icon={DollarIcon}
                    iconBgColor="bg-blue-500/20"
                    iconColor="text-blue-400"
                />
                <SummaryCard
                    title="Potential Monthly Savings"
                    value="$2,150"
                    change="+212"
                    changeType="good"
                    icon={TrashIcon}
                    iconBgColor="bg-green-500/20"
                    iconColor="text-green-400"
                />
                <SummaryCard
                    title="Optimization Score"
                    value="78%"
                    change="+5%"
                    changeType="good"
                    icon={CpuChipIcon}
                    iconBgColor="bg-yellow-500/20"
                    iconColor="text-yellow-400"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-white font-semibold">Cost Breakdown</h2>
                    <p className="text-sm text-gray-400 mb-4">By service</p>
                    <CostBreakdownChart />
                </div>
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-white font-semibold">Monthly Cost Trend</h2>
                    <p className="text-sm text-gray-400 mb-4">Last 6 months vs. Forecast</p>
                    <CostTrendChart />
                </div>
            </div>

            {/* Opportunities */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8">
                <h2 className="text-white font-semibold">Optimization Opportunities</h2>
                <p className="text-sm text-gray-400 mb-4">Actionable recommendations to reduce cost</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {categoryFilters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                activeFilter === filter
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredOpportunities.length > 0 ? (
                        filteredOpportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-400">No opportunities found for this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinOpsHub;
