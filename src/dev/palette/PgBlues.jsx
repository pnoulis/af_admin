import React from "react";
import Color from "./Color";

const blues = [
  {
    hue: 249,
    saturation: 80,
    lightness: 0,
  },
];

export default function PgBlues() {
  return (
    <React.Fragment>
      {blues.map((blue, i) => (
        <Color name={`blue_${i}`} key={i} {...blue} />
      ))}
    </React.Fragment>
  );
}
