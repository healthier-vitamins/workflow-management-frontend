import { useEffect, useState } from "react";
import Stock from "../components/StockList/Stock";

function StockList() {
  const [stockList, setStockList] = useState(null);

  useEffect(() => {
    fetch("https://workflow-management-backend.herokuapp.com/show-stock-list")
      .then((response) => response.json())
      .then((data) => {
        setStockList(data);
        console.log(data);
      });
  }, []);

  function ShowStocks() {
    return stockList.map((ele, index) => <Stock stock={ele} key={index} />);
  }

  return (
    <div className="stock-list-page">
      <h2>Stock List</h2>
      <div className="stock-list-container">
        {stockList === null ? <p>Loading</p> : <ShowStocks />}
      </div>
    </div>
  );
}
export default StockList;
