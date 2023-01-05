import React from "react";
import Color from "./Color";

const pinks = [
  {
    hue: 318,
    saturation: 80,
    lightness: 0,
  },
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
