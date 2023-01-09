import React, { useEffect } from 'react';
import styled from 'styled-components';


const players = [
  {
    id: "toehusoetnus234324",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  }
]

function PlayerPairToggle() {
}

export function PlayerPairToggleList({onPairToggle, onPlayerRemove}) {
  const [ players, setPlayers ] = useState(players);
  return (
    <section>
      <ul>
        {players.map((player, i) => (
          <PlayerPairToggle
          player={player}
          onPairToggle={onPairToggle}
          onPlayerRemove={onPlayerRemove}
          >
          </PlayerPairToggle>
        ))}
      </ul>
    </section>
  )
}
