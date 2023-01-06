import React from "react";
import Color from "./Color";

const purples = [
  {
    name: 'purple',
    hex: '#800080',
    rgb: 'rgb(128, 0, 128)',
    hsl: 'hsl(300, 100%, 25%)',
    hue: 300,
    saturation: 100,
    lightness: 25,
  },
  {
    name: 'blue violet',
    hex: '#8A2BE2',
    rgb: 'rgb(138, 43, 226)',
    hsl: 'hsl(271, 76%, 53%)',
    hue: 271,
    saturation: 76,
    lightness: 53,
  },
  {
    name: 'Dark violet',
    hex: '#9400D3',
    rgb: 'rgb(148, 0, 211)',
    hsl: 'hsl(282, 100%, 41%)',
    hue: 282,
    saturation: 100,
    lightness: 41,
  },
  {
    name: 'Dark orchid',
    hex: '#9932CC',
    rgb: 'rgb(153, 50, 204)',
    hsl: 'hsl(280, 61%, 50%)',
    hue: 280,
    saturation: 61,
    lightness: 50,
  },
  {
    name: 'Fuchsia',
    hex: 'FF00FF',
    rgb: 'rgb(255, 0, 255)',
    hsl: 'hsl(300, 100%, 50%)',
    hue: 300,
    saturation: 100,
    lightness: 50,
  },
  {
    name: 'indigo',
    hex: '4B0082',
    rgb: 'rgb(75, 0, 130)',
    hsl: 'hsl(275, 100%, 25%)',
    hue: 275,
    saturation: 100,
    lightness: 25,
  },
  {
    name: 'violet',
    hex: '#EE82EE',
    rgb: 'rgb(238, 130, 238)',
    hsl: 'hsl(300, 76%, 72%)',
    hue: 300,
    saturation: 76,
    lightness: 72,
  }
];

export default function PgPurples() {
  return (
    <React.Fragment>
      {purples.map((purple, i) => (
        <Color name={`${purple.name || "purple"}_${i}`} key={i} {...purple} />
      ))}
    </React.Fragment>
  );
}
