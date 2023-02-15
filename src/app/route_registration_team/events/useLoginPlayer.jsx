import * as React from "react";
import { useMqtt } from "/src/mqtt";

function useLoginPlayer() {
  const { client } = useMqtt();

  const handleLoginPlayer = React.useCallback(
    (player, cb) => client.publish("/player/login", player, cb),
    []
  );

  return handleLoginPlayer;
}

export { useLoginPlayer };
