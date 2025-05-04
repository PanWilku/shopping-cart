import { useState } from "react";
import { Product } from "./types/fetching";
import StarRating from "./StarRating";

type ItemCardProps = { item: Product };

export default function ItemCard({ item }: ItemCardProps) {

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


        <div className="card-overlay">
          View details →
        </div>
    </div>
  );
}
