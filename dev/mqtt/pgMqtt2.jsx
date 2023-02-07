import * as React from "react";
import styled from "styled-components";
import jsoneditor from "jsoneditor";
import "./json_editor/jsoneditor.min.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  StyleMqttPage,
  StyleTopicList,
  StyleTopic,
  StyleHeader,
  StylePubSection,
  StyleLog,
  CodeSectionStyle,
  StyleSamplePayloadsList,
  StyleSubSection,
} from "./styles";
import { setupMqttProxy } from "/src/mqtt";

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

function Topic({ topic, status, setStatus, connection }) {
  const [subMsgs, setSubMsgs] = React.useState([]);
  const [pubMsgs, setPubMsgs] = React.useState([]);

  function handlePublish(payload) {
    if (status !== "connected") {
      return;
    }
    setPubMsgs([...pubMsgs, payload]);
    connection.publish(topic.pub.alias, payload);
  }

  React.useEffect(() => {
    if (status !== "connected") {
      return;
    }

    let unsub = () => {};
    if (topic.sub) {
      unsub = connection.subscribe(topic.sub.alias, (err, message) => {
        if (err) {
          return;
        }
        setSubMsgs([...subMsgs, message]);
      });
    }

    return () => unsub();
  }, [status]);

  return (
    <StyleTopic>
      <StyleHeader>
        <h1>{topic.summary}</h1>
        <section className="topic-header-info">
          <StyleNotification status={status} />
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

function PubSection({ topic, alias, payloads = [], pubs, publish }) {
  const editorRef = React.useRef(null);
  return (
    <StylePubSection>
      <header>
        <h1>Publish</h1>
        <div className="topic">{topic || "no publish topic available"}</div>
        <div className="topic">alias: {alias}</div>
      </header>
      <section>
        <h2>Sample payloads</h2>
        <SamplePayloadsList samples={payloads} />
      </section>
      <section>
        <h2>Create payload</h2>
        <JsonEditor
          ref={editorRef}
          json={payloads.length > 0 ? payloads[0].data : {}}
        />
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
              {JSON.stringify(sample, null, 2)}
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

const StyleNotification = styled.span`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case "error":
        return "orange";
      case "disconnected":
        return "red";
      case "pending":
        return "blue";
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

function MqttProxy({ type }) {
  const { proxy, setStatus, status, conf } = useMqttContext();
  const connection = React.useRef(null);
  const [topics, setTopics] = React.useState([]);

  React.useEffect(() => {
    connection.current?.stop();
    connection.current = null;

    if (!proxy) {
      return setStatus("");
    }

    if (type === "server") {
      connection.current = proxy.server;
      setTopics(proxy.explorer.toExplorerServer());
    } else if (type === "client") {
      connection.current = proxy.client;
      setTopics(proxy.explorer.toExplorerClient());
    } else {
      throw new Error(`Unrecognized proxy type:${type}`);
    }

    connection.current
      .start()
      .on("connect", () => {
        setStatus("connected");
      })
      .on("error", () => {
        setStatus("disconnected");
      });

    return () => {
      connection.current?.stop();
      connection.current = null;
    };
  }, [conf, type]);

  return (
    <div>
      <StyleTopicList>
        {status === "connected" &&
          topics.map((topic, i) => {
            return (
              <Topic
                key={i}
                status={status}
                topic={topic}
                connection={connection.current}
                setStatus={setStatus}
              />
            );
          })}
      </StyleTopicList>
    </div>
  );
}

const MqttContext = React.createContext(null);
const useMqttContext = () => {
  const context = React.useContext(MqttContext);
  if (context == null) {
    throw new Error(`Mqtt Components must be wraped in <Mqtt/>'`);
  }
  return context;
};

function PgMqtt2() {
  const [conf, setConf] = React.useState("");
  const [status, setStatus] = React.useState("");
  const proxy = React.useRef(null);

  return (
    <MqttContext.Provider
      value={{ proxy: proxy.current, status, setStatus, conf }}
    >
      <StyleMqttPage>
        <ul className="menu">
          <li>
            <NavLink to="/dev/mqtt/client">client</NavLink>
          </li>
          <li>
            <NavLink to="/dev/mqtt/server">server</NavLink>
          </li>
          <li>
            <StyleMqttButton
              onClick={() => {
                proxy.current = new setupMqttProxy({
                  name: "explorer",
                  registry: {
                    params: {
                      clientId: "static",
                    },
                  },
                });
                setConf("dev");
              }}
              selected={conf === "dev"}
              value="dev"
            >
              dev config
            </StyleMqttButton>
          </li>

          <li>
            <StyleMqttButton
              onClick={() => {
                proxy.current = new setupMqttProxy({
                  name: "explorer",
                  registry: {
                    params: {
                      clientId: "static",
                    },
                  },
                });
                setConf("msq");
              }}
              selected={conf === "msq"}
              value="msq"
            >
              mosquito config
            </StyleMqttButton>
          </li>
          <li>
            <StyleNotification status={status} />
          </li>
        </ul>
        <hr />

        <section className="workarea">
          <Outlet />
        </section>
      </StyleMqttPage>
    </MqttContext.Provider>
  );
}

export { PgMqtt2, MqttProxy };
