import React from "react";
import Color from "./Color";

const blues = [
  {
    name: 'Blue',
    hex: '#0000FF',
    rgb: 'rgb(0, 0, 255)',
    hue: 240,
    saturation: 100,
    lightness: 50,
  },
  {
    name: 'navy',
    hex: '#000080',
    rgb: 'rgb(0, 0, 128)',
    hsl: 'hsl(240, 100%, 25%)',
    hue: 240,
    saturation: 100,
    lightness: 25,
  },
  {
    name: 'Midnight blue',
    hex: '#191970',
    rgb: 'rgb(25, 25, 112)',
    hsl: 'hsl(240, 64%, 27%)',
    hue: 240,
    saturation: 64,
    lightness: 27,
  },
  {
    name: 'Dark Blue',
    hex: '#00008B',
    rgb: 'rgb(0, 0, 139)',
    hsl: 'hsl(240, 100%, 27%)',
    hue: 240,
    saturation: 100,
    lightness: 27,
  },
];

export default function PgBlues() {
  return (
    <React.Fragment>
      {blues.map((blue, i) => (
        <Color name={blue.name || `blue_${i}`} key={i} {...blue} />
      ))}
    </React.Fragment>
  );
}
