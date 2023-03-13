import * as React from "react";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import { TextInput_0 } from "/src/components/textInputs";
import { useRegistrationContext } from "/src/app/route_registration_team";

const TextInput = styled(TextInput_0)`
  height: 55px;
  width: 100%;
  font-size: var(--text-sm);
`;

const StyleNumberOfTeamsForm = styled.form`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  height: 45px;

  legend {
    display: none;
  }
`;
function NumberOfTeamsForm({ onSubmit, setOpen }) {
  const { state, dispatchRegistration } = useRegistrationContext();

  const [form, setForm] = FormStore.init({
    error: "",
    errors: {},
    submitting: false,
    fields: {
      nteams: 1,
    },
  });

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <StyleNumberOfTeamsForm
        id="createTeamsForm"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.fields.nteams);
          setOpen(false);
          /* let newTeams = []; */
          /* newTeams = newTeams.concat( */
          /*   state.teams, */
          /*   generateTeams(e.target.value) */
          /* ); */

          /* console.log(newTeams); */
        }}
      >
        <legend>number of teams</legend>
        <TextInput name="nteams" label="number of teams" />
      </StyleNumberOfTeamsForm>
    </FormStore.Provide>
  );
}

export { NumberOfTeamsForm };
