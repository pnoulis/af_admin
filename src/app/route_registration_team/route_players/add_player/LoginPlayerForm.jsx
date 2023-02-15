import * as React from "react";
import { TextInput_0 } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import {
  useLoginPlayer,
  useRegistrationContext,
} from "/src/app/route_registration_team";
import { useAddPlayerToTeam } from "../../events";

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

const StyleLoginPlayerForm = styled.form`
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
  color: red;
  text-align: center;
`;

function LoginPlayerForm() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const handleLoginPlayer = useLoginPlayer();
  const handleAddplayerToTeam = useAddPlayerToTeam();
  const [form, setForm] = FormStore.init({
    error: "",
    errors: {},
    submitting: false,
    fields: {
      username: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (!form.submitting) return;
    handleLoginPlayer(form.fields, (err, res) => {
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
      <StyleLoginPlayerForm
        id="loginPlayerForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(form.fields).some((field) => !field)) return;
          setForm("setSubmit", true);
        }}
      >
        <legend>login player</legend>
        <TextInput name="username" />
        <TextInput type="password" name="password" />
        <StyleErrorMessage>{form.error}</StyleErrorMessage>
        <ButtonText
          form="loginPlayerForm"
          type="submit"
          disabled={form.submitting}
        >
          login
        </ButtonText>
      </StyleLoginPlayerForm>
    </FormStore.Provide>
  );
}

export { LoginPlayerForm };
