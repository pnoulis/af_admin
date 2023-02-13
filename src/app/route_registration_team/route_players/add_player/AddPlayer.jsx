import * as React from "react";
import styled from "styled-components";
import { ToggleForm } from "./ToggleForm";
import { LoginPlayerForm } from "./LoginPlayerForm";
import { RegisterPlayerForm } from "./RegisterPlayerForm";

const StyleLayoutAddPlayer = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "toggle_form" "player_form";
  gap: 30px;
  /* Dimensions */
  width: 100%;
  height: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemToggleForm = styled(ToggleForm)`
  grid-area: toggle_form;
`;

const StyleLayoutItemPlayerForm = styled.section`
  grid-area: player_form;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  margin: auto;
`;

function AddPlayer() {
  const [registerUser, setRegisterUser] = React.useState(false);
  return (
    <StyleLayoutAddPlayer>
      <StyleLayoutItemToggleForm
        registerUser={registerUser}
        onToggle={() => setRegisterUser((prev) => !prev)}
      />
      <StyleLayoutItemPlayerForm>
        {registerUser ? <RegisterPlayerForm /> : <LoginPlayerForm />}
      </StyleLayoutItemPlayerForm>
    </StyleLayoutAddPlayer>
  );
}

export { AddPlayer };
