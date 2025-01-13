import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TopManufacturersChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Top 10 Manufacturers</h3>
    <div className="chart-container">
      <BarChart 
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        width={500}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="make" angle={-45} textAnchor="end" height={70} interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#0088FE" name="Number of Vehicles" />
      </BarChart>
    </div>
  </div>
);

export default TopManufacturersChart;
