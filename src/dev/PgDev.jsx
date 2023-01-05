import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-width: inherit;
  min-height: inherit;
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "dev-header" "workarea";
  gap: 20px 0;
  background-color: #c6c6c6;

  .dev-header {
    grid-area: dev-header;
    background-color: white;
  }

  .dev-header nav {
    width: min-content;
    height: 100%;
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 20px;
    font-size: 0.8rem;
    text-transform: lowercase;
    letter-spacing: 1px;
    cursor: pointer;

    .link {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .link:hover {
      color: #f5af19;
    }
  }

  .workarea {
    grid-area: workarea;
  }
`;

function App() {
  return <p>App</p>;
}

export default function Dev() {
  return (
    <Container>
      <header className="dev-header">
        <nav>
          <a className="link" href="/dev/palette">
            Palette
          </a>
          <a className="link" href="/dev/components">
            Components
          </a>
          <a className="link" href="/">
            App
          </a>
          <a className="link" href="#">
            Debug
          </a>
        </nav>
      </header>
      <section className="workarea">
        <Outlet />
      </section>
    </Container>
  );
}
