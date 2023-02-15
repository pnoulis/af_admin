import * as React from "react";
import { useMqtt } from '/src/mqtt';

function useRegisterPlayer() {
  const { client } = useMqtt();

  const handleRegisterPlayer = React.useCallback(
    (player, cb) => client.publish('/player/register', player, cb),
    []
  );

  return handleRegisterPlayer;
}

export { useRegisterPlayer };
