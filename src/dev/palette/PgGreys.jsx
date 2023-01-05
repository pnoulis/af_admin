import React from "react";
import Color from "./Color";

const greys = [
  {
    hue: 223,
    saturation: 15,
    lightness: 0,
  },
  {
    hue: 211,
    saturation: 12,
    lightness: 0,
  },
  {
    hue: 240,
    saturation: 3,
    lightness: 0,
  },
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
