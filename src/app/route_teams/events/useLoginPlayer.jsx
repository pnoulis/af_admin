import * as React from "react";
import { useMqtt } from "/src/mqtt";

function useLoginPlayer() {
  const { client } = useMqtt();
  const unsubscribe = React.useRef(null);

  const handleLoginPlayer = React.useCallback(
    (player, cb) =>
      (unsubscribe.current = client.publish("/player/login", player, cb)),
    [client]
  );

  React.useEffect(() => {
    return () => unsubscribe.current && unsubscribe.current();
  }, []);

  return handleLoginPlayer;
}

export { useLoginPlayer };
