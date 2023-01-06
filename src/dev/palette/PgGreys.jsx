import React from "react";
import Color from "./Color";

const greys = [
  {
    name: 'gray',
    hex: '#808080',
    rgb: 'rgb(128, 128, 128)',
    hsl: 'hsl(0, 0%, 50%)',
    hue: 0,
    saturation: 0,
    lightness: 50,
  },
  {
    name: 'light grey',
    hex: '#D3D3D3',
    rgb: 'rgb(211, 211, 211)',
    hsl: 'hsl(0, 0%, 83%)',
    hue: 0,
    saturation: 0,
    lightness: 83,
  },
  {
    name: 'silver',
    hex: '#C0C0C0',
    rgb: 'rgb(192, 192, 192)',
    hsl: 'hsl(0, 0%, 75%)',
    hue: 0,
    saturation: 0,
    lightness: 75,
  },
  {
    name: 'Slate grey',
    hex: '#708090',
    rgb: 'rgb(112, 128, 144)',
    hsl: 'hsl(210, 13%, 50%)',
    hue: 210,
    saturation: 13,
    lightness: 50,
  },
  {
    name: 'Light slate grey',
    hex: '#778899',
    rgb: 'rgb(119, 136, 153)',
    hsl: 'hsl(210, 14%, 53%)',
    hue: 210,
    saturation: 14,
    lightness: 53,
  },
  {
    name: 'Charcoal',
    hex: '#36454F',
    rgb: 'rgb(54, 69, 79)',
    hsl: 'hsl(204, 19%, 26%)',
    hue: 204,
    saturation: 19,
    lightness: 26,
  },
  {
    name: 'Glaucous',
    hex: '#6082B6',
    rgb: 'rgb(96, 130, 182)',
    hsl: 'hsl(216, 37%, 55%)',
    hue: 216,
    saturation: 37,
    lightness: 55,
  }
];

export default function PgGreys() {
  return (
    <React.Fragment>
      {greys.map((grey, i) => (
        <Color name={`grey_${i}`} key={i} {...grey} />
      ))}
    </React.Fragment>
  );
}
