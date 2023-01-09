import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WristbandIcon } from '/assets/icons/wristband_image.svg';

const players = [
  {
    name: 'pavlos'
  },
  {
    name: 'grigoris',
  }
];


const Container = styled.ul`
display: flex;
flex-flow: row wrap;
gap: 10px;
`;

const PlayerContainer = styled.li`
flex: 1;
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
border-radius: var(--border-radius-0);
background: white;
padding: 5px 10px;
width: 100%;
gap: 20px;
max-width: 180px;

.text {
align-items: center;
font-size: var(--text-md);
letter-spacing: 0.2px;
word-spacing: 1px;
white-space: nowrap;
font-weight: bold;

}

.icon {
flex: 1;
line-height: 1;
min-width: 70px;
}
`;

function Player({children}) {
  return (
    <PlayerContainer>
      <section className='text'>
        {children}
      </section>
      <section className='icon'>
        <WristbandIcon/>
      </section>
    </PlayerContainer>
  );
}

export function PlayerList() {
  return (
    <Container>
      <Player assigned={true}>
        pavlos
      </Player>
      <Player assigned={false}>
        grigoris
      </Player>
    </Container>
  );
}
