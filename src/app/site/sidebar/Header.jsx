import logo from "/assets/logo/maze_logo.svg";
import { NavLink } from "react-router-dom";
import { linkIndex } from "/src/app/links";

function Header() {
  return (
    <NavLink to={linkIndex.path}>
      <img src={logo} alt="site-logo" />
    </NavLink>
  );
}

export { Header };
