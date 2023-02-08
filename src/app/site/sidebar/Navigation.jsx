import styled from "styled-components";
import { SidebarLink } from "/src/components/links";
import { linkRegistrationTeam } from "/src/app/links";

const StyleNavigation = styled.nav`
  flex: 1;
  align-self: stretch;
  padding: 15px 0 20px 0;
`;

export default function Navigation() {
  return (
    <StyleNavigation>
      <SidebarLink to={linkRegistrationTeam.path}>registration</SidebarLink>
      <SidebarLink to="/manager">manager</SidebarLink>
      <SidebarLink to="/scoreboard">scoreboard</SidebarLink>
      <SidebarLink to="/cashier">cashier</SidebarLink>
    </StyleNavigation>
  );
}
