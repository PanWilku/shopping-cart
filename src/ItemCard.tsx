import { useState } from "react";
import { Product } from "./types/fetching";
import StarRating from "./StarRating";
import { Dispatch, SetStateAction } from "react";
import type { CartValues } from "./types/fetching";

type ItemCardProps = { item: Product, setCartItems: Dispatch<SetStateAction<CartValues[]>> };

export default function ItemCard({ item, setCartItems: setCartQuantity }: ItemCardProps) {


  const [quantity, setQuantity] = useState("1");
  const [open, SetOpen] = useState(false)

  function handleIncrease() {
    setQuantity((prev) => (parseInt(prev) + 1).toString());
    if (parseInt(quantity) >= 999) {
      setQuantity("999");
    }
  }

  function handleDecrease() {
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

  function handleAddToCart() {
    const qty = parseInt(quantity, 10);
    const itemToAdd = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: qty,
      image: item.image
    };
    // Check if the item already exists in the cart
    // If it does, update the quantity
    // If it doesn't, add the item to the cart
    setCartQuantity(prev => {
      const exists = prev.find(i => i.id === itemToAdd.id);
  
      if (exists) {

        return prev.map(i =>
          i.id === itemToAdd.id
            ? { 
                ...i,                         
                quantity: i.quantity + qty     
              }
            : i                             
        );
      } else {

        return [...prev, itemToAdd];
      }
    });
  }

  return (
    <div
      className="card group relative overflow-hidden"
    >
      <img
        onClick={() => SetOpen(o => !o)}
        src={item.image}
        alt={item.title}
        className="w-full h-3/4 object-contain"
      />
      <div onClick={() => SetOpen(o => !o)} className="gap-2 flex flex-col items-center justify-center h-1/4 w-full">
        <h2 className="line-clamp-2">{item.title}</h2>
        <StarRating rating={item.rating.rate} />
        <p>{item.price}$</p>
      </div>


        <div className={`card-overlay flex flex-col gap-2 ${open ? "h-1/4" : ""}`}>
          <div className="flex w-full items-center gap-4 justify-between">
            <button className="ml-4 text-4xl border-2 w-8 h-8 rounded-md justify-center items-center flex cursor-pointer" onClick={handleDecrease}>-</button>
            <input className="flex w-24 justify- text-center focus:outline-none border-2 rounded-md"
             type="number" onChange={(e) => handleInput(e)} value={quantity}></input>
            <button className="mr-4 text-4xl border-2 w-8 h-8 rounded-md justify-center items-center flex cursor-pointer" onClick={handleIncrease}>+</button>
          </div>
          <button onClick={() => handleAddToCart()} className="text-lg border-2 p-2 rounded-md bg-lime-500 cursor-pointer">Add to Cart</button>
        </div>
    </div>
  );
}
