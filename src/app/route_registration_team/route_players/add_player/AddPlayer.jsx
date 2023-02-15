import * as React from "react";
import styled from "styled-components";
import { ToggleForm } from "./ToggleForm";
import { LoginPlayerForm } from "./LoginPlayerForm";
import { RegisterPlayerForm } from "./RegisterPlayerForm";
import {
  useAddPlayerToTeam,
  useRegistrationContext,
} from "/src/app/route_registration_team";

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
padding-left: 50px;
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
max-width: 400px;
`;

function AddPlayer() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const handleAddPlayerToTeam = useAddPlayerToTeam(state, dispatchRegistration);
  const [show, setShow] = React.useState(false);

  return (
    <StyleLayoutAddPlayer>
      <StyleLayoutItemToggleForm
        registerUser={show}
        onToggle={() => setShow((prev) => !prev)}
      />
      <StyleLayoutItemPlayerForm>
        {show ? <RegisterPlayerForm /> : <LoginPlayerForm />}
      </StyleLayoutItemPlayerForm>
    </StyleLayoutAddPlayer>
  );
}

export { AddPlayer };
