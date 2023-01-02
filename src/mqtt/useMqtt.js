import { useEffect, useState } from 'react';

export default function setupHooks(client) {
  function useMqtt(alias, defer = false) {
    const [subscription, setSubscription] = useState({});
    useEffect(() => {
      const [unsubscribe, publish, subscribe] = client.subscribe(alias)

      if (defer) {
        setSubscription({ publish, subscribe });
      } else {
        subscribe((message) => {
          setSubscription({ message, ...subscription })
        })
      }
      return () => unsubscribe();
    }, [alias])

    return { ...subscription };
  }

  return useMqtt;
}
