import ItemCard from "./ItemCard";
import type { Fetching } from './types/fetching'
import arrowright from "../public/arrow-right.svg"
import arrowleft from "../public/arrow-left.svg"
import { useState } from "react";




function ShoppingSection({products, loading, error}: Fetching) {

    const [showFilter, setShowFilter] = useState(false);
    const [hidden, setHidden] = useState(true);
    function handleFilterClick() {
        setShowFilter(!showFilter);

        if(hidden === false) {
        setTimeout(() => {
            setHidden(!hidden);
        }
        , 500);
    } else {
        setHidden(!hidden);
    }
    }


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

        <div className="flex flex-row">
            {hidden && (
            <div className="w-12 h-full relative items-center flex">
                <div className="group flex w-6 h-4/5 bg-white border-r-4 border-t-4 border-b-4
                border-amber-300 rounded-r-md items-center hover:w-12 transition-[width] duration-500 ease-in-out
                cursor-pointer" onClick={() => handleFilterClick()}>
                    <img className="absolute left-1 group-hover:left-7 transition-[left] group-hover:scale-120 duration-500 ease-in-out w-12 h-12" src={arrowright}></img>
                </div>
            </div>
            )}

                        
        <div className={`flex w-0 relative h-full
        transition-[width] duration-500 ease-in-out ${showFilter ? 'w-1/5' : 'w-0'}`}>
            <div className={`flex w-full h-full bg-white  ${showFilter ? 'border-r-4 border-t-4 border-b-4 border-amber-300 rounded-md overflow-visible' : 'overflow-hidden'}`}>
                <h2 className="text-3xl">Category</h2>
                <ul className="list-disc">
                    <li>Category 1</li>
                    <li>Category 2</li>
                    <li>Category 3</li>
                    <li>Category 4</li>
                </ul>
            </div>
            <img className="absolute left-[88%] bottom-1/2 w-12 h-12 cursor-pointer hover:scale-120" src={arrowleft}
            onClick={() => handleFilterClick()}></img>

        </div>


        <div className="grid grid-cols-4 gap-24 p-32 w-full">
            {products.map((item, i) => {
                return (
                    <ItemCard key={i} item={item}></ItemCard>
                )
            })}
        </div>

        </div>
    </div>
  );
}
export default ShoppingSection;