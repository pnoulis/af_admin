import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import GlobalStore from '/src/stores/app.js';
import Mqtt from '/src/mqtt/client2.js';

import styled from 'styled-components';
const url = '/themaze/registrationPoint1/gui/player/wristbandScan';
const client = new Mqtt();
// client.server.on('connect', () => {
//   console.log(`mqtt client connected`);
//   const [unsub, pub] = client.subscribe(url, (message) => {
//     console.log(message.toString());
//     pub('THis is a fucking response');
//     unsub();
//   })
// })

function useMqtt(topic) {
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

// client.server.on('connect', () => {
//   console.log('connected');
//   client.server.subscribe(url, (err) => {
//     console.log(err)
//     client.server.on('message', (topic, message) => {
//       console.log(topic, message);
//     })
//   });
// })
// const [unsub, pub] = client.subscribe('connect', (message) => {
//   console.log(`arrived:${message}`)
//   const [unsubscribe, pub] = client.subscribe(url, (me) => {
//     console.log(me);
//   })
// });

// const client = Mqtt();/themaze/registrationPoint1/gui/player/wristbandScan
// const unsubscribe1 = client.subscribe(url, (data) => console.log("run 1", data));
// const unsubscribe2 = client.subscribe(url, (data) => console.log("run 2", data));

// class MqttServer extends EventTarget {
//   constructor() {
//     super();
//     this.name = 'message';
//   }
//   emit(topic, message) {
//     this.dispatchEvent(new CustomEvent(this.name), {topic, message});
//   }
//   on(event, handler) {
//     this.addEventListener(this.name, handler);
//   }
// }

// client.connect().on('connect', () => console.log('Mqtt connected'));
// client.server.on('message', (url, message) => {
//   console.log(message)
// });

const Subscribe = styled.form`
padding: 15px;
display: flex;
flex-flow: row nowrap;
justify-content: stretch;
gap: 30px;
align-items: center;

#subscribe {
min-height: 50px;
flex: 1;
background-color: rgba(160, 169, 200, 1);
padding: 3px 10px;
}

#submit {
min-height: 50px;
text-align: center;
flex: 0;
min-width: 100px;
padding: 10px 5px;
background-color: cyan;
color: black;
border-radius: 7px;
cursor: pointer;
}

`;

const Disconnect = styled.div`
text-align: center;
min-width: 50px;
padding: 10px 5px;
background-color: cyan;
margin: 20px 5px;
border-radius: 7px;
cursor: pointer;
`;

const SubList = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-auto-rows: auto;
padding: 30px 40px;
`;

const Container = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: center;
`;

// function Test() {
//   const [connected, setConnected] = useState(false)
//   const [subscriptions, setSubscriptions] = useState([]);
//   let newsub;

//   useEffect(() => {
//     console.log('greetings');
//     console.log(client.subscribe3('some,event', () => { }, () => { }));
//   }, [])


//   return (
//     <React.Fragment>
//       <Disconnect onClick={() => {
//         if (connected) {
//           client.disconnect();
//           setConnected(false);
//         } else {
//           console.log(client.options);
//           console.log(client.host);
//           client.connect().on('connect', () => {
//             console.log('connected');
//             client.server.subscribe(url, (err) => {
//               if (!err) {
//                 console.log(`Subscribed to ${url}`);
//               }
//             })
//             client.server.on('message', (topic, message) => {
//               console.log(topic);
//               console.log(message);
//             })
//           }).on('error', (e) => {
//             console.log(e);
//           })
//         }
//       }}>
//         {connected ? 'Disconnect' : 'Connect'}
//       </Disconnect>
//       <Subscribe onSubmit={(e) => {
//         e.preventDefault();
//         console.log(newsub);
//         setSubscriptions([
//           newsub,
//           ...subscriptions,
//         ]);
//       }}>
//         <p>subscirbe:</p>
//         <input type='text' id='subscribe' name='subscibe' onChange={(e) => {
//           newsub = e.target.value;
//         }} />
//         <input type='submit' value='submit' id='submit' />
//       </Subscribe>
//       <SubList>
//         {
//           subscriptions.map((sub, i) => (
//             <Subscription key={i} topic={sub} />
//           ))
//         }
//       </SubList>
//     </React.Fragment>
//   );
// }

// function Subscription( topic ) {
//   const [message, setMessage] = useState('');
//   const unsubscribe = useRef();

//   useEffect(() => {
//     console.log(topic)
//     if (!unsubscribe) {
//       unsubscribe.current = client.subscribe(topic, (msg) => {
//         console.log('from the subscirption')
//         console.log(msg);
//         setMessage("#" + msg + Math.random());
//       })
//     }
//   }, []);
//   useEffect(() => {
//     console.log('new message came in');
//   }, [message])
//   return (
//     <Container>
//       <h1>{topic}</h1>
//       <h2 onClick={() => unsubscribe.current()}>unsubscribe</h2>
//       <div className={"card"}>
//         {message}
//       </div>
//     </Container>
//   );
// }


export default function Test2() {
  const [show, setShow] = useState(true);
  const [color, setColor] = useState('blue');

  useEffect(() => {
    if (!show) location.reload();
  }, [])
  return (
    <React.Fragment>
      <h1 onClick={() => setShow(!show)} style={{ backgroundColor: color }}>
        {show ? "UNMOUNT" : "MOUNT"}
      </h1>
      {show ? <Ch /> : null}
      <Change color={color} setColor={setColor} />
    </React.Fragment>
  );
}

function Ch() {
  const [message, publish] = useMqtt(url);
  return (
    <React.Fragment>
      <p>{message}</p>
      <p>tohuneth</p>

    </React.Fragment>
  );

}

function Change({ color, setColor }) {
  return (
    <p onClick={() => {
      if (color === 'blue') {
        setColor('red');
      } else {
        setColor('blue');
      }
    }}>change color</p>
  );
}
