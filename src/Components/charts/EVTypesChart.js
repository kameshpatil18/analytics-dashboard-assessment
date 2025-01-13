import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const EVTypesChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  return (
    <div className="chart-card">
      <h3 className="chart-title">EV Types Distribution</h3>
      <div className="chart-container">
        <PieChart width={700} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, value, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
    
  );
};

export default EVTypesChart;
