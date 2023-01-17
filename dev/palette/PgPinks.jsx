import React from "react";
import Color from "./Color";

const pinks = [
  {
    name: 'pink',
    hex: '#FFC0CB',
    rgb: 'rgb(255, 192, 203)',
    hsl: 'hsl(350, 100%, 88%)',
    hue: 350,
    saturation: 100,
    lightness: 88,
  },
  {
    name: 'Hot pink',
    hex: '#FF69B4',
    rgb: 'rgb(255, 105, 180)',
    hsl: 'hsl(330, 100%, 71%)',
    hue: 330,
    saturation: 100,
    lightness: 71,
  },
  {
    name: 'Deep pink',
    hex: '#FF1493',
    rgb: 'rgb(255, 20, 147)',
    hsl: 'hsl(328, 100%, 54%)',
    hue: 328,
    saturation: 100,
    lightness: 54,
  }
];

export default function PgPinks() {
  return (
    <React.Fragment>
      {pinks.map((pink, i) => (
        <Color name={`pink_${i}`} key={i} {...pink} />
      ))}
    </React.Fragment>
  );
}
