import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";

const Page = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 150px 1fr;
  grid-template-areas: "sidebar toolbar" "sidebar main";
  gap: 20px;
  padding-right: 20px;
  background-color: #c6c6c6;

  & > .sidebar,
  & > .toolbar {
    background-color: white;
  }

  & > .sidebar {
    grid-area: sidebar;
    border-radius: 6px;
  }

  & > .toolbar {
    grid-area: toolbar;
    border-radius: 6px;
  }

  & > .main {
    grid-area: main;
    border-radius: 6px;
  }

  & > .sidebar .navigation a {
    display: block;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: lowercase;
    font-size: 0.8rem;
    cursor: pointer;
    letter-spacing: 1px;

    &:hover {
      color: #f5af19;
    }
  }
`;

export default function PgPalette() {
  return (
    <Page>
      <aside className="sidebar">
        <nav className="navigation">
          <NavLink to="greys">Greys</NavLink>
          <NavLink to="purples">Purples</NavLink>
          <NavLink to="pinks">Pinks</NavLink>
          <NavLink to="Blues">Blues</NavLink>
        </nav>
      </aside>
      <header className="toolbar">
        <p>This is my header</p>
      </header>
      <div className="main">
        <Outlet />
      </div>
    </Page>
  );
}
