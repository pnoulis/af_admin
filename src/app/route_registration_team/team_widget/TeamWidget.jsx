import * as React from 'react';
import styled from 'styled-components';
import { SvgButton } from '/src/components/svgs';
import { ReactComponent as MoreTeam } from "/assets/icons/more_horizontal-cropped.svg";
import { CreateTeamForm } from './CreateTeamForm'
import {
  ROSTER_STATUS,
  TEAM_STATUS,
  useRegistrationContext,
} from '/src/app/route_registration_team';

const StyleLayoutTeamWidget = styled.div`
 width: 100%;
 max-width: max-content;
 margin-left: auto;
  height: 100%;
  border-radius: var(--border-radius-2);
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  &:hover {
    border-color: var(--primary-strong);
  }

  .team-tools {
    flex: 1;
    height: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-end;
  }

  .tool-item {
    width: 50px;
    height: 50px;
    fill: white;

  }

  .tool-item:hover {
    opacity: 0.7;
  }

  .tool-item:nth-of-type(2) {
    padding: 10px;
  }
`;

const StyleTeamName = styled.p`
font-size: 1.8rem;
letter-spacing: 1px;
  font-family: NoirPro-Medium;
  margin-right: 50px;
  color: var(--secondary-strong);
`
function TeamWidget() {
  const { state, dispatchRegistration } = useRegistrationContext();

  return (
    <StyleLayoutTeamWidget>
      {
        (state.active.rosterStatus >= ROSTER_STATUS['verified'] &&
          state.active.status < TEAM_STATUS['registered'])
          ? <CreateTeamForm />
          : <StyleTeamName>{state.active.name || state.active.id}</StyleTeamName>
      }
      <section className="team-tools">
        <SvgButton className='tool-item' color='white'><MoreTeam/></SvgButton>
      </section>
    </StyleLayoutTeamWidget>
  );
}

export { TeamWidget };
