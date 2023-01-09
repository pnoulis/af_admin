import React from "react";
import styled from "styled-components";
import { TextInput_0 as TextInput } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons";

const Form = styled.form`
  position: relative;
  display: none;
  unset: all;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  width: 600px;
  padding: 40px 100px;
  background: white;
  border-radius: var(--border-radius-1);
  gap: 15px;

  & > legend {
    display: none;
  }

  & > button {
    flex: 0 0 50px;
  }
`;

export function RegisterPlayerForm() {
  return (
    <Form
      id="registerPlayer"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <legend>player</legend>
      <TextInput name="firstname" />
      <TextInput name="lastname" />
      <TextInput type="email" name="email" />
      <TextInput type="tel" name="tel" />
      <TextInput name="dateOfBirth" />
      <TextInput name="username" />
      <TextInput type="password" name="password" />
      <TextInput type="password" name="confirmPassword" />
      <ButtonText form="registerPlayer" type="submit">
        register
      </ButtonText>
    </Form>
  );
}
