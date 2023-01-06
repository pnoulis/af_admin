import React from "react";
import Color from "./Color";

const blacks = [
  {
    name: 'black',
    hex: '#000000',
    rgb: 'rgb(0, 0, 0)',
    hsl: 'hsl(0, 0%, 0%)',
    hue: 0,
    saturation: 0,
    lightness: 0,
  },
  {
    name: 'charcoal',
    hex: '#36454F',
    rgb: 'rgb(54, 69, 79)',
    hsl: 'hsl(204, 19%, 26%)',
    hue: 204,
    saturation: 19,
    lightness: 26,
  },
  {
    name: 'dark purple',
    hex: '#301934',
    rgb: 'rgb(48, 25, 52)',
    hsl: 'hsl(291, 35%, 15%)',
    hue: 291,
    saturation: 35,
    lightness: 15,
  },
  {
    name: 'jet black',
    hex: '#343434',
    rgb: 'rgb(52, 52, 52,)',
    hsl: 'hsl(0, 0%, 20%)',
    hue: 0,
    saturation: 0,
    lightness: 20,
  },
  {
    name: 'matte black',
    hex: '#28282B',
    rgb: 'rgb(40, 40, 43)',
    hsl: 'hsl(240, 4%, 16%)',
    hue: 240,
    saturation: 4,
    lightness: 16,
  },
  {
    name: 'midnight blue',
    hex: '#191970',
    rgb: 'rgb(25, 25, 112)',
    hsl: 'hsl(240, 64%, 27%)',
    hue: 240,
    saturation: 64,
    lightness: 27,
  },
  {
    name: 'onyx',
    hex: '#353935',
    rgb: 'rgb(53, 57, 53)',
    hsl: 'hsl(120, 4%, 22%)',
    hue: 120,
    saturation: 4,
    lightness: 22,
  },
  {
    name: 'baltic sea',
    hex: '#1D1C22',
    rgb: 'rgb(29, 28, 34)',
    hsl: 'hsl(250, 10%, 12%)',
    hue: 250,
    saturation: 10,
    lightness: 12,
  },

];

export default function PgBlacks() {
  return (
    <React.Fragment>
      {blacks.map((black, i) => (
        <Color name={black.name || `black_${i}`} key={i} {...black} />
      ))}
    </React.Fragment>
  );
}
