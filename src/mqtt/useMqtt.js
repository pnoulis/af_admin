import { setupMqttProxy } from "./setup2";
import * as React from "react";
// import { useEffect, useState } from 'react';
// export default function setupHooks(client) {
//   function useMqtt(alias, defer = false) {
//     const [subscription, setSubscription] = useState(() => client.subscribe(alias));

//     useEffect(() => {
//       if (!defer) {
//         subscription.subscribe((message) => {
//           setSubscription({ ...subscription, message });
//         });
//       }
//       return () => subscription.unsubscribe();
//     }, [alias]);

//     /*
//     @returns:
//     {
//       message, publish, subscribe
//     }
//     */
//     return { ...subscription };
//   }

//   return useMqtt;
// }

const setupUseMqtt = (client) =>
  function useMqtt(alias) {
    console.log(client);
  };

function useMqtt(proxyOptions = {}) {
  const [proxy, setProxy] = React.useState(() => setupMqttProxy(proxyOptions));

  React.useEffect(() => {
    // proxy.client.start();
    // return () => proxy.client.stop();
  }, [proxy]);

  return proxy;
}

export { setupUseMqtt, useMqtt };
