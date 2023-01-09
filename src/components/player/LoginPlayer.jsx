import React from 'react';
import { TextInput_0 as TextInput } from '/src/components/textInputs';
import { ButtonText } from '/src/components/buttons';
import styled from 'styled-components';


const Form = styled.form`
unset: all;
display: flex;
flex-flow: column nowrap;
box-sizing: border-box;
width: 100%;
max-width: 400px;
gap: 15px;

& > legend {
display: none;
}

& > button {
flex: 0 0 50px;
}
`;

export function LoginPlayer() {
  return (
    <Form
      id='loginPlayer'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <legend>player</legend>
      <TextInput
        name='username'
      />
      <TextInput
        type='password'
        name='password'
      />
      <ButtonText
        form='loginPlayer'
        type='submit'
      >login</ButtonText>
    </Form>
  );
}
