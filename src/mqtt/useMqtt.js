import {useEffect, useState} from 'react';
import {client} from './index.js';

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

function useMqtt2(topic) {
  const [subscription, setSubscription] = useState({
    err: null,
    message: null,
    publish: () => {},
  });

  useEffect(() => {
    const [unsubscribe, publish] = client.subscribe(topic, (message) => {
      setSubscription({err: null, message, publish});
    }, (err) => {
      err && setSubscription({...subscription, err});
    });
  }, [topic]);

  return subscription;
}
