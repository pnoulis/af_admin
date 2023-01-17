import React from "react";
import Color from "./Color";

const oranges = [
  {
    name: 'orange',
    hex: '#FFA500',
    rgb: 'rgb(255, 165, 0)',
    hsl: 'hsl(39, 100%, 50%)',
    hue: 39,
    saturation: 100,
    lightness: 50,
  },
  {
    name: 'Dark orange',
    hex: '#FF8C00',
    rgb: 'rgb(255, 140, 0)',
    hsl: 'hsl(33, 100%, 50%)',
    hue: 33,
    saturation: 100,
    lightness: 50,
  },
  {
    name: 'tomato',
    hex: '#FF6347',
    rgb: 'rgb(255, 99, 71)',
    hsl: 'hsl(9, 100%, 64%)',
    hue: 9,
    saturation: 100,
    lightness: 64,
  },
  {
    name: 'coral',
    hex: '#FF7F50',
    rgb: 'rgb(255, 127, 80)',
    hsl: 'hsl(16, 100%, 66%)',
    hue: 16,
    saturation: 100,
    lightness: 66,
  },
  {
    name: 'light salmon',
    hex: '#FFA07A',
    rgb: 'rgb(255, 160, 122)',
    hsl: 'hsl(17, 100%, 74%)',
    hue: 17,
    saturation: 100,
    lightness: 74,
  },
];

export default function PgOranges() {
  return (
    <React.Fragment>
      {oranges.map((orange, i) => (
        <Color name={orange.name || `blue_${i}`} key={i} {...orange} />
      ))}
    </React.Fragment>
  );
}
