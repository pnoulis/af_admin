import styled from 'styled-components';


const Container = styled.header`
    grid-area: Header;
  background-color: rgba(160, 169, 200, 0.3);
`

export default function Header() {
    return (
        <Container>
            Header
        </Container>
    )
}