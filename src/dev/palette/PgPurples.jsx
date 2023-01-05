import React from "react";
import Color from "./Color";

const purples = [
  {
    hue: 273,
    saturation: 80,
    lightness: 0,
  },
  {
    name: "purpureus",
    hue: 287.5,
    saturation: 38.1,
    lightness: 0,
  },
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
