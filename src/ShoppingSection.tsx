import ItemCard from "./ItemCard";
import type { Fetching } from './types/fetching'
import arrowright from "../public/arrow-right.svg"
import arrowleft from "../public/arrow-left.svg"
import { useMemo, useState, useEffect, useRef } from "react";
import PriceSlider from "./PriceSlider";

function ShoppingSection({ products, loading, error }: Fetching) {
  const categoryPanelRef = useRef<HTMLUListElement>(null);
  const ratingPanelRef = useRef<HTMLDivElement>(null);

  const [showFilter, setShowFilter] = useState(false);
  const [hidden, setHidden] = useState(true);

  const [category, setCategory] = useState<string[]>([]);

  const prices = products.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const [filterPrice, setFilterPrice] = useState<number[]>([min, max]);
  const [applyPrice, setApplyPrice] = useState<number[]>([min, max]);

  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [applyCategory, setApplyCategory] = useState<string[]>([]);

  const [filterRating, setFilterRating] = useState<number[]>([0, 5]);
  const [applyRating, setApplyRating] = useState<number[]>([1,2,3,4,5]);

  // update price bounds once data arrives
  useEffect(() => {
    setFilterPrice([min, max]);
    setApplyPrice([min, max]);
  }, [min, max]);

  // collect unique categories
  useEffect(() => {
    const uniqueCats = Array.from(new Set(products.map(p => p.category)));
    setCategory(uniqueCats);
  }, [products]);

  function handleApplyFilterCategory() {
    if (!categoryPanelRef.current) return;
    const checkboxes = categoryPanelRef.current.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    const checkedCategories: string[] = [];
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCategories.push(cb.value);
    });
    setFilterCategory(checkedCategories);
  }

  function handleApplyFilterRating() {
    if (!ratingPanelRef.current) return;
    const checkboxes = ratingPanelRef.current.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    const checkedNumbers: number[] = [];
    checkboxes.forEach(cb => {
      if (cb.checked) checkedNumbers.push(parseInt(cb.value, 10));
    });
    setFilterRating(checkedNumbers);
  }

  function handleFilterClick() {
    setShowFilter(!showFilter);
    if (!hidden) {
      setTimeout(() => setHidden(true), 500);
    } else {
      setHidden(false);
    }
  }

  function handleApplyFilter() {
    setApplyPrice(filterPrice);
    setApplyCategory(filterCategory);
    setApplyRating(filterRating);
  }

const filteredProducts = useMemo(() => {
    const [low, high] = applyPrice;
    const cats = applyCategory;
    const ratings = applyRating;
    return products.filter(item => {
        const okPrice = item.price >= low && item.price <= high;
        const okCat = cats.length === 0 || cats.includes(item.category);
        const okRating = ratings.length === 0 || ratings.some(rating => Math.round(item.rating.rate) >= rating);
        return okPrice && okCat && okRating;
    });
}, [products, applyPrice, applyCategory, applyRating]);

  if (loading) return <div className="shopping-section"><h2>Loading...</h2></div>;
  if (error)   return <div className="shopping-section"><h2>Error: {error}</h2></div>;

  return (
    <div className="shopping-section">
      <h2 className="text-5xl">Shopping Section</h2>

      <div className="flex flex-row w-full h-full">
        {hidden && (
          <div className="w-12 h-full relative flex">
            <div
              className="group flex w-6 max-h-[550px] bg-white border-r-4 border-t-4 border-b-4 border-amber-300 rounded-r-md items-center hover:w-12 transition-[width] duration-500 ease-in-out cursor-pointer"
              onClick={handleFilterClick}
            >
              <img
                className="absolute left-1 group-hover:left-7 transition-[left] group-hover:scale-120 duration-500 ease-in-out w-12 h-12"
                src={arrowright}
              />
            </div>
          </div>
        )}

        <div
          className={`
            flex w-0 relative h-fit
            transition-[width] duration-500 ease-in-out
            ${showFilter ? 'w-[250px]' : 'w-0'}
          `}
        >
          <div
            className={`
              flex flex-col w-full h-full bg-white
              ${showFilter ? 'border-r-4 border-t-4 border-b-4 border-amber-300 rounded-md overflow-visible' : 'overflow-hidden'}
              gap-4
            `}
          >
            <h1 className="text-4xl text-center">Filters</h1>

            <h2 className="text-3xl font-bold">Categories</h2>
            <ul
              ref={categoryPanelRef}
              className="flex flex-col divide-y divide-gray-300 gap-4 justify-center"
            >
              {category.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-row items-center justify-start gap-2"
                >
                  <input
                    type="checkbox"
                    id={`cat-${i}`}
                    className="w-4 h-4 cursor-pointer"
                    value={item}
                    onClick={handleApplyFilterCategory}
                  />
                  <label
                    htmlFor={`cat-${i}`}
                    className="text-2xl cursor-pointer"
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-bold">Price</h2>
            <PriceSlider setfilter={setFilterPrice} min={min} max={max} />

            <h2 className="text-3xl font-bold">Rating</h2>
            <div ref={ratingPanelRef} className="flex flex-row gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map(n => (
                <label key={n} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={n}
                    className="w-6 h-6 cursor-pointer"
                    id={`rating-${n}`}
                    onClick={handleApplyFilterRating}
                  />
                  <span className="text-xl">{n}*</span>
                </label>
              ))}
            </div>

            <button
              className="text-3xl font-bold p-6 m-12 cursor-pointer
                border-2 rounded-md border-amber-300 hover:bg-amber-300
                transition-[background-color] duration-500 ease-in-out"
              onClick={handleApplyFilter}
            >
              Search
            </button>
          </div>

          <img
            className="absolute left-[88%] bottom-1/2 w-12 h-12 cursor-pointer hover:scale-120"
            src={arrowleft}
            onClick={handleFilterClick}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-24 p-32 w-full">
          {filteredProducts.map((item, i) => (
            <ItemCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingSection;
