function ItemCard(item: any) {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
}
export default ItemCard;