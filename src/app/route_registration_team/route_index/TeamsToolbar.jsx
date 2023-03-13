import * as React from "react";
import styled from "styled-components";
import { ButtonText } from "/src/components/buttons";
import { FilterTeams } from "./FilterTeams.jsx";
import { FancyLinkButton } from "/src/components/styled/links";
import { Modal } from "/src/modals";
import { NewTeamsDialog } from "./NewTeamsDialog";
import { useRegistrationContext } from "/src/app/route_registration_team/";

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

function generateTeams(nteams) {
  const teams = [];

  for (let i = 0; i < nteams; ++i) {
    teams.push({
      name: Math.random().toString(16).slice(2, 8),
      nplayers: 0,
      npackages: 0,
      status: "new",
    });
  }
  return teams;
}

function NewTeamButton() {
  const { state, dispatchRegistration } = useRegistrationContext();

  const handleSubmit = (nteams) => {
    const newTeams = state.teams.concat(generateTeams(nteams));
    dispatchRegistration({ type: "set_teams", teams: newTeams });
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
