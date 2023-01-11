import React from "react";
import styled, { css } from "styled-components";
import { TextInput_0 } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons";

const TextInput = styled(TextInput_0)`
  height: 45px;
  font-size: var(--text-sm);
  .input {
    border: none;
    background-color: white;
    border-radius: var(--border-radius-1);
  }

  .input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    background-color: white;
  }
`;

const Form = styled.form`
  position: relative;
  display: none;
  unset: all;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  width: 100%;
  // background: white;
  border-radius: var(--border-radius-1);
  gap: 10px;

  & > legend {
    display: none;
  }

  & > button {
    flex: 0 0 50px;
    border-radius: var(--border-radius-1);
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
