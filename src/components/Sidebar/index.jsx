import React from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import Navigation from './Navigation.jsx';
import LangWidget from './LangWidget.jsx';
import TimeWidget from './TimeWidget.jsx';
import background from '/side_bar.png';

const Container = styled.aside`
    grid-area: Sidebar;
    padding: 2px 14px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-image: url(${background});
`

const Divider = styled.hr`
    height: 2px;
    width: 100%;
    background-color: white;
`

export default function Sidebar() {
    return (
        <Container>
            <Header />
            <Divider />
            <Navigation />
            <TimeWidget />
            <LangWidget />
        </Container>
    )
}