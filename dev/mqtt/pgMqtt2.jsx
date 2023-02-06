import * as React from "react";
import styled from "styled-components";
import jsoneditor from "jsoneditor";
import "./json_editor/jsoneditor.min.css";
import { setupClient } from "/src/mqtt/setup2.js";
import { Topics } from "/dummy_backend";
import { NavLink, Outlet } from "react-router-dom";

// const client = setupClient();
// // client.start().on("connect", () => {
//   client.subscribe("/wristband/register", {}, (err, response) => {
//     console.log(err);
//     console.log(response);
//   });
// });
// const server = setupClient("server", undefined, false, true);
// server.start().on("connect", () => {
//   console.log("connected");
//   server.publish("/wristband/register", {});
// });

// function JsonEditor({ json }) {
//   const root = React.useRef(null);
//   const options = {
//     mode: "text",
//   };

//   React.useEffect(() => {
//     const editor = new jsoneditor(root.current, options);
//     editor.set(json);
//     return () => editor.destroy();
//   }, [json]);

//   return <div ref={root}></div>;
// }

const JsonEditor = React.forwardRef(function JsonEditor({ json }, ref) {
  const root = React.useRef(null);
  const options = {
    mode: "text",
  };

  React.useEffect(() => {
    const editor = new jsoneditor(root.current, options);
    if (ref) {
      ref.current = editor;
    }
    editor.set(json);
    return () => editor.destroy();
  }, [json]);

  return <div ref={root}></div>;
});

const StyleMqttPage = styled.div`
  background-color: white;
  padding: 50px 0;

  .menu {
    background-color: transparent;
    display: flex;
    gap: 10px;
    justify-content: center;

    a {
      display: block;
      padding: 10px;
      font-size: 1.2em;
    }

    a:hover {
      background-color: blue;
    }
    a.active {
      color: blue;
    }
  }
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

function Topic({ topic, status, server }) {
  const [pending, setPending] = React.useState(false);
  const [subMsgs, setSubMsgs] = React.useState([]);
  const [pubMsgs, setPubMsgs] = React.useState([]);

  function handlePublish(payload) {
    if (status !== "connected") {
      return;
    }
    setPubMsgs([...pubMsgs, payload]);
    server.publish(topic.pub.alias, payload);
  }
  React.useEffect(() => {
    if (status !== "connected") return;
    if (topic.sub) {
      server.subscribe(topic.sub.alias, (err, message) => {
        if (err) {
          return 0;
        }
        setSubMsgs([...subMsgs, message]);
      });
    }
  }, [status]);

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
  const editorRef = React.useRef(null);
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
        <JsonEditor ref={editorRef} json={payloads[0]?.data} />
      </section>
      <button
        className="publish-button"
        onClick={() => {
          publish(JSON.parse(editorRef.current.getText()));
        }}
      >
        publish
      </button>
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

function MqttClient() {}

const StyleNotification = styled.span`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case "error":
        return "red";
      case "pending":
        return "orange";
      case "connected":
        return "green";
      default:
        return "grey";
    }
  }};
`;

const StyleMqttButton = styled.button`
  padding: 5px 10px;
  border-radius: 6px;
  border: 2px solid black;
  cursor: pointer;
  background-color: ${({ selected }) => selected && "green"};
`;
function MqttServer() {
  const [server, setServer] = React.useState("");
  const [status, setStatus] = React.useState("");
  const serverRef = React.useRef(null);

  React.useEffect(() => {
    if (!server) return;
    serverRef.current = setupClient("server", false, true, server);
    serverRef.current
      .start()
      .on("connect", () => {
        setStatus("connected");
      })
      .on("error", () => {
        setStatus("error");
      })
      .on("close", () => {
        setStatus("");
      });
  }, [server]);

  const handleServerSelection = ({ target }) => {
    serverRef.current?.stop();
    setServer(target.value === server ? "" : target.value);
  };

  return (
    <div>
      <StyleClientSection>
        <StyleMqttButton
          selected={server === "production"}
          value="production"
          onClick={handleServerSelection}
        >
          production server
        </StyleMqttButton>
        <StyleMqttButton
          selected={server === "development"}
          value="development"
          onClick={handleServerSelection}
        >
          dev server
        </StyleMqttButton>
        <StyleMqttButton
          selected={server === "msq"}
          value="msq"
          onClick={handleServerSelection}
        >
          mosquito server
        </StyleMqttButton>
        <StyleNotification status={status} />
      </StyleClientSection>
      <StyleTopicList>
        {server &&
          Topics.toExplorer().map((topic, i) => {
            return (
              <Topic
                key={i}
                topic={topic}
                status={status}
                server={serverRef.current}
              />
            );
          })}
      </StyleTopicList>
    </div>
  );
}

function PgMqtt2() {
  return (
    <StyleMqttPage>
      <ul className="menu">
        <li>
          <NavLink to="/dev/mqtt/client">client</NavLink>
        </li>
        <li>
          <NavLink to="/dev/mqtt/server">server</NavLink>
        </li>
      </ul>
      <section className="workarea">
        <Outlet />
      </section>
      {/* <ClientSection /> */}
      {/* <StyleTopicList> */}
      {/* {Topics.toExplorer().map((topic, i) => { */}
      {/*   return <Topic key={i} topic={topic} />; */}
      {/* })} */}
      {/* </StyleTopicList> */}
    </StyleMqttPage>
  );
}

export { PgMqtt2, MqttClient, MqttServer };
