import React, { useCallback, useState, useEffect } from "react";
import { PlayersList } from "./PlayersList";
import { ReactComponent as WristbandIcon } from "/assets/icons/wristband_image.svg";
import { WristbandSectionStyle } from "./styles";

const playersList = [
  {
    id: "123",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "345",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "567",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "891",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "131",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "121",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
];

function filterPlayerList(players) {
  return players.reduce((car, cdr) => {
    car.push({
      id: cdr.id,
      username: cdr.username,
      wristband: {
        id: cdr.registeredWristbandNumber || null,
        status: cdr.registeredWristbandNumber ? "assigned" : "",
        colorCode: cdr.wristbandColor || null,
      },
    });
    return car;
  }, []);
}

export default function WristbandSection() {
  const [players, setPlayers] = useState(() => filterPlayerList(playersList));
  const [isPairing, setIsPairing] = useState(false);

  const onWristbandPairing = useCallback(
    (toggledPlayerId, isPairing) => {
      setPlayers((prev) => {
        return prev.map((player) => {
          if (player.id === toggledPlayerId) {
            return {
              ...player,
              wristband: {
                status: isPairing ? "pairing" : "",
              },
            };
          } else {
            return {
              ...player,
              wristband: {
                status:
                  player.wristband.status === "pairing"
                    ? null
                    : player.wristband.status,
              },
            };
          }
        });
      });
    },
    [players, setPlayers]
  );

  useEffect(() => {
    if (players.some((player) => player.wristband.status === "pairing")) {
      setIsPairing(true);
    } else {
      setIsPairing(false);
    }
  }, [players]);

  return (
    <WristbandSectionStyle className="player-wristband-panel">
      <section className="players-status">
        <PlayersList
          players={players}
          handleWristbandPairing={onWristbandPairing}
        />
      </section>
      <section
        className={`wristband-widget ${isPairing ? "pairing" : undefined}`}
      >
        <WristbandIcon />
      </section>
    </WristbandSectionStyle>
  );
}
