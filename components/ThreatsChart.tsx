
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { threatsData } from '../constants';

const ThreatsChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <LineChart data={threatsData} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="name" tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} />
          <YAxis tick={{ fill: '#9a9a9a' }} tickLine={false} axisLine={{ stroke: '#3a3a3a' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e1e',
              borderColor: '#3a3a3a',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#c9c9c9' }}
          />
          <Line type="monotone" dataKey="threats" stroke="#f97316" strokeWidth={2} dot={{ r: 4, fill: '#f97316' }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatsChart;
