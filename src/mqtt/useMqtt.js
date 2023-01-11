import { useEffect, useState } from 'react';

export default function setupHooks(client) {
  function useMqtt(alias, defer = false) {
    const [subscription, setSubscription] = useState(() => client.subscribe(alias));

    useEffect(() => {
      if (!defer) {
        subscription.subscribe((message) => {
          setSubscription({ ...subscription, message });
        });
      }
      return () => subscription.unsubscribe();
    }, [alias]);

    /*
    @returns:
    {
      message, publish, subscribe
    }
    */
    return { ...subscription };
  }

  return useMqtt;
}
