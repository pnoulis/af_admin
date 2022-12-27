import styled from 'styled-components';
import logo from '/src/assets/maze_logo.svg';

const Container = styled.header`
    flex: 0 1 200px;
    align-self: stretch;
`;
export default function Header() {
    return (
        <Container>
            <img src={logo} alt='site-logo' />
        </Container>
    );
}
