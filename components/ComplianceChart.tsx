
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { complianceData } from '../constants';

const ComplianceChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={complianceData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {complianceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e1e',
              borderColor: '#3a3a3a',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#c9c9c9' }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontSize: '14px',
              color: '#9a9a9a',
            }}
          />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="24" fontWeight="bold">
            85%
          </text>
           <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" fill="#9a9a9a" fontSize="12">
            Compliant
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplianceChart;
