import React, { useState } from "react";
import styled from "styled-components";

const ColorCard = styled.div`
  background-color: white;
  border-radius: 6px;
  max-width: 100%;
  min-height: 150px;

  & > .toolbar {
    height: 50px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: #f5af19;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 20px;

    & > h1 {
      flex: 1 1 50%;
    }

    & > .controls {
      flex: 1 1 50%;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .main {
    padding: 20px;
    display: flex;
    flex-flow: row wrap;
row-gap: 25px;
  }
`;

const Variant = styled.span.attrs((props) => ({
  style: {
    background: props.bg,
  },
}))`
  display: block;
  width: 50px;
  height: 50px;
position: relative;
cursor: pointer;

&:hover:after {
box-sizing: content-box;
position: absolute;
background: white;
border: 2px solid black;
top: -50px;
left: 50%;
white-space: nowrap;
padding: 5px 10px;
content: '${props => props.bg}';
transform: translateX(-50%);
}

&:before {
content: '${props => props.target && '\u25B2'}';
font-size: 3em;
position: absolute;
bottom: -150%;
left: 50%;
transform: translate(-50%, -50%);
}
`;

function mkDeviations(offset, step) {
  const deviations = [0, offset];
  offset = 0;
  do {
    deviations.push(offset + step);
    offset += step;
  } while (offset <= 100);
  return deviations.filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a > b);
}

export default function Color({ hsl, name, hue, saturation, lightness }) {
  const [distribution, setDistribution] = useState(3);

  return (
    <ColorCard>
      <header className="toolbar">
        <h1>{name}:{hsl}</h1>
        <section className="controls">
          <div>
            <input onChange={(e) => {
              setDistribution(Math.floor(e.target.value));
            }}
                   type='range' name='distribution' min='1' max='100'/>
            <label htmlFor='distribution'>Variabilty: {distribution}</label>
          </div>
        </section>
      </header>
      <div className="main">
        {mkDeviations(lightness, distribution).map((deviation, i) => (
          <Variant
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `hsl(${hue}, ${saturation}%, ${deviation}%)`
                );
              } catch (err) {
                alert('Failed to copy');
              }
            }}
            key={i}
            target={deviation === lightness ? name : ''}
            bg={`hsl(${hue}, ${saturation}%, ${deviation}%)`}
          />
        ))}
      </div>
    </ColorCard>
  );
}
