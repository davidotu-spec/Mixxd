import React from 'react';
import { CheckStatus } from '../types';

interface StatusPillProps {
  status: CheckStatus;
}

const statusStyles: Record<CheckStatus, string> = {
  Passed: 'bg-green-500/20 text-green-400',
  Failed: 'bg-red-500/20 text-red-400',
  'In Progress': 'bg-yellow-500/20 text-yellow-400',
};

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusPill;
