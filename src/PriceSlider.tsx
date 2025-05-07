// src/components/PriceSlider.tsx
import React, { useState, useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

type PriceSliderProps = {
  setfilter: React.Dispatch<React.SetStateAction<number[]>>;
  min: number;
  max: number;
};

export default function PriceSlider({
  setfilter,
  min,
  max,
}: PriceSliderProps) {
  // values[0] = low thumb, values[1] = high thumb
  const [values, setValues] = useState<[number, number]>([min, max]);

  // keep internal state in sync if min/max props ever change
  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  return (
    <div className="flex flex-col gap-2">
      {/* display current low/high */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>

      {/* the two-thumb slider */}
      <RangeSlider
        className="w-full"
        min={min}
        max={max}
        step={0.01}
        value={values}
        onInput={(newVals: number[]) => {
          const tuple = newVals as [number, number];
          setValues(tuple);
          setfilter(tuple);
        }}
      />
    </div>
  );
}
