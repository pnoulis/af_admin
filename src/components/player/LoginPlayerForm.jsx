import React, { useEffect } from "react";
import { TextInput_0 } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import Client from "/src/mqtt";
const { useMqtt } = Client();

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
  unset: all;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  width: 100%;
  gap: 15px;

  & > legend {
    display: none;
  }

  & > button {
    flex: 0 0 50px;
    border-radius: var(--border-radius-1);
  }
`;

function handleSubmit(e, form, setForm, publish) {
  e.preventDefault();
  if (Object.values(form.errors).some((err) => !!err)) return;
  if (Object.values(form.fields).some((field) => !field)) return;
  publish({
    username: form.fields.username,
    password: form.fields.password,
  });
}

export function LoginPlayerForm() {
  const { message, publish, unsubscribe } = useMqtt("player/login");
  const [form, setForm] = FormStore.init({
    errors: {},
    fields: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!message) return;
    switch (message?.result) {
      case "OK":
        console.log(message);
        break;
      case "NOK":
        console.log(message);
        break;
      default:
        console.log(message);
        break;
    }
  }, [message]);

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <Form
        id="loginPlayer"
        onSubmit={(e) => handleSubmit(e, form, setForm, publish)}
      >
        <legend>player</legend>
        <TextInput name="username" />
        <TextInput type="password" name="password" />
        <ButtonText form="loginPlayer" type="submit">
          login
        </ButtonText>
      </Form>
    </FormStore.Provide>
  );
}
