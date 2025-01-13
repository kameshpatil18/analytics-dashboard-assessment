import React, { useState, useEffect } from "react";
import EVTypesChart from "./charts/EVTypesChart";
import CumulativeRegistrationChart from "./charts/CumulativeRegistrationChart";
import TopManufacturersChart from "./charts/TopManufacturersChart";
import YearDistributionChart from "./charts/YearDistributionChart";
import ExpensiveEVsTable from "./charts/ExpensiveEVsTable";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("EVTypesChart"); // Default chart
  const [data, setData] = useState({
    makes: [],
    types: [],
    years: [],
    bestRangeModels: [],
    vehicles: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const response = await fetch("/Electric_Vehicle_Population_Data.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Parsed Data:", jsonData);

        if (!Array.isArray(jsonData) || jsonData.length === 0) {
          console.error("Data is empty or not an array!");
          return;
        }

        // Filter out vehicles with zero range
        const filteredData = jsonData.filter(
          (vehicle) => vehicle["Electric Range"] > 0
        );

        const bestRangeModels = [];
        const seenRanges = new Set();

        filteredData
          .sort((a, b) => b["Electric Range"] - a["Electric Range"]) // Sort by electric range
          .forEach((vehicle) => {
            if (!seenRanges.has(vehicle["Electric Range"])) {
              bestRangeModels.push(vehicle);
              seenRanges.add(vehicle["Electric Range"]);
            }
          });


        bestRangeModels.length = Math.min(bestRangeModels.length, 10);

   
        const makeDistribution = jsonData.reduce((acc, item) => {
          acc[item.Make] = (acc[item.Make] || 0) + 1;
          return acc;
        }, {});

        const makeData = Object.entries(makeDistribution).map(
          ([make, count]) => ({ make, count })
        );
        makeData.sort((a, b) => b.count - a.count);
        makeData.length = 10;

       
        const evTypeDistribution = jsonData.reduce((acc, item) => {
          const type = item["Electric Vehicle Type"]
            .replace(" Vehicle", "")
            .replace("(", "")
            .replace(")", "");
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        const evTypeData = Object.entries(evTypeDistribution).map(
          ([type, value]) => ({ name: type, value })
        );

    
        const yearDistribution = jsonData.reduce((acc, item) => {
          const year = item["Model Year"];
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});

        const yearData = Object.entries(yearDistribution)
          .map(([year, count]) => ({ year: parseInt(year), count }))
          .filter((item) => item.year >= 2010);

        setData({
          makes: makeData,
          types: evTypeData,
          years: yearData,
          bestRangeModels,
          vehicles: jsonData,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSidebarClick = (chart) => {
    setSelectedChart(chart);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">
        Electric Vehicle Population Dashboard
      </h2>

      {/* Top Right Corner */}
      <div className="dashboard-info">
        <p>Made by: Kamesh Jitendra Patil</p>
        <p>Email: <a href="mailto:kameshpatil18@gmail.com">kameshpatil18@gmail.com</a></p>
      </div>

      <div className="dashboard-layout">

        <div className="sidebar">
          <ul>
            <li onClick={() => handleSidebarClick("EVTypesChart")}>EV Types</li>
            <li
              onClick={() => handleSidebarClick("CumulativeRegistrationChart")}
            >
              Cumulative Registration
            </li>
            <li onClick={() => handleSidebarClick("TopManufacturersChart")}>
              Top Manufacturers
            </li>
            <li onClick={() => handleSidebarClick("YearDistributionChart")}>
              Year Distribution
            </li>
            <li onClick={() => handleSidebarClick("ExpensiveEVsTable")}>
              Expensive EVs
            </li>
          </ul>
        </div>


        <div className="content-area">
          {selectedChart === "EVTypesChart" && (
            <EVTypesChart data={data.types} />
          )}
          {selectedChart === "CumulativeRegistrationChart" && (
            <CumulativeRegistrationChart data={data.years} />
          )}
          {selectedChart === "TopManufacturersChart" && (
            <TopManufacturersChart data={data.makes} />
          )}
          {selectedChart === "YearDistributionChart" && (
            <YearDistributionChart data={data.years} />
          )}
          {selectedChart === "ExpensiveEVsTable" && (
            <ExpensiveEVsTable data={data.vehicles} />
          )}
          
        </div>
      </div>


      <div className="best-range-table-container">
        <h3 className="table-title">
          Top 10 Electric Vehicles by Range
        </h3>
        <table className="best-range-table">
          <thead>
            <tr>
              <th>Model Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Electric Range (miles)</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {data.bestRangeModels.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle["Model Year"]}</td>
                <td>{vehicle["Make"]}</td>
                <td>{vehicle["Model"]}</td>
                <td>{vehicle["Electric Range"]}</td>
                <td>{vehicle["City"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
