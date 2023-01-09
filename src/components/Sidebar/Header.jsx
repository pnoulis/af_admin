import styled from 'styled-components';
import logo from '/assets/logo/maze_logo.svg';
import {NavLink} from 'react-router-dom';

const Container = styled.header`
    flex: 0 1 200px;
    align-self: stretch;
`;
export default function Header() {
    return (
        <Container>
          <NavLink to={'/'}>
            <img src={logo} alt='site-logo' />
          </NavLink>
        </Container>
    );
}
