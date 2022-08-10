import { useEffect, useState, useMemo } from "react";
// import Stock from "../components/StockList/Stock";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

function StockList() {
  // const [stockList, setStockList] = useState(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", filter: true },
    { field: "item", filter: true },
    { field: "quantity", filter: true },
  ]);

  useEffect(() => {
    fetch("https://workflow-management-backend.herokuapp.com/stock-list")
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
        // console.log(data);
      });
  }, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // function ShowStocks() {
  //   return stockList.map((ele, index) => <Stock stock={ele} key={index} />);
  // }

  return (
    // <div className="stock-list-page">
    //   <h2>Stock List</h2>
    //   <div className="stock-list-container">
    //     {stockList === null ? <p>Loading</p> : <ShowStocks />}
    //   </div>
    // </div>
    <div className="ag-grid-container">
      <div
        className="ag-theme-alpine"
        style={{ width: "55em", height: "30em" }}
      >
        <AgGridReact
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          rowSelection="multiple" // Options - allows click selection of rows
        />
      </div>
    </div>
  );
}
export default StockList;
