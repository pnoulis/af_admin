import styled from 'styled-components';
import { SidebarLink } from '/src/components/links';

const Container = styled.nav`
flex: 1;
align-self: stretch;
padding: 15px 0 20px 0;

`;

export default function Navigation() {
  return (
    <Container>
      <SidebarLink to='register'>registration</SidebarLink>
      <SidebarLink to='manager'>manager</SidebarLink>
      <SidebarLink to='scoreboard'>scoreboard</SidebarLink>
      <SidebarLink to='cashier'>cashier</SidebarLink>
    </Container>
  );
}
