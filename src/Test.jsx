import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactClient from "react-dom/client";
import * as ReactServer from "react-dom/server";
import styled from "styled-components";
import { FlashMessage } from "/src/flash_messages_2";
import { Card_0 } from "/src/components/cards/";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
`;

const MyCard = styled("div")`
  width: 1500px;
  height: 800px;

  border-radius: 11px;
  // background-color: var(--background-contrast-2);
  background-color: white;
  // box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.1);
  // box-shadow: var(--card-basic-shadow);
  box-shadow: 5px -5px 50px rgba(0, 0, 0, 0.1), -1px 1px 50px rgba(0, 0, 0, 0.1);
  // box-shadow: var(--card-basic-shadow);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const MyCard2 = styled(Card_0)`
  width: 200px;
  height: 300px;
  background: var(--background-contrast-2);
  // box-shadow: 5px -5px 15px rgba(0, 0, 0, 0.1), -1px 1px 4px rgba(0, 0, 0, 0.2);
  box-shadow: var(--card-basic-shadow-2);
`;

const Cont = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

const MyDialog = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 350px;
  height: max-content;
  justify-content: center;
  gap: 40px;
`;
const DialogTitle = styled.p`
  font-family: NoirPro-Bold;
  text-align: center;
  // color: var(--primary-strong);
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 3px;
  margin-top: 30px;
`;

function SomeComp() {
  return <p onClick={() => alert("hello")}>hello some comp flash message</p>;
}

function Test() {
  const myRef = React.useRef(null);

  return (
    <React.Fragment>
      <Container ref={myRef}>
        <MyCard>
          <button
            onClick={() => {
              FlashMessage.info("yolo", {});
            }}
          >
            create flashMessage
          </button>
          <div id="fm-root"></div>
        </MyCard>
      </Container>
      <Cont></Cont>
    </React.Fragment>
  );
}

const testRoutes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export { testRoutes };
