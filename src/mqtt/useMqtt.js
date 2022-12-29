import {useEffect, useState} from 'react';

export default function useMqtt(topic) {
  const [subscription, setSubscription] = useState({
    publish: () => { },
    message: null,
  });

  useEffect(() => {
    const [unsub, publish] = client.subscribe(topic, (response) => {
      console.log(`response:${response.toString()}`);
      setSubscription({
        publish,
        message: response.toString(),
      });
    });
    return () => {
      console.log('unmounting');
      unsub();
    };
  }, []);

  return [subscription.message, subscription.publish];
}
