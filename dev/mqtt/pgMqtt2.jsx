import * as React from "react";
import styled from "styled-components";
import serverRoutes from "/dummy_backend";
import jsoneditor from "jsoneditor";
import "./json_editor/jsoneditor.min.css";

function JsonEditor({ json }) {
  const root = React.useRef(null);
  const options = {
    mode: "text",
  };

  React.useEffect(() => {
    const editor = new jsoneditor(root.current, options);
    editor.set(json);
    return () => editor.destroy();
  }, [json]);

  return <div ref={root}></div>;
}

const StyleMqttPage = styled.div`
  background-color: white;
  padding: 50px 0;
`;
const StyleTopicList = styled.ul`
  // background-color: green;
  display: flex;
  flex-flow: column nowrap;
  gap: 50px;
`;
const StyleTopic = styled.li`
  background-color: white;
  border-radius: 25px;
  width: 800px;
  margin: auto;
  box-shadow: 0 0 0.2rem grey;
  padding: 30px 20px;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
`;
const StyleHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  h1 {
    flex: 1;
    font-size: 1.5rem;
    text-align: center;
  }

  .topic-header-info {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
  }

  .pending-alert {
    width: 50px;
    height: 50px;
    background-color: ${({ pending }) => (pending ? "red" : "green")};
    border-radius: 50%;
  }
`;
const StylePubSection = styled.section`
display: flex;
flex-flow: column nowrap;
gap: 20px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: underline;
margin-bottom: 15px;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: underline;
margin-bottom: 15px;
  }

  .topic {
    padding: 3px 10px;
    background-color: #1e90ff;
    border-radius: 6px;
margin-bottom: 5px;
width: max-content;
  }

.publish-button {
width: 100%;
padding: 10px 0;
    background-color: #1e90ff;
border-radius: 6px;
text-align: center;
font-size: 1.5rem;
color: white;
text-transform: capitalize;
cursor: pointer;
}

}
`;
const StyleSubSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 15px;
  }

  .topic {
    padding: 3px 10px;
    background-color: #1e90ff;
    border-radius: 6px;
    margin-bottom: 5px;
    width: max-content;
  }
`;
const StyleSamplePayloadsList = styled.ul`
  li:not(:last-child) {
    margin-bottom: 20px;
  }
`;
const CodeSectionStyle = styled.pre`
  all: revert;
  background-color: var(--grey-1);
  padding: 20px;
  border-radius: 6px;
`;

const StyleLog = styled.ul`
  max-height: 500px;
  overflow: scroll;
  display: flex;
  flex-flow: column nowrap;
  gap: 40px;
  min-height: 100px;
  width: 100%;
  box-shadow: 0 0 0.2rem grey;
`;

const StyleClientSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 100px;

  button {
    padding: 5px 10px;
    border-radius: 6px;
    border: 2px solid black;
    cursor: pointer;
  }

  .connection-status {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: grey;
  }
`;

function Topic({ topic }) {
  const [pending, setPending] = React.useState(false);
  const [subMsgs, setSubMsgs] = React.useState([]);
  const [pubMsgs, setPubMsgs] = React.useState([]);

  function handlePublish() {
    return 0;
  }

  return (
    <StyleTopic>
      <StyleHeader>
        <h1>{topic.summary}</h1>
        <section className="topic-header-info">
          <span className="pending-alert"></span>
          <span>subs: {subMsgs.length}</span>
          <span>pubs: {pubMsgs.length}</span>
        </section>
      </StyleHeader>
      <PubSection
        {...topic.pub}
        pubs={pubMsgs}
        publish={handlePublish}
      ></PubSection>
      <SubSection {...topic.sub} subs={subMsgs}></SubSection>
    </StyleTopic>
  );
}

function PubSection({ topic, alias, payloads, pubs, publish }) {
  return (
    <StylePubSection>
      <header>
        <h1>Publish</h1>
        <div className="topic">{topic}</div>
        <div className="topic">alias: {alias}</div>
      </header>
      <section>
        <h2>Sample payloads</h2>
        <SamplePayloadsList samples={payloads} />
      </section>
      <section>
        <h2>Create payload</h2>
        <JsonEditor json={payloads[0]?.data} />
      </section>
      <button className="publish-button">publish</button>
      <section className="log">
        <h1>Publish logs</h1>
        <Log messages={pubs} />
      </section>
    </StylePubSection>
  );
}

function SamplePayloadsList({ samples = [] }) {
  return (
    <StyleSamplePayloadsList>
      {samples.map((sample, i) => {
        return (
          <li key={i}>
            <CodeSectionStyle>
              // {sample.summary}
              <br />
              {JSON.stringify(samples, null, 2)}
            </CodeSectionStyle>
          </li>
        );
      })}
    </StyleSamplePayloadsList>
  );
}

function Log({ messages }) {
  return (
    <StyleLog>
      {messages.map((message, i) => {
        return (
          <li key={i}>
            <CodeSectionStyle>
              {JSON.stringify(message, null, 2)}
            </CodeSectionStyle>
          </li>
        );
      })}
    </StyleLog>
  );
}

function SubSection({ topic, alias, payloads, subs }) {
  return topic ? (
    <StyleSubSection>
      <header>
        <h1>Subscriptions</h1>
        <div className="topic">{topic}</div>
        <div className="topic">alias: {alias}</div>
      </header>
      <section>
        <h2>Sample payloads</h2>
        <SamplePayloadsList samples={payloads} />
        <section className="log">
          <h1>subscription logs</h1>
          <Log messages={subs} />
        </section>
      </section>
    </StyleSubSection>
  ) : (
    <StyleSubSection>
      <header>
        <h1>No subscription route</h1>
      </header>
    </StyleSubSection>
  );
}

function ClientSection() {
  return (
    <StyleClientSection>
      <button>production client</button>
      <button>dev client</button>
      <button>mosquito client</button>
      <span className="connection-status"></span>
    </StyleClientSection>
  );
}

function PgMqtt2() {
  return (
    <StyleMqttPage>
      <ClientSection />
      <StyleTopicList>
        {serverRoutes.routes.map((topic, i) => {
          return <Topic key={i} topic={topic} />;
        })}
      </StyleTopicList>
    </StyleMqttPage>
  );
}

export { PgMqtt2 };
