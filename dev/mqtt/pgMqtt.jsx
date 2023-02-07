import React, { useEffect, useState, useRef, useCallback } from "react";
import jsoneditor from "jsoneditor";
import "./json_editor/jsoneditor.min.css";
import styled from "styled-components";
// import Client from "/src/mqtt";
import { Topics } from "/dummy_backend/mqttRoutes.js";
import { ButtonText } from "/src/components/buttons";

// const { useMqtt, client } = Client;

const server = {
  useMqtt,
  client,
  ...Topics.toServer(),
};

const TopicListStyle = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 800px;
  grid-auto-rows: auto;
  gap: 50px;
  background-color: var(--grey-1);
  justify-content: center;
`;

const TopicStyle = styled.article`
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 30px;
  border-radius: 50px;
  background-color: var(--background-contrast);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/

  .topic-header {
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-family: Roboto;
  }
`;

const PublishSectionStyle = styled.section`
// background-color: white;
// box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
// border-radius: 30px;
// padding: 20px;
display: flex;
flex-flow: column nowrap;
gap: 50px;

.payload-container {
background-color: white;
box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
border-radius: 30px;
padding: 20px;

flex: 1;
display: flex;
flex-flow: column nowrap;
gap: 30px;
}

.payload-header {
display: flex;
flex-flow: row wrap;
align-items: center;
gap: 15px;
}

.payload-summary {
width: 100%;
font-size: 1.5rem;
color: var(--primary-strong);

}

.payload-topic {
flex: 1;
background-color: grey;
max-width: 70%;
padding: 0 25px;
border-radius: 6px;
font-size: 1.2rem;
background-color: var(--grey-1);
height: 60px;
}

.payload-publish {
margin-left: auto;
width: 150px;
aspect-ratio: 1 / 0.4;
border-radius: 6px;
text-align: center;
background-color: blue;
color: white;
font-size: 1.2rem;
cursor: pointer;
}


.payload-editor-container {
display: flex;
flex-flow: row nowrap;
}

.payload-example {
flex: 1 1 50%;
}

.payload-editor {
flex: 1 1 50%;
}
.
`;

const CodeSectionStyle = styled.pre`
  all: revert;
  background-color: var(--grey-1);
  padding: 20px;
  border-radius: 6px;
`;

const SubscribeSectionStyle = styled.section`
  background-color: white;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
  border-radius: 30px;
`;

const Container = styled.div`
  margin-top: 30px;
  padding: 20px;
  font-size: 1.3rem;
  .title {
    padding: 10px 5px;
    background-color: white;
    border-radius: 6px;
  }
  .publish-button {
    display: block;
    padding: 20px;
    background-color: blue;
    cursor: pointer;
  }

  .topic-input {
    padding: 0 5px;
    height: 50px;
    background-color: white;
    width: 100%;
  }

  .editor {
    height: 300px;
  }
`;

function Topic({ topic }) {
  return (
    <TopicStyle>
      <header className="topic-header">{topic.summary}</header>
      <PublishSection {...topic.pub} alias={topic.alias} />
      <SubscribeSection {...topic.sub} />
    </TopicStyle>
  );
}

function makeJsonEditor(json) {
  const options = {
    mode: "text",
  };
}

function JsonEditor({ json }) {
  const root = useRef(null);
  const options = {
    mode: "text",
  };

  useEffect(() => {
    const editor = new jsoneditor(root.current, options);
    editor.set(json);
    return () => editor.destroy();
  }, [json]);

  return <div ref={root}></div>;
}

function filterPayload(payload) {
  return Object.entries(payload).reduce((car, [key, value]) => {
    switch (key) {
      case "summary":
        return car;
      default:
        car[key] = value;
        return car;
    }
  }, {});
}

function PublishSection(props) {
  const [topics, setTopics] = useState(() =>
    props.payloads.map((p) => props.topic)
  );
  const handleTopicChange = useCallback(
    (e, i) => {
      setTopics(topics.map((t, index) => (index === i ? e.target.value : t)));
    },
    [props]
  );

  function handlePublish() {
    console.log(`publish at: ${topics[0]}`);
    server.client.publish(topics[0], {
      name: "pavlos",
    });
  }

  return (
    <PublishSectionStyle className="publish-section">
      {props.payloads.map((payload, i) => {
        return (
          <div key={i} className="payload-container">
            <header className="payload-header">
              <p className="payload-summary">{props.alias}</p>
              <p className="payload-summary">{payload.summary}</p>
              <input
                className="payload-topic"
                value={topics[i]}
                onChange={(e) => handleTopicChange(e, i)}
              />
              <button onClick={handlePublish} className="payload-publish">
                publish
              </button>
            </header>
            <div className="payload-editor-container">
              <section className="payload-example">
                <CodeSectionStyle>
                  {JSON.stringify(payload.data, null, 2)}
                </CodeSectionStyle>
              </section>
              <section className="payload-editor">
                <JsonEditor json={payload.data} />
              </section>
            </div>
          </div>
        );
      })}
    </PublishSectionStyle>
  );
}

function SubscribeSection(props) {
  return (
    <SubscribeSectionStyle className="subscribe-section"></SubscribeSectionStyle>
  );
}

function TopicList() {
  return (
    <TopicListStyle>
      {server.routes.map((topic, i) => {
        return <Topic key={i} topic={topic} />;
      })}
    </TopicListStyle>
  );
}

function EmulateScan() {
  // wristbandId/colorCode
  function emitScan() {
    server.client.publish("/themaze/registration5/emulateScan/30/2", {});
  }
  return (
    <div>
      <ButtonText onClick={emitScan}>emulate scan</ButtonText>
    </div>
  );
}

export default function PgMqtt() {
  return (
    <React.Fragment>
      <EmulateScan />
      <TopicList />
    </React.Fragment>
  );
}
