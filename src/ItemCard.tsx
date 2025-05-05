import { useState } from "react";
import { Product } from "./types/fetching";
import StarRating from "./StarRating";

type ItemCardProps = { item: Product };

export default function ItemCard({ item }: ItemCardProps) {


  const [quantity, setQuantity] = useState("1");

  function handleIncrease() {
    setQuantity((prev) => (parseInt(prev) + 1).toString());
    if (parseInt(quantity) >= 999) {
      setQuantity("999");
    }
  }

  function handleDecrease(e: any) {
    setQuantity((prev) => (parseInt(prev) - 1).toString());
    if (parseInt(quantity) <= 1) {
      setQuantity("1");
    }
  }

  function handleInput(e: any) {
    const value = e.target.value;
    if (value < 1) {
      setQuantity("");
    } else {
      setQuantity(value);
    }
  }

  return (
    <div
      className="card group relative overflow-hidden"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-3/4 object-contain"
      />
      <div className="gap-2 flex flex-col items-center justify-center h-1/4 w-full">
        <h2 className="line-clamp-2">{item.title}</h2>
        <StarRating rating={item.rating.rate} />
        <p>{item.price}$</p>
      </div>


        <div className="card-overlay flex flex-col gap-2">
          <div className="flex w-full items-center gap-4 justify-between">
            <button className="ml-4 text-4xl border-2 w-8 h-8 rounded-md justify-center items-center flex" onClick={(e) => handleDecrease(e)}>-</button>
            <input className="flex w-24 justify- text-center focus:outline-none border-2 rounded-md"
             type="number" onChange={(e) => handleInput(e)} value={quantity}></input>
            <button className="mr-4 text-4xl border-2 w-8 h-8 rounded-md justify-center items-center flex" onClick={handleIncrease}>+</button>
          </div>
          <button className="text-lg border-2 p-2 rounded-md bg-lime-500">Add to Cart</button>
        </div>
    </div>
  );
}
