import React from "react";
import styled from "styled-components";
import { PanelLink } from "/src/components/links";
import { ReactComponent as AddPlayerIcon } from "/assets/icons/add_player.svg";
import { ReactComponent as CreateTeamIcon } from "/assets/icons/merge_team.svg";
import { ReactComponent as addPackageIcon } from "/assets/icons/add_package.svg";
import { ReactComponent as SubmitTeamIcon } from "/assets/icons/summary.svg";
import { ReactComponent as CreateTeam } from "/assets/icons/merge_team-cropped.svg";
import { ReactComponent as MoreTeam } from "/assets/icons/more_horizontal-cropped.svg";
import { ReactComponent as PriceTeamIcon } from "/assets/icons/euro-cropped.svg";

import { TextInput_1 } from "/src/components/textInputs";

const TextInput = styled(TextInput_1)`
  height: 50px;
  font-size: var(--text-sm);
  .input {
    border: none;
    background-color: var(--grey-2);
    border-radius: var(--border-radius-1);
  }
`;

const Form = styled.form`
  unset: all;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  width: 450px;
  gap: 15px;

  & > legend {
    display: none;
  }
`;

const PanelHeader = styled.header`
  all: unset;
  box-sizing: border-box;
  display: grid;

  // Dimensions
  min-width: 100%;

  // Contents
  grid-template-rows: minmax(130px, min-content);
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "Nav Toolbar";
  justify-content: center;
  align-items: center;

  & > .header--nav {
    display: flex;
    gap: 10px;
  }

  & > .header--toolbar {
    width: 100%;
    height: 100%;
  }
`;

const TeamInfo = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  // background-color: white;
  border-radius: var(--border-radius-2);
  // box-shadow: var(--card-basic-shadow);
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  &:hover {
    border-color: var(--primary-strong);
  }

  .team-price {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .price-icon {
    height: 25px;
    aspect-ratio: 1 / 1;
  }

  .price {
    font-family: NoirPro-Medium;
    font-size: var(--text-xl);
    text-transform: uppercase;
    text-align: center;
    font-weight: 100;
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
    padding: 4px;
    height: 60px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    // margin-right: 15px;
    background-color: var(--grey-1);
    fill: white;
    cursor: pointer;
  }

  .tool-item:nth-of-type(2) {
    padding: 10px;
  }
`;

function Team() {
  return (
    <TeamInfo>
      <Form>
        <legend>team name</legend>
        <TextInput name="team_name" placeholder="New Team" />
      </Form>
      <section className="team-price">
        <span className="price-icon">
          <PriceTeamIcon />
        </span>
        <span className="price">100</span>
      </section>
      <section className="team-tools">
        <span className="tool-item">
          <CreateTeam />
        </span>
        <span className="tool-item">
          <MoreTeam />
        </span>
      </section>
    </TeamInfo>
  );
}

export function Header() {
  return (
    <PanelHeader className="panel--header">
      <nav className="header--nav">
        <PanelLink to="team/player/add" Icon={AddPlayerIcon}>
          players
        </PanelLink>
        <PanelLink to="team/package/add" Icon={addPackageIcon}>
          package
        </PanelLink>
        <PanelLink to="team/package/submit" Icon={SubmitTeamIcon}>
          summary
        </PanelLink>
      </nav>
      <section className="header--toolbar">
        <Team />
      </section>
    </PanelHeader>
  );
}
