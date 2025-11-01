import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ComplianceCheck } from '../types';

interface ComplianceStatusChartProps {
    checks: ComplianceCheck[];
}

const statusColors: Record<string, string> = {
    Passed: '#10b981',
    Failed: '#ef4444',
    'In Progress': '#eab308',
};

const ComplianceStatusChart: React.FC<ComplianceStatusChartProps> = ({ checks }) => {
  const chartData = useMemo(() => {
    const counts = { Passed: 0, Failed: 0, 'In Progress': 0 };
    checks.forEach(check => {
        counts[check.status]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [checks]);

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false}/>
          <XAxis type="number" tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} allowDecimals={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={false} width={80} />
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            contentStyle={{
              backgroundColor: '#1e1e1e',
              borderColor: '#3a3a3a',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#c9c9c9' }}
          />
          <Bar dataKey="value" barSize={20}>
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={statusColors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplianceStatusChart;
