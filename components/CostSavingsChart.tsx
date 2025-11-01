
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { costData } from '../constants';

const CostSavingsChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={costData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="name" tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} />
          <YAxis tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} />
          <Tooltip
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            contentStyle={{
              backgroundColor: '#1e1e1e',
              borderColor: '#3a3a3a',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#c9c9c9' }}
          />
          <Bar dataKey="savings" fill="#3b82f6" barSize={30} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostSavingsChart;
