import * as React from 'react';
import Slider from '@mui/material/Slider';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { Chance } from 'chance';

const chance = new Chance(42);

const data = Array.from({ length: 200 }, () => ({
  x: chance.floating({ min: -25, max: 25 }),
  y: chance.floating({ min: -25, max: 25 }),
})).map((d, index) => ({ ...d, id: index }));

const minDistance = 10;

export default function MinMaxExample() {
  const [value, setValue] = React.useState<number[]>([-25, 25]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return (
    <div>
      <ScatterChart
        xAxis={[
          {
            label: 'x',
            min: value[0],
            max: value[1],
          },
        ]}
        series={[{ data }]}
        width={600}
        height={500}
      />
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={-40}
        max={40}
      />
    </div>
  );
}