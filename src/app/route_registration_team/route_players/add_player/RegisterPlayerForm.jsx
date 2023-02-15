import * as React from 'react';
import { TextInput_0 } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import {
  useRegisterPlayer,
  useAddPlayerToTeam,
  useRegistrationContext,
} from "/src/app/route_registration_team";


const TextInput = styled(TextInput_0)`
  height: 55px;
  font-size: var(--text-sm);
  .input {
    border: 2px solid black;
    background-color: white;
    border-radius: var(--border-radius-1);
  }

  .input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    background-color: white;
  }
`;

const StyleRegisterPlayerForm = styled.form`
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

const StyleErrorMessage = styled.p`
  color: var(--error-2);
  text-align: center;
`;

function RegisterPlayerForm() {
const { state, dispatchRegistration } = useRegistrationContext();
  const handleRegisterPlayer = useRegisterPlayer();
  const handleAddplayerToTeam = useAddPlayerToTeam();
  const [form, setForm] = FormStore.init({
    error: "",
    errors: {},
    submitting: false,
    fields: {
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      dateOfBirth: "",
      username: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (!form.submitting) return;
    handleRegisterPlayer(form.fields, (err, res) => {
      if (err) {
        throw new Error("500 - Internal server error page");
      } else if (res.result === "NOK") {
        setForm("setError", res.message);
        setForm("setSubmit", false);
      } else {
        setForm("reset");
        handleAddplayerToTeam(state, dispatchRegistration, res.player);
      }
    });
  }, [form.submitting]);

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <StyleRegisterPlayerForm
        id="registerPlayerForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(form.fields).some((field) => !field)) return;
          setForm("setSubmit", true);
        }}
      >
        <legend>register player</legend>
        <TextInput name="firstName" label='first name'/>
        <TextInput name="lastName" label='last name'/>
        <TextInput type="email" name="email" />
        <TextInput type="tel" name="tel" />
        <TextInput name="dateOfBirth" label='date of birth' placeholder='1993-05-30'/>
        <TextInput name="username" />
        <TextInput type="text" name="password" />
        <StyleErrorMessage>{form.error}</StyleErrorMessage>
        <ButtonText
          form="registerPlayerForm"
          type="submit"
          disabled={form.submitting}
        >
          register
        </ButtonText>
      </StyleRegisterPlayerForm>
    </FormStore.Provide>
  );
}

export { RegisterPlayerForm };
