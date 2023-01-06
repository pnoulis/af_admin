import React from "react";
import Color from "./Color";


const whites = [
  {
    name: 'white',
    hex: '#FFFFFF',
    rgb: 'rgb(255, 255, 255)',
    hsl: 'hsl(0, 0%, 100%)',
    hue: 0,
    saturation: 0,
    lightness: 100,
  },
  {
    name: 'snow',
    hex: '#FFFAFA',
    rgb: 'rgb(255, 250, 250)',
    hsl: 'hsl(0, 100%, 99%)',
    hue: 0,
    saturation: 100,
    lightness: 99,
  },
  {
    name: 'white smoke',
    hex: '#F5F5F5',
    rgb: 'rgb(245, 245, 245)',
    hsl: 'hsl(0, 0%, 96%)',
    hue: 0,
    saturation: 0,
    lightness: 96,
  },
  {
    name: 'alice blue',
    hex: '#F0F8FF',
    rgb: 'rgb(240, 248, 255)',
    hsl: 'hsl(208, 100%, 97%)',
    hue: 208,
    saturation: 100,
    lightness: 97,
  },
  {
    name: 'sea shell',
    hex: '#FFF5EE',
    rgb: 'rgb(255, 245, 238)',
    hsl: 'hsl(25, 100%, 97%)',
    hue: 25,
    saturation: 100,
    lightness: 97
  },
  {
    name: 'beige',
    hex: '#F5F5DC',
    rgb: 'rgb(245, 245, 220)',
    hsl: 'hsl(60, 56%, 91%)',
    hue: 60,
    saturation: 56,
    lightness: 91
  },
  {
    name: 'ivory',
    hex: '#FFFFF0',
    rgb: 'rgb(255, 255, 240)',
    hsl: 'hsl(60, 100%, 97%)',
    hue: 60,
    saturation: 100,
    lightness: 97,
  },
  {
    name: 'parchment',
    hex: '#FCF5E5',
    rgb: 'rgb(252, 245, 229)',
    hsl: 'hsl(42, 79%, 94%)',
    hue: 42,
    saturation: 79,
    lightness: 94,
  },
  {
    name: 'seashell',
    hex: '#FFF5EE',
    rgb: 'rgb(255, 245, 238)',
    hsl: 'hsl(25, 100%, 97%)',
    hue: 25,
    saturation: 100,
    lightness: 97,
  },
  {
    name: 'pearl',
    hex: '#E2DFD2',
    rgb: 'rgb(226, 223, 210)',
    hsl: 'hsl(49, 22%, 85%)',
    hue: 49,
    saturation: 22,
    lightness: 85,
  }
];

export default function PgWhites() {
  return (
    <React.Fragment>
      {whites.map((white, i) => (
        <Color name={white.name || `white_${i}`} key={i} {...white} />
      ))}
    </React.Fragment>
  );
}
