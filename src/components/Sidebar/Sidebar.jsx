import React from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import Navigation from './Navigation.jsx';
import LangWidget from './LangWidget.jsx';
import TimeWidget from './TimeWidget.jsx';
import background from '/assets/backgrounds/sidebar.png';

const Container = styled.aside`
all: unset;
box-sizing: border-box;
display: flex;

// Dimensions
min-width: 100%;
min-height: 100%;

// Contents
flex-flow: column nowrap;
align-items: center;

// Appearance
padding: 2px 14px;
background-image: url(${background});

`;

const Divider = styled.hr`
    height: 2px;
    width: 100%;
    background-color: white;
`;

export default function Sidebar() {
  return (
    <Container className='site--sidebar'>
      <Header />
      <Divider />
      <Navigation />
      <TimeWidget />
      <LangWidget />
    </Container>
  );
}
