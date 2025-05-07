import ItemCard from "./ItemCard";
import type { Fetching } from './types/fetching'
import arrowright from "../public/arrow-right.svg"
import arrowleft from "../public/arrow-left.svg"
import { useMemo, useState, useEffect } from "react";
import PriceSlider from "./PriceSlider";



function ShoppingSection({products, loading, error}: Fetching) {

    const [showFilter, setShowFilter] = useState(false);
    const [hidden, setHidden] = useState(true);

    const [category, setCategory] = useState<string[]>([]);

    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const [filterPrice, setFilterPrice] = useState<number[]>([min, max]);
    const [filterCategory, setFilterCategory] = useState<string[]>([]);
    const [filterRating, setFilterRating] = useState<number[]>([0, 5]);
    const [applyFilter, setApplyFilter] = useState<number[]>([min, max]);

    // wait for data to arrive and update min max as its infinite initially
    useEffect(() => {
      setFilterPrice([min, max]);
      setApplyFilter([min, max]);
    }, [min, max]);



    //category filter and price filter
    products.map((item) => {
        if(category.includes(item.category)) {
            return;
        } else {
            setCategory([...category, item.category]);
        }});


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


    function handleApplyFilter() {

        setApplyFilter(filterPrice);
    }

    //filters products based on the price
    const filteredProducts = useMemo(() => {
      const [low, high] = applyFilter;
      console.log(low, high);
      return products.filter(item => item.price >= low && item.price <= high);
    }, [products, applyFilter]);


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

        <div className="flex flex-row w-full">
            {hidden && (
            <div className="w-12 h-full relative flex">
                <div className="group flex w-6 h-2/5 bg-white border-r-4 border-t-4 border-b-4
                border-amber-300 rounded-r-md items-center hover:w-12 transition-[width] duration-500 ease-in-out
                cursor-pointer" onClick={() => handleFilterClick()}>
                    <img className="absolute left-1 group-hover:left-7 transition-[left] group-hover:scale-120 duration-500 ease-in-out w-12 h-12" src={arrowright}></img>
                </div>
            </div>
            )}

                        
        <div className={`flex w-0 relative h-2/5
        transition-[width] duration-500 ease-in-out ${showFilter ? 'w-1/5' : 'w-0'}`}>
            <div className={`flex flex-col w-full h-full bg-white  ${showFilter ? 'border-r-4 border-t-4 border-b-4 border-amber-300 rounded-md overflow-visible' : 'overflow-hidden'}
            gap-4`}>
                <h1 className="text-4xl text-center">Filters</h1>
                <h2 className="text-3xl font-bold">Categories</h2>
                <ul className="flex flex-col divide-y divide-gray-300 gap-4 justify-center">
                    {category.map((item, i) => {
                    return (
                        <div className="flex flex-row items-center justify-start gap-2" key={i}>
                        <input
                            type="checkbox"
                            id={`cat-${i}`} 
                            className="w-4 h-4 cursor-pointer"
                        />
                        <label
                            htmlFor={`cat-${i}`}
                            className="text-2xl cursor-pointer"
                        >
                            {item}
                        </label>
                        </div>
                    );
                    })}
                </ul>
                <h2 className="text-3xl font-bold">Price</h2>
                <PriceSlider setfilter={setFilterPrice} min={min} max={max}/>
                <h2 className="text-3xl font-bold">Rating</h2>
                <button className="text-3xl font-bold" onClick={handleApplyFilter}>Search</button>
            </div>
            <img className="absolute left-[88%] bottom-1/2 w-12 h-12 cursor-pointer hover:scale-120" src={arrowleft}
            onClick={() => handleFilterClick()}></img>

        </div>


        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-24 p-32 w-full">
            {filteredProducts.map((item, i) => {
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