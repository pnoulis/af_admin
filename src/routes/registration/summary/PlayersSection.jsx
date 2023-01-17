import React from "react";
import styled from "styled-components";
import { ReactComponent as Cancel } from "/assets/icons/cancel_1-cropped.svg";
import { ReactComponent as EuroIcon } from "/assets/icons/euro-cropped.svg";
import { ReactComponent as Trash } from "/assets/icons/trash_1-cropped.svg";
import { ReactComponent as Signal } from "/assets/icons/signal_1.svg";
import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";

const playersList = [
  {
    id: "123",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
    price: 30,
  },
  {
    id: "345",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
    price: 40,
  },
  {
    id: "567",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
    price: 33,
  },
  {
    id: "891",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
    price: 15.25,
  },
  {
    id: "131",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
    price: 20,
  },
  {
    id: "121",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
    price: 20,
  },
];

const StylePlayersList = styled.ul`
  all: unset;
  box-sizing: border-box;
  background-color: white;
  display: flex;

  // Dimensions
  min-width: 100%;
  min-height: 100%;

  // Contents
  flex-flow: column nowrap;
  gap: 15px;

  // Appearance
  list-style-type: none;
  outline: none;
  text-decoration: none;
`;

const StylePlayer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  .player-toolbar {
    display: flex;
    flex-flow: row nowrap;
  }
`;

function PlayersList({ players }) {
  return (
    <StylePlayersList>
      {players.map((player, i) => (
        <li key={i}>
          <Player id={player.id} username={player.username}></Player>
        </li>
      ))}
    </StylePlayersList>
  );
}

function Player({ id, username }) {
  return (
    <StylePlayer>
      <span className="text">{username}</span>
      <section className="player-toolbar">
        <div className="toolbar-item">
          <EuroIcon width="50px" />
          50
        </div>
        <div className="toolbar-item">
          <DiscountIcon width="50px" />
        </div>
        <div className="toolbar-item">
          <Signal width="50px" />
        </div>
        <div className="toolbar-item">
          <Trash width="50px" />
        </div>
      </section>
    </StylePlayer>
  );
}

function PlayersSection() {
  return (
    <div>
      <PlayersList players={playersList} />
    </div>
  );
}

export default PlayersSection;
