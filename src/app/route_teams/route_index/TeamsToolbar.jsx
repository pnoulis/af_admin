import * as React from "react";
import styled from "styled-components";
import { ButtonText } from "/src/components/buttons";
import { FilterTeams } from "./FilterTeams.jsx";
import { FancyLinkButton } from "/src/components/styled/links";
import { Modal } from "/src/modals";
import { NewTeamsDialog } from "./NewTeamsDialog";
import { useTeamsContext, teamSchema } from "/src/app/route_teams/store.jsx";

const StyleTeamsToolbar = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  max-height: 45px;
  gap: 50px;
  justify-content: space-between;
`;

const StyleButton = styled(ButtonText)`
  height: 48px;
`;

function FilterTeamsTable() {
  return <div>filter teams table</div>;
}

function generateTeams(nteams, group) {
  const teams = [];

  for (let i = 0; i < nteams; ++i) {
    teams.push(teamSchema(group));
  }
  return teams;
}

function NewTeamButton() {
  const { state, dispatch } = useTeamsContext();

  const handleSubmit = (nteams, group) => {
    const newTeams = [...state.teams, ...generateTeams(nteams, group)];
    dispatch({ type: "new_state", new: {
      ...state,
      teams: newTeams,
    }});
  };

  return (
    <StyleButton
      onClick={() => {
        Modal.render(<NewTeamsDialog initialOpen onSubmit={handleSubmit} />);
      }}
    >
      new team
    </StyleButton>
  );
}

function TeamsToolbar() {
  return (
    <StyleTeamsToolbar>
      <NewTeamButton />
      <FilterTeams />
    </StyleTeamsToolbar>
  );
}

export { TeamsToolbar };
