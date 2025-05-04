import ItemCard from "./ItemCard";
import type { Fetching } from './types/fetching'




function ShoppingSection({products, loading, error}: Fetching) {

    if(loading) {
        return (
            <div className="shopping-section">
                <h2>Loading...</h2>
            </div>
        )
    }

    if(error) {
        return (
            <div className="shopping-section">
                <h2>Error: {error}</h2>
            </div>
        )
    }

  return (
    <div className="shopping-section">
      <h2 className="text-5xl">Shopping Section</h2>
        <div className="grid grid-cols-4 gap-24 p-32 w-full">
            {products.map((item, i) => {
                return (
                    <ItemCard key={i} item={item}></ItemCard>
                )
            })}
        </div>
    </div>
  );
}
export default ShoppingSection;