import styled from 'styled-components';

const Nav = styled.nav`
height: 100%;
display: flex;
flex-flow: row wrap;
justify-content: flex-start;
align-items: center;
gap: 10px;
`;
export function PanelHeader({children}) {
  return (
    <header>
      <Nav>
        {children}
      </Nav>
    </header>
  );
}
