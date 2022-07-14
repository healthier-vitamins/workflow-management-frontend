function Stock({ stock }) {
  return (
    <div className="stock-list-box">
      <p>Stock ID: {stock.id}</p>
      <p>Stock Item: {stock.item}</p>
      <p>Quantity: {stock.quantity}</p>
    </div>
  );
}
export default Stock;
