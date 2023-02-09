import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
// import { setupMqttProxy } from "/src/mqtt";
import { Card_0 } from "/src/components/cards/";
import { useFlashMessage } from "/src/flash_messages";

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

// function FlashMessagesPortal({ children }) {
//   return children
//     ? ReactDOM.createPortal(
//         children,
//         document.getElementById("flash-messages-portal")
//       )
//     : null;
// }

// function useFlashMessages() {
//   const [fm, setFm] = React.useState(() => () => null);

//   const createFm = React.useCallback((customFm, options) => {
//     options = options || customFm;

//     switch (options?.type) {
//       default:
//         if (!React.isValidElement(customFm)) {
//           throw new Error("Custom flash message in not a valid React element");
//         }
//         setFm(() => () => (
//           <FlashMessagesPortal>{customFm}</FlashMessagesPortal>
//         ));
//     }
//   }, []);
//   return [fm, createFm];
// }

function Fmcompo() {
  const [getFm, createFm] = useFlashMessage();

  React.useEffect(() => {
    console.log("get fm changed");
  }, [getFm]);
  return (
    <div>
      <button
        onClick={() => {
          console.log("will create flash message");
          createFm({ type: "info", message: "yolo" });
        }}
      >
        create flash message
      </button>
      {getFm()}
      {getFm()}
    </div>
  );
}

function Test() {
  const myRef = React.useRef(null);
  return (
    <React.Fragment>
      <Container ref={myRef}>
        <button
          onClick={() => {
            console.log(myRef.current);
          }}
        >
          Test document node
        </button>
        <MyCard>
          <MyCard2>yo</MyCard2>
        </MyCard>
      </Container>
      <Cont>
        <Fmcompo />
      </Cont>
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
