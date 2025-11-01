
import React from 'react';

const ArrowUpIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
);

const ArrowDownIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'good' | 'bad';
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, changeType, icon: Icon, iconBgColor, iconColor }) => {
  const isGood = changeType === 'good';
  const changeColor = isGood ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start justify-between hover:bg-gray-700/50 transition-colors duration-200">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        <div className={`flex items-center mt-2 text-sm ${changeColor}`}>
          {isGood ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
          <span>{change} vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-full ${iconBgColor}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
};

export default SummaryCard;
