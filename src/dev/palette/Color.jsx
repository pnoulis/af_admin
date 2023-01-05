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
`;

function mkDeviations(offset, step) {
  const deviations = [offset];
  do {
    deviations.push(offset + step);
    offset += step;
  } while (offset <= 100);
  return deviations;
}

export default function Color({ name, hue, saturation, lightness }) {
  const [distribution, setColor] = useState(3);

  return (
    <ColorCard>
      <header className="toolbar">
        <h1>{name}</h1>
        <section className="controls">some content</section>
      </header>
      <div className="main">
        {mkDeviations(lightness, distribution).map((deviation, i) => (
          <Variant
            key={i}
            bg={`hsl(${hue}, ${saturation}%, ${lightness + deviation}%)`}
          />
        ))}
      </div>
    </ColorCard>
  );
}
