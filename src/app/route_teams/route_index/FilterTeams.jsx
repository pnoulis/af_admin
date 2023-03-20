import * as React from "react";
import styled from "styled-components";
import { FormStore } from "/src/stores";
import { TextInput_0 } from "/src/components/textInputs";
import { ButtonText } from "/src/components/buttons/index.js";
import {
  useTeamsContext,
  WRISTBAND_STATUS,
} from "/src/app/route_teams/store.jsx";

const TextInput = styled(TextInput_0)`
  height: 100%;
  width: 350px;
  font-size: var(--text-sm);
  .input {
    border: 2px solid black;
    background-color: white;
    border-radius: 0;
    border-top-left-radius: var(--border-radius-1);
    border-bottom-left-radius: var(--border-radius-1);
  }
  .label {
    display: none;
  }
`;

const StyleSubmitButton = styled(ButtonText)`
  flex: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  background-color: green;
  border-radius: 0;
  border-top-right-radius: var(--border-radius-1);
  border-bottom-right-radius: var(--border-radius-1);
  background-image: var(--btn-primary-color);
  background-size: 200% auto;
  font-family: Roboto;
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
`;

const StyleFilterTeamsForm = styled.form`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  height: 45px;

  legend {
    display: none;
  }
`;

function FilterTeams() {
  const { state, dispatch } = useTeamsContext();
  const [form, setForm] = FormStore.init({
    error: "",
    errors: {},
    submitting: false,
    fields: {
      filters: "",
    },
  });

  return (
    <FormStore.Provide value={{ ...form, setForm }}>
      <StyleFilterTeamsForm
        id="filterTeamsForm"
        onSubmit={(e) => {
          e.preventDefault();
          let [key, value] = form.fields.filters.split(":");
          if (key === "status") {
            value = WRISTBAND_STATUS[value];
          }
          const filteredTeams = state.teams.filter(
            (team) => team[key] === value
          );
          dispatch({
            type: "new_state",
            new: {
              ...state,
              filter: filteredTeams,
            },
          });
        }}
      >
        <legend>filter</legend>
        <TextInput name="filters" />
        <StyleSubmitButton
          form="filterTeamsForm"
          type="submit"
          disabled={form.submitting}
        >
          filter
        </StyleSubmitButton>
      </StyleFilterTeamsForm>
    </FormStore.Provide>
  );
}

export { FilterTeams };
