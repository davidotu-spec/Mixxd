import React from 'react';
import { Severity } from '../types';

interface SeverityPillProps {
  severity: Severity;
}

const severityStyles: Record<Severity, string> = {
  Critical: 'bg-red-500/20 text-red-400',
  High: 'bg-orange-500/20 text-orange-400',
  Medium: 'bg-yellow-500/20 text-yellow-400',
  Low: 'bg-blue-500/20 text-blue-400',
};

const SeverityPill: React.FC<SeverityPillProps> = ({ severity }) => {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${severityStyles[severity]}`}>
      {severity}
    </span>
  );
};

export default SeverityPill;
