import React from "react";
import Color from "./Color";

const reds = [
  {
    name: 'red',
    hex: '#FF0000',
    rgb: 'rgb(255, 0, 0)',
    hsl: 'hsl(0, 100%, 50%)',
    hue: 0,
    saturation: 100,
    lightness: 50,
  },
  {
    name: 'crimson',
    hex: '#DC143C',
    rgb: 'rgb(220, 20, 60)',
    hsl: 'hsl(348, 83%, 47%)',
    hue: 348,
    saturation: 83,
    lightness: 47,
  },
  {
    name: 'fire brick',
    hex: 'B22222',
    rgb: 'rgb(178, 34, 34)',
    hsl: 'hsl(0, 68%, 42%)',
    hue: 0,
    saturation: 68,
    lightness: 42,
  },
  {
    name: 'dark red',
    hex: '8B0000',
    rgb: 'rgb(139, 0, 0)',
    hsl: 'hsl(0, 100%, 27%)',
    hue: 0,
    saturation: 100,
    lightness: 27,
  },
  {
    name: 'indian red',
    hex: 'CD5C5C',
    rgb: 'rgb(205, 92, 92)',
    hsl: 'hsl(0, 53%, 58%)',
    hue: 0,
    saturation: 53,
    lightness: 58,
  },
  {
    name: 'airbnb',
    hex: '#FD5C63',
    rgb: 'rgb(253, 92, 99)',
    hsl: 'hsl(357, 98%, 68%)',
    hue: 357,
    saturation: 98,
    lightness: 68,
  },
  {
    name: 'american rose',
    hex: '#FF033E',
    rgb: 'rgb(255, 3, 62)',
    hsl: 'hsl(346, 100%, 51%)',
    hue: 346,
    saturation: 100,
    lightness: 51,
  },
  {
    name: 'neon red',
    hex: '#FF3131',
    rgb: 'rgb(255, 49, 49)',
    hsl: 'hsl(0, 100%, 60%)',
    hue: 0,
    saturation: 100,
    lightness: 60,
  }
];

export default function PgReds() {
  return (
    <React.Fragment>
      {reds.map((red, i) => (
        <Color name={red.name || `blue_${i}`} key={i} {...red} />
      ))}
    </React.Fragment>
  );
}
