function Stock({ stock }) {
  return (
    <div className="stock-list-box">
      <p>{stock.id}</p>
      <p>{stock.item}</p>
      <p>{stock.quantity}</p>
    </div>
  );
}
export default Stock;
