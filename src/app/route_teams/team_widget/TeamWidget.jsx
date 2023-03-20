import * as React from 'react';
import styled from 'styled-components';
import { SvgButton } from '/src/components/svgs';
import { ReactComponent as MoreTeam } from "/assets/icons/more_horizontal-cropped.svg";
import { CreateTeamForm } from './CreateTeamForm'
import {
  TEAM_STATUS,
  useTeamsContext,
} from '/src/app/route_teams/store';
import { mapTeamStatus } from '/src/misc';

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

const StyleTeamIndicator = styled.div`
display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;
position: relative;
top: 4px;
`

const StyleTeamIndicatorStatus = styled.span`
color: rgb(30, 144, 255);
  font-family: NoirPro-Medium;
  font-size: var(--text-xl);
  font-weight: bolder;
  letter-spacing: 1px;

`
const StyleTeamIndicatorName = styled.span`
font-family: NoirPro-Medium;
  color: var(--secondary-strong);
  font-size: var(--text-xxl);
  font-weight: bolder;
  letter-spacing: 1px;
  position: relative;
`
function TeamWidget() {
  const { state, dispatchRegistration } = useTeamsContext();

  return (
    <StyleLayoutTeamWidget>
      <TeamIndicator status={mapTeamStatus(state.active.status)} name={state.active.name}/>
      <section className="team-tools">
        <SvgButton className='tool-item' color='white'><MoreTeam/></SvgButton>
      </section>
    </StyleLayoutTeamWidget>
  );
}

function TeamIndicator({status, name}) {
  return <StyleTeamIndicator>
    <StyleTeamIndicatorStatus>[{status}]</StyleTeamIndicatorStatus>
           <StyleTeamIndicatorName>team:{name}</StyleTeamIndicatorName>
  </StyleTeamIndicator>;
}


export { TeamWidget };
// {
//   (state.active.rosterStatus >= ROSTER_STATUS['verified'] &&
//    state.active.status < TEAM_STATUS['registered'])
//     ? <CreateTeamForm />
//     : <StyleTeamName>{state.active.name || state.active.id}</StyleTeamName>
// }
