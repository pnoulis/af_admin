import * as React from "react";
import styled from "styled-components";
import {
  PlayerActionbarItemPrice,
  PlayerActionbarItemDiscount,
  PlayerActionbarItemWristbandPair,
  PlayerActionbarItemRosterRemove,
} from "./PlayerActionbarItems";
import { PlayerActionbar } from "./PlayerActionbar";

const StylePlayerWidget = styled.article`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 30px;
  justify-content: space-between;
  /* Dimensions */
  padding: 8px 5px 8px 12px;
  min-width: 250px;
  /* Position */
  /* Fonts */
  font-family: NoirPro-Medium;
  /* Effects */
  border: 4px solid transparent;
  border-radius: var(--border-radius-1);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1), -2px -2px 15px rgba(0, 0, 0, 0.1);
  /* Children */
`;

const StylePlayerWidgetMerge = styled.article`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 30px;
  /* Dimensions */
  padding: 10px;
  /* Position */
  /* Fonts */
  font-family: NoirPro-Medium;
  /* Effects */
  /* Children */
`;

const StylePlayerName = styled.p`
  font-size: 1.2rem;
  position: relative;
  letter-spacing: 1px;
  top: 4px;
`;

const StylePlayerNameMerge = styled(StylePlayerName)`
  font-size: 1.4rem;
`;

function PlayerWidget() {
  return (
    <StylePlayerWidget>
      <StylePlayerName>pavlos</StylePlayerName>
      <PlayerActionbar>
        <PlayerActionbarItemWristbandPair />
        <PlayerActionbarItemRosterRemove />
      </PlayerActionbar>
    </StylePlayerWidget>
  );
}

function PlayerWidgetPackage() {
  return (
    <StylePlayerWidget>
      <StylePlayerName>pavlos</StylePlayerName>
      <PlayerActionbar>
        <PlayerActionbarItemPrice />
        <PlayerActionbarItemDiscount />
        <PlayerActionbarItemWristbandPair />
      </PlayerActionbar>
    </StylePlayerWidget>
  );
}

function PlayerWidgetMerge() {
  return (
    <StylePlayerWidgetMerge>
      <PlayerActionbar>
        <PlayerActionbarItemWristbandPair size="60px" />
      </PlayerActionbar>
      <StylePlayerNameMerge>pavlos</StylePlayerNameMerge>
    </StylePlayerWidgetMerge>
  );
}

const StylePlayerRoster = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 70px;
  gap: 30px;
`;

const StylePlayerRosterMerge = styled(StylePlayerRoster)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: auto;
  gap: 50px;
`;

const StylePlayerRosterItem = styled.li``;

function PlayerRoster() {
  return (
    <StylePlayerRoster>
      <PlayerWidget />
      <PlayerWidget />
      <PlayerWidget />
      <PlayerWidget />
      <PlayerWidget />
      <PlayerWidget />
    </StylePlayerRoster>
  );
}

function PlayerRosterPackage() {
  return (
    <StylePlayerRoster>
      <PlayerWidgetPackage />
      <PlayerWidgetPackage />
      <PlayerWidgetPackage />
      <PlayerWidgetPackage />
      <PlayerWidgetPackage />
      <PlayerWidgetPackage />
    </StylePlayerRoster>
  );
}

function PlayerRosterMerge() {
  return (
    <StylePlayerRosterMerge>
      <PlayerWidgetMerge />
      <PlayerWidgetMerge />
      <PlayerWidgetMerge />
      <PlayerWidgetMerge />
      <PlayerWidgetMerge />
      <PlayerWidgetMerge />
    </StylePlayerRosterMerge>
  );
}

export {
  PlayerWidget,
  PlayerRoster,
  PlayerRosterPackage,
  PlayerWidgetMerge,
  PlayerRosterMerge,
};
