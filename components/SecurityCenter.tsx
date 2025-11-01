import React, { useState, useMemo, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import SecurityPostureChart from './SecurityPostureChart';
import SeverityPill from './SeverityPill';
import { ShieldIcon } from './icons/ShieldIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { vulnerabilitiesData } from '../constants';
import { Severity, Vulnerability } from '../types';

const ClockIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const XMarkIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);


const statusStyles: Record<Vulnerability['status'], string> = {
    New: 'bg-blue-500/20 text-blue-400',
    Investigating: 'bg-yellow-500/20 text-yellow-400',
    Resolved: 'bg-green-500/20 text-green-400',
};

const VulnerabilityModal: React.FC<{ vulnerability: Vulnerability; onClose: () => void }> = ({ vulnerability, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vulnerability-title"
        >
            <div 
                className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="flex items-start justify-between p-6 border-b border-gray-700">
                    <div>
                        <h2 id="vulnerability-title" className="text-xl font-bold text-white">{vulnerability.title}</h2>
                        <div className="flex items-center gap-3 mt-2">
                           <SeverityPill severity={vulnerability.severity} />
                           <span className={`px-2 py-0.5 font-medium rounded text-xs ${statusStyles[vulnerability.status]}`}>{vulnerability.status}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <h3 className="text-md font-semibold text-gray-300">Description</h3>
                    <p className="text-sm text-gray-400 mt-2 whitespace-pre-wrap">{vulnerability.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                        <div>
                            <p className="text-gray-500 font-medium">Resource</p>
                            <p className="text-gray-300 font-mono text-xs">{vulnerability.resource}</p>
                        </div>
                         <div>
                            <p className="text-gray-500 font-medium">Detected On</p>
                            <p className="text-gray-300">{new Date(vulnerability.detectedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                 <div className="p-4 bg-gray-700/50 rounded-b-xl text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const VulnerabilityCard: React.FC<{ vulnerability: Vulnerability; onViewDetails: (vulnerability: Vulnerability) => void }> = ({ vulnerability, onViewDetails }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                        <SeverityPill severity={vulnerability.severity} />
                        <h3 className="text-md font-semibold text-white">{vulnerability.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                        <span className="font-medium text-gray-300">Resource:</span> {vulnerability.resource}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{new Date(vulnerability.detectedAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2 py-0.5 font-medium rounded ${statusStyles[vulnerability.status]}`}>{vulnerability.status}</span>
                    </div>
                </div>
                <div className="flex-shrink-0 md:mt-1">
                    <button 
                        onClick={() => onViewDetails(vulnerability)}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors w-full md:w-auto"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};


const SecurityCenter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Severity | 'All'>('All');
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  
  const severityFilters: (Severity | 'All')[] = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredVulnerabilities = useMemo(() => {
    if (activeFilter === 'All') {
      return vulnerabilitiesData;
    }
    return vulnerabilitiesData.filter(v => v.severity === activeFilter);
  }, [activeFilter]);

  // Effect to handle Escape key press for closing modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVulnerability(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white">Security Center</h1>
        <p className="text-gray-400 mt-1">Overview of your security posture and vulnerabilities.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <SummaryCard 
            title="Critical Vulnerabilities" 
            value="3" 
            change="+1" 
            changeType="bad" 
            icon={ShieldIcon} 
            iconBgColor="bg-red-500/20"
            iconColor="text-red-400"
          />
          <SummaryCard 
            title="Total Misconfigurations" 
            value="43" 
            change="-5" 
            changeType="good" 
            icon={ExclamationTriangleIcon} 
            iconBgColor="bg-orange-500/20"
            iconColor="text-orange-400"
          />
          <SummaryCard 
            title="Assets Scanned" 
            value="1,204" 
            change="+50" 
            changeType="good" 
            icon={ServerStackIcon}
            iconBgColor="bg-blue-500/20"
            iconColor="text-blue-400"
          />
        </div>

        {/* Chart and Vulnerability List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
            <h2 className="text-white font-semibold">Security Posture</h2>
            <p className="text-sm text-gray-400 mb-4">Vulnerabilities by severity</p>
            <SecurityPostureChart />
          </div>
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-white font-semibold">Active Vulnerabilities</h2>
            <p className="text-sm text-gray-400 mb-4">Prioritized list of security issues</p>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {severityFilters.map(filter => (
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

            {/* Vulnerability List */}
            <div className="space-y-4">
              {filteredVulnerabilities.length > 0 ? (
                  filteredVulnerabilities.map(vuln => <VulnerabilityCard key={vuln.id} vulnerability={vuln} onViewDetails={setSelectedVulnerability} />)
              ) : (
                  <div className="text-center py-10">
                      <p className="text-gray-400">No vulnerabilities found for this severity level.</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedVulnerability && (
        <VulnerabilityModal 
          vulnerability={selectedVulnerability} 
          onClose={() => setSelectedVulnerability(null)} 
        />
      )}
    </>
  );
};

export default SecurityCenter;
