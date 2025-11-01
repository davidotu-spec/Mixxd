import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { costTrendData } from '../constants';

const CostTrendChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={costTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="name" tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} />
          <YAxis tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} tickFormatter={(value) => `$${(value / 1000)}k`} />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#1e1e1e',
              borderColor: '#3a3a3a',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#c9c9c9' }}
          />
          <Legend wrapperStyle={{ fontSize: '14px', color: '#9a9a9a' }}/>
          <Line type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={2} name="Actual Spend" />
          <Line type="monotone" dataKey="forecast" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostTrendChart;
