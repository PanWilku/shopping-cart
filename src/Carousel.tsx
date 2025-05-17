import { useState } from "react";

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  function prev() {
    setCurrent((prevIndex) => (prevIndex === 0 ? total - 1 : prevIndex - 1));
  }

  function next() {
    setCurrent((prevIndex) => (prevIndex === total - 1 ? 0 : prevIndex + 1));
  }

  return (
    <div className={`flex relative w-full xl:h-2/5 h:1/4 overflow-hidden`}>      
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="xl:object-cover object-contain w-full aspect-[16/9]"
      />

      {/* Prev button */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-opacity
              ${idx === current ? 'opacity-100 bg-white' : 'opacity-50 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}