import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyleLayoutNavbar = styled.ul`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  column-gap: 2px;
  /* Dimensions */
  /* Position */
  /* Fonts */
  /* Effects */
  list-style: none;
  /* Children */
`;
const StyleLayoutNavbarItem = styled.li`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  flex: 1;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleNavLink = styled(NavLink)`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* Dimensions */
  width: 100%;
  aspect-ratio: 3 / 1;
  padding-left: 15%;
  overflow: hidden;
  /* Position */
  position: relative;
  /* Fonts */
  font-size: var(--text-lg);
  font-weight: bolder;
  text-transform: capitalize;
  letter-spacing: 2px;
  word-spacing: 1px;
  white-space: nowrap;
  color: var(--text-on-dark-basic);
  /* Effects */
  cursor: pointer;
  border-radius: var(--border-radius-0);

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 1;
    background: var(--primary-base);
  }

  &.active {
    background: var(--primary-base);
  }
  /* Children */
`;

function Navbar({ items = [] }) {
  return (
    <StyleLayoutNavbar>
      {items.map((item, i) => (
        <StyleLayoutNavbarItem key={i}>
          <StyleNavLink to={item.path}>{item.label}</StyleNavLink>
        </StyleLayoutNavbarItem>
      ))}
    </StyleLayoutNavbar>
  );
}

export { Navbar };
