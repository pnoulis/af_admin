import React from 'react';
import styled from 'styled-components';


const Container = styled.aside`
    grid-area: Sidebar;
    background-color: red;
`

export default function Sidebar() {
    return (
        <Container>
            Sidebar
        </Container>
    )
}