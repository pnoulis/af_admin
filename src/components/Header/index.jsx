import styled from 'styled-components';


const Container = styled.header`
    grid-area: Header;
    background-color: blue;
`

export default function Header() {
    return (
        <Container>
            Header
        </Container>
    )
}