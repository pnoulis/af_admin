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

export function useMqtt2(topic) {
  const [subscription, setSubscription] = useState({
    err: null,
    message: null,
    publish: (message, options, cb) => client.publish(topic, message, options, cb),
  });

  useEffect(() => {
    const [unsubscribe, publish] = client.subscribe(topic, (message) => {
      setSubscription({...subscription, err: null, message: message.toString()});
    }, (err) => {
      err && setSubscription({...subscription, err});
    });
    return () => {
      console.log('unmounting');
      unsubscribe();
    }
  }, [topic]);

  return {...subscription}
}
