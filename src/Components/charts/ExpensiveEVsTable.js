const ExpensiveEVsTable = ({ data }) => {
    // Ensure data is an array and filter for vehicles with non-zero MSRP
    const expensiveEVs = Array.isArray(data)
      ? data
          .filter(vehicle => vehicle['Base MSRP'] > 0)
          .sort((a, b) => b['Base MSRP'] - a['Base MSRP'])
          .slice(0, 10) // Top 10 most expensive EVs
      : [];
  
    return (
      <div className="expensive-evs-table-container">
        <h3 className="table-title">Top 10 Most Expensive Electric Vehicles</h3>
        <table className="expensive-evs-table">
          <thead>
            <tr>
              <th>Model Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Base MSRP ($)</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {expensiveEVs.length > 0 ? (
              expensiveEVs.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle['Model Year']}</td>
                  <td>{vehicle['Make']}</td>
                  <td>{vehicle['Model']}</td>
                  <td>{vehicle['Base MSRP']}</td>
                  <td>{vehicle['City']}</td>
                  <td>{vehicle['State']}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ExpensiveEVsTable;
  