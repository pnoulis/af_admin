import React, { useEffect, useState, useCallback } from "react";
import { ReactComponent as Trash } from "/assets/icons/trash_1-cropped.svg";
import { ReactComponent as Signal } from "/assets/icons/signal_1.svg";
import { createRipple } from "/src/lib";
import { PlayersListStyle, PlayerStyle } from "./styles";

function Player({
  id,
  username,
  isPairing,
  wristbandColorCode,
  handleWristbandPairing,
  handlePlayerRemoval,
}) {
  const onWristbandPairing = useCallback(
    (e) => {
      createRipple(e);
      handleWristbandPairing(id, !isPairing);
    },
    [id, isPairing]
  );

  const onPlayerRemoval = useCallback(
    (e) => {
      e.stopPropagation();
      handlePlayerRemoval(player);
    },
    [id]
  );

  return (
    <PlayerStyle
      className={isPairing ? "pairing" : undefined}
      onClick={(e) => onWristbandPairing(e)}
    >
      <span className="text">{username}</span>
      <span className={"icon1" + `${wristbandColorCode ? " assigned" : ""}`}>
        <Signal />
      </span>
      <span className="icon2" onClick={onPlayerRemoval}>
        <Trash />
      </span>
    </PlayerStyle>
  );
}

export function PlayersList({
  players,
  handleWristbandPairing,
  handlePlayerRemoval,
}) {
  return (
    <PlayersListStyle>
      {players.map((player, i) => (
        <li key={i}>
          <Player
            id={player.id}
            username={player.username}
            isPairing={player?.wristband?.status === "pairing" ? true : false}
            wristbandColorCode={player?.wristband?.colorCode}
            handleWristbandPairing={handleWristbandPairing}
            handlePlayerRemoval={handlePlayerRemoval}
          ></Player>
        </li>
      ))}
    </PlayersListStyle>
  );
}
