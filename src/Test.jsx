import * as React from 'react';
import { useState, useEffect } from 'react';
import GlobalStore from '/src/stores/app.js';
import Mqtt from '/src/mqtt/client.js';
import styled from 'styled-components';

// const client = Mqtt();
// const url = '/themaze/registrationPoint1/gui/player/wristbandScan';
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
const client = Mqtt();

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

function Subscription({topic}) {
  const [ message, setMessage ] = useState('');
  useEffect(() => {
    const unsubscribe = client.subscribe(topic, (msg) => {
      setMessage(msg);
    });
  }, []);
  return (
    <Container>
      <h1>{topic}</h1>
      <div className={"card"}>
        {message}
      </div>
    </Container>
  );
}

export default function Test() {
  const [subscriptions, setSubscriptions] = useState([]);
  let newsub;

  useEffect((e) => {
    client.connect();
  }, []);

  return (
    <React.Fragment>
      <Disconnect>
        Disconnect
      </Disconnect>
      <Disconnect>
        Connection status:
      </Disconnect>
      <Subscribe onSubmit={(e) => {
        e.preventDefault();
        console.log(newsub);
        setSubscriptions([
          newsub,
          ...subscriptions,
        ]);
      }}>
        <p>subscirbe:</p>
        <input type='text' id='subscribe' name='subscibe' onChange={(e) => {
          newsub = e.target.value;
        }}/>
        <input type='submit' value='submit' id='submit'/>
      </Subscribe>
      <SubList>
        {
          subscriptions.map((sub, i) => (
            <Subscription key={i} topic={sub}/>
          ))
        }
      </SubList>
    </React.Fragment>
  );
}

