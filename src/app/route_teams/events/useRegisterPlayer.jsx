import * as React from "react";
import { useMqtt } from "/src/mqtt";

function useRegisterPlayer() {
  const { client } = useMqtt();
  const unsubscribe = React.useRef(null);

  const handleRegisterPlayer = React.useCallback(
    (player, cb) =>
      (unsubscribe.current = client.publish("/player/register", player, cb)),
    [client]
  );

  React.useEffect(() => {
    return () => unsubscribe.current && unsubscribe.current();
  }, []);

  return handleRegisterPlayer;
}

export { useRegisterPlayer };
