import * as React from "react";
import { TextInput_0 } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import { useRegistrationContext } from "/src/app/route_registration_team";
import { useMqtt } from "/src/mqtt";

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
  const { client } = useMqtt();
  const { state, dispatchRegistration } = useRegistrationContext();
  const [error, setError] = React.useState("");
  const [form, setForm] = FormStore.init({
    errors: {},
    fields: {
      username: "",
      password: "",
    },
  });

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <StyleLoginPlayerForm
        id="loginPlayerForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(form.fields).some((field) => !field)) return;
          client.publish("/player/login", { ...form.fields }, (err, res) => {
            if (err) {
              throw new Error("500 - Internal server error page here");
            }
            if (res.result === "NOK") {
              setError(res.message);
            } else {
              /* setForm("reset"); */
              // make sure the player is not already part of the team.
              if (
                state.active?.players.find(
                  (player) => player.username === res.username
                )
              ) {
                console.log("player is already part of the team");
                console.log("throw a flash error message");
              }
              console.log(state);
              console.log(`calling dispatch`);
              dispatchRegistration({ type: "add_player", player: res.player });
            }
          });
        }}
      >
        <legend>login player</legend>
        <TextInput name="username" />
        <TextInput type="password" name="password" />
        <StyleErrorMessage>{error}</StyleErrorMessage>
        <ButtonText form="loginPlayerForm" type="submit">
          login
        </ButtonText>
      </StyleLoginPlayerForm>
    </FormStore.Provide>
  );
}

export { LoginPlayerForm };
