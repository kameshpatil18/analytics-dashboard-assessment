import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const YearDistributionChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Vehicle Registration by Year</h3>
    <div className="chart-container">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        width={500}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" name="Number of Vehicles" strokeWidth={2} />
      </LineChart>
    </div>
  </div>
);

export default YearDistributionChart;
