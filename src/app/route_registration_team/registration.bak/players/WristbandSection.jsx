import React, { useCallback, useEffect, useState, useRef } from "react";
import { PlayersList } from "./PlayersList";
import { WristbandSectionStyle } from "./styles";
import { ReactComponent as WristbandIcon } from "/assets/icons/wristband_image.svg";
// import Client from "/src/mqtt";
// const { useMqtt, client } = Client();

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

function togglePairingFlag(players, playerId, isPairing) {
  console.log("toggle pairing flag");
  console.log(players);
  console.log(playerId);
  return players.map((player) => {
    if (player.id === playerId) {
      console.log("assignide wristband status");
      const newwristband = player.wristband;
      console.log(newwristband);
      if (isPairing) {
        newwristband.status ||= "pairing";
      } else {
        newwristband.status =
          newwristband.status === "pairing" ? "" : newwristband.status;
      }

      console.log("after assignment");
      console.log(newwristband);

      return {
        ...player,
        wristband: {
          ...newwristband,
        },
      };
    } else {
      return {
        ...player,
        wristband: {
          ...player.wristband,
          status:
            player.wristband.status === "pairing"
              ? ""
              : player.wristband.status,
        },
      };
    }
  });
}

function assignWristband(players, playerId, wristband) {
  return players.map((player) => {
    if (player.id === playerId) {
      return {
        ...player,
        wristband: {
          status: "assigned",
          id: wristband.wristbandNumber,
          colorCode: wristband.wristbandColor,
        },
      };
    } else {
      return player;
    }
  });
}

function cleanupPreviousPlayerState() {
  // unsubscribe
  // this player already has subscribed
}

function validateWristband() {}

export default function WristbandSection() {
  const [players, setPlayers] = useState(() => filterPlayerList(playersList));
  const [isPairing, setIsPairing] = useState(false);
  const subscription = useRef(
    (() => {
      let _unsub;
      return {
        register: ({ unsubscribe }) => {
          _unsub && _unsub();
          _unsub = unsubscribe;
        },
        unsubscribe: () => {
          _unsub && _unsub();
          _unsub = null;
        },
      };
    })()
  );

  const handlePlayerPairToggle = useCallback(
    (toggledPlayerId, isPairing) => {
      subscription.current.unsubscribe();
      players.forEach((player, i) => {
        if (player.id === toggledPlayerId) {
          if (player.wristband.status === "pairing") {
            player.wristband.status = "";
          } else if (player.wristband.status === "") {
            player.wristband.status = "pairing";
            subscription.current.register(
              client.subscribe("wristband/scan", (message) => {
                subscription.current.unsubscribe();
                const { unsubscribe, publish } = client.subscribe(
                  "wristband/register",
                  (message) => {
                    subscription.current.unsubscribe();
                    console.log("registered wristband");
                    console.log(message);
                  }
                );
                publish({
                  username: player.username,
                  wristbandNumber: message.wristbandNumber,
                });
              })
            );
          }
        } else if (player.wristband.status === "pairing") {
          player.wristband.status = "";
        }
      });

      console.log(players);
      setPlayers(players.map((player) => player));
      setIsPairing((prev) => !prev);
    },
    [isPairing, setIsPairing]
  );

  useEffect(() => {
    () => subscription.current.unsubscribe();
  }, []);

  useEffect(() => {
    // console.log("new players");
    // console.log(players);
    // const playerPairing = players.find(
    //   (player) => player.wristband.status === "pairing"
    // );
    // subscription.unsubscribe && subscription.unsubscribe();
    // if (playerPairing) {
    //   console.log("register player for pairing");
    //   setSubscription(
    //     client.subscribe("wristband/scan", (message) => {
    //       const { publish } = client.subscribe(
    //         "wristband/register",
    //         (message) => {
    //           console.log("wristband registered message");
    //           console.log(message);
    //           if (message.result === "NOK") {
    //             // make flash message
    //           } else {
    //             //assignwristband
    //             //setPlayers((prev) =>
    //             //  assignWristband(prev, playerPairing.id, message)
    //             //);
    //           }
    //         }
    //       );
    //       client.publish("wristband/register", {
    //         username: playerPairing.username,
    //         wristbandNumber: playerPairing.wristband.id,
    //       });
    //     })
    //   );
    //   setIsPairing(true);
    // } else {
    //   console.log("unregister player for pairing");
    //   setIsPairing(false);
    // }
    // if (players.some((player) => player.wristband.status === "pairing")) {
    //   setIsPairing(true);
    //   subscription?.unsubscribe && subscription.unsubscribe();
    //   setSubscription(
    //     client.subscribe("wristband/scan", (message) => {
    //       console.log(message);
    //       // setSubscription({
    //       //   ...subscription,
    //       //   playerId: toggledPlayerId,
    //       //   message,
    //       // });
    //     })
    //   );
    // } else {
    //   setIsPairing(false);
    // }
    // console.log(players);
  }, [players]);

  return (
    <WristbandSectionStyle className="player-wristband-panel">
      <section className="players-status">
        <PlayersList
          players={players}
          handleWristbandPairing={handlePlayerPairToggle}
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
