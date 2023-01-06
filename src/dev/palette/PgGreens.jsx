import React from "react";
import Color from "./Color";

const greens = [
  {
    name: 'green',
    hex: '#008000',
    rgb: 'rgb(0, 128, 0)',
    hsl: 'hsl(120, 100%, 25%)',
    hue: 120,
    saturation: 100,
    lightness: 25,
  },
  {
    name: 'grass green',
    hex: '#7CFC00',
    rgb: 'rgb(124, 252, 0)',
    hsl: 'hsl(90, 100%, 49%)',
    hue: 90,
    saturation: 100,
    lightness: 49,
  },
  {
    name: 'emerald green',
    hex: '#50C878',
    rgb: 'rgb(80, 200, 120)',
    hsl: 'hsl(140, 52%, 55%)',
    hue: 140,
    saturation: 52,
    lightness: 55,
  },
  {
    name: 'light green',
    hex: '#90EE90',
    rgb: 'rgb(144, 238, 144)',
    hsl: 'hsl(120, 73%, 75%)',
    hue: 120,
    saturation: 73,
    lightness: 75,
  },
  {
    name: 'lime green',
    hex: '#32CD32',
    rgb: 'rgb(50, 205, 50)',
    hsl: 'hsl(120, 61%, 50%)',
    hue: 120,
    saturation: 61,
    lightness: 50,
  },
  {
    name: 'neon green',
    hex: '#0FFF50',
    rgb: 'rgb(15, 255, 80)',
    hsl: 'hsl(136, 100%, 53%)',
    hue: 136,
    saturation: 100,
    lightness: 53,
  },
  {
    name: 'spring green',
    hex: '#00FF7F',
    rgb: 'rgb(0, 255, 127)',
    hsl: 'hsl(150, 100%, 50%)',
    hue: 150,
    saturation: 100,
    lightness: 50,
  },
  {
    name: 'teal',
    hex: '#008080',
    rgb: 'rgb(0, 128, 128)',
    hsl: 'hsl(180, 100%, 25%)',
    hue: 180,
    saturation: 100,
    lightness: 25,
  },
];


export default function PgGreens() {
  return (
    <React.Fragment>
      {greens.map((green, i) => (
        <Color name={green.name || `green_${i}`} key={i} {...green} />
      ))}
    </React.Fragment>
  );
}
