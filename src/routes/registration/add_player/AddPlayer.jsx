import React from 'react';
import styled from 'styled-components';
import { LoginPlayer, RegisterPlayer } from '/src/components/player';
import { ButtonText } from '/src/components/buttons';
import { ReactComponent as WristbandIcon } from '/assets/icons/wristband_image.svg';
import { PlayerList } from '/src/components/team';


const AddPlayerButton = styled(ButtonText)`
width: 200px;
height: 50px;
align-self: flex-start;
`;

const Container = styled.div`
all: unset;
box-sizing: border-box;
display: grid;

// Dimensions
min-width: 100%;
min-height: 100%;

// Contents
grid-template-rows: 1fr;
grid-template-columns: 1fr 1fr;
grid-template-areas: "Login Wristband";
justify-content: center;
align-items: flex-start;
padding-top: 50px;

.player-login {
grid-area: Login;
display: flex;
flex-flow: column nowrap;
gap: 50px;
justify-content: flex-start;
align-items: center;
}

.login-container {
width: 400px;

.heading {
font-size: var(--text-xl);
letter-spacing: 1.5px;
text-transform: capitalize;
width: max-content;
border-bottom: 2px solid var(--text);
margin-bottom: 25px;
}
}

.player-wristband {
width: 100%;
height: 100%;

box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
background-color: white;
border-radius: var(--border-radius-2);
// background-color: var(--background);
grid-area: Wristband;
display: flex;
padding: 20px;
flex-flow: column nowrap;
padding-bottom: 50px;
gap: 20px;

h1 {
font-size: var(--text-xxxl);
color: var(--primary-strong);
text-transform: capitalize;
letter-spacing: 2px;
align-self: flex-start;
}

.player-status-list {
display: flex;
justify-content: flex-start;
}

.handContainer {
backgcround-color: white;
margin-top: auto;
width: 80%;
align-self: center;
}
}

`;
export default function AddPlayer() {
  return (
    <Container>
      <section className='player-login'>
        <AddPlayerButton>new player</AddPlayerButton>
        <div className='login-container'>
          <h3 className='heading'>player:</h3>
          <LoginPlayer/>
        </div>
      </section>
      <section className='player-wristband'>
        <h1>wristband assignment</h1>
        <div className='player-status-list'>
          <PlayerList/>
        </div>
        <div className='handContainer Light-Mode'>
          <WristbandIcon />
        </div>
      </section>
    </Container>
  );
}
