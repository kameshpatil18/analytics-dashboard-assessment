import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CumulativeRegistrationChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Cumulative Vehicle Registration by Year (Area)</h3>
    <div className="chart-container">
      <AreaChart 
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        width={500}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
      </AreaChart>
    </div>
  </div>
);

export default CumulativeRegistrationChart;
