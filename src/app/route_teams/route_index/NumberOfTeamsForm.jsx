import * as React from "react";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import { TextInput_0 } from "/src/components/textInputs";
import { useRegistrationContext } from "/src/app/route_registration_team";

const TextInput = styled(TextInput_0)`
  height: 55px;
  // width: 100%;
  font-size: var(--text-sm);
width: 70%;
`;

const StyleNumberOfTeamsForm = styled.form`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
justify-content: space-around;
// width: 100%;
  height: 45px;
gap: 15px;

  legend {
    display: none;
  }
`;

const StyleGroupCheck = styled.div`
text-transform: capitalize;
input {
width: 23px;
height: 23px;
cursor: pointer;
}
`
function NumberOfTeamsForm({ onSubmit, setOpen }) {
  const { state, dispatchRegistration } = useRegistrationContext();

  const [form, setForm] = FormStore.init({
    error: "",
    errors: {},
    submitting: false,
    fields: {
      nteams: 1,
      group: true,
    },
  });

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <StyleNumberOfTeamsForm
        id="createTeamsForm"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.fields.nteams, form.fields.group);
          setOpen(false);
        }}
      >
        <legend>number of teams</legend>
        <TextInput name="nteams" label="number of teams" />
        <StyleGroupCheck>
          <input
            onChange={(e) => setForm('setInput', 'group', !form.fields.group)}
            type='checkbox' id='group' name='group' checked={form.fields.group}/>
          <label htmlFor='group'>group</label>
        </StyleGroupCheck>
      </StyleNumberOfTeamsForm>
    </FormStore.Provide>
  );
}

export { NumberOfTeamsForm };
