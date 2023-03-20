import * as React from 'react';
import { ButtonText } from '/src/components/buttons';
import styled from 'styled-components';

const StyleButtonText = styled(ButtonText)`
  min-width: 250px;
  height: 50px;
  align-self: flex-start;
`;

function ToggleForm({registerUser, onToggle}) {
  return (
    <StyleButtonText onClick={onToggle}>
    {registerUser ? 'login player' : 'register player'}
    </StyleButtonText>
  );
}

export { ToggleForm };
