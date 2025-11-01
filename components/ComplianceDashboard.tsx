import React, { useState, useMemo } from 'react';
import SummaryCard from './SummaryCard';
import SeverityPill from './SeverityPill';
import StatusPill from './StatusPill';
import ComplianceStatusChart from './ComplianceStatusChart';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { ClipboardDocumentCheckIcon } from './icons/ClipboardDocumentCheckIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { complianceChecksData } from '../constants';
import { ComplianceFramework, ComplianceCheck, CheckStatus } from '../types';

const ComplianceCheckCard: React.FC<{ check: ComplianceCheck }> = ({ check }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
             <div className="flex-grow">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-primary-400 font-mono text-xs">{check.controlId}</span>
                    <StatusPill status={check.status} />
                    {check.status === 'Failed' && <SeverityPill severity={check.severity} />}
                </div>
                <p className="text-md text-white mt-2">{check.description}</p>
             </div>
             <div className="flex-shrink-0 mt-3 sm:mt-0 sm:ml-4 text-left sm:text-right">
                <p className="text-sm text-gray-400">Resource</p>
                <p className="text-sm font-medium text-gray-300 truncate">{check.resource}</p>
            </div>
        </div>
    </div>
);


const ComplianceDashboard: React.FC = () => {
    const [activeFramework, setActiveFramework] = useState<ComplianceFramework>('SOC 2');
    const [activeStatusFilter, setActiveStatusFilter] = useState<CheckStatus | 'All'>('All');

    const frameworks: ComplianceFramework[] = ['SOC 2', 'ISO 27001', 'GDPR'];
    const statusFilters: (CheckStatus | 'All')[] = ['All', 'Passed', 'Failed', 'In Progress'];

    const frameworkChecks = useMemo(() => {
        return complianceChecksData.filter(c => c.framework === activeFramework);
    }, [activeFramework]);

    const filteredChecks = useMemo(() => {
        if (activeStatusFilter === 'All') {
            return frameworkChecks;
        }
        return frameworkChecks.filter(c => c.status === activeStatusFilter);
    }, [frameworkChecks, activeStatusFilter]);
    
    const complianceStats = useMemo(() => {
        const total = frameworkChecks.length;
        if (total === 0) return { passed: 0, failed: 0, score: 0 };
        const passed = frameworkChecks.filter(c => c.status === 'Passed').length;
        const failed = frameworkChecks.filter(c => c.status === 'Failed').length;
        const score = Math.round((passed / total) * 100);
        return { passed, failed, score };
    }, [frameworkChecks]);


  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-white">Compliance Dashboard</h1>
        <p className="text-gray-400 mt-1">Monitor your adherence to industry standards and regulations.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <SummaryCard 
                title="Overall Compliance" 
                value={`${complianceStats.score}%`}
                change={activeFramework}
                changeType="good" 
                icon={CheckBadgeIcon} 
                iconBgColor="bg-green-500/20"
                iconColor="text-green-400"
            />
            <SummaryCard 
                title="Controls Passed" 
                value={complianceStats.passed.toString()}
                change={`out of ${frameworkChecks.length}`}
                changeType="good" 
                icon={ClipboardDocumentCheckIcon} 
                iconBgColor="bg-blue-500/20"
                iconColor="text-blue-400"
            />
            <SummaryCard 
                title="Checks Failing" 
                value={complianceStats.failed.toString()}
                change="require attention"
                changeType="bad" 
                icon={XCircleIcon}
                iconBgColor="bg-red-500/20"
                iconColor="text-red-400"
            />
        </div>

        {/* Framework Tabs */}
        <div className="mt-8 border-b border-gray-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {frameworks.map(framework => (
                    <button
                        key={framework}
                        onClick={() => setActiveFramework(framework)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeFramework === framework
                            ? 'border-primary-500 text-primary-400'
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                        }`}
                    >
                        {framework}
                    </button>
                ))}
            </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
                <h2 className="text-white font-semibold">Controls Status</h2>
                <p className="text-sm text-gray-400 mb-4">Breakdown for {activeFramework}</p>
                <ComplianceStatusChart checks={frameworkChecks} />
            </div>

            <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {statusFilters.map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setActiveStatusFilter(filter)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                activeStatusFilter === filter 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="space-y-4">
                     {filteredChecks.length > 0 ? (
                        filteredChecks.map(check => <ComplianceCheckCard key={check.id} check={check} />)
                    ) : (
                        <div className="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
                            <p className="text-gray-400">No compliance checks found for this filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ComplianceDashboard;
