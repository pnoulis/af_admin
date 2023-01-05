import React from "react";
import styled from "styled-components";

const ComponentCard = styled.div`
  background-color: white;
  border-radius: 6px;
  max-width: 100%;

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
    justify-content: center;
    align-items: center;
  }
`;

export default function Component({ name, children }) {
  return (
    <ComponentCard className="componentCard">
      <header className="toolbar">
        <h1>{name}</h1>
        <section className="controls">some content</section>
      </header>
      <div className="main">{children}</div>
    </ComponentCard>
  );
}
