import React from 'react';
import styled from 'styled-components';

import {Add, Register} from '/src/components/Player';
import {Assign} from '/src/components/Wristband';

const Container = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-rows: 1fr;
grid-template-columns: 30% 30% 40%;
grid-template-areas:
  "Add Register Wristband";
align-items: start;
justify-items: center;
padding-top: 100px;
`;

export default function AddPlayer() {
  return (
    <Container>
      <Add/>
      <Register/>
      <Assign/>
    </Container>
  );
}
