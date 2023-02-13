import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { Card_0 } from "/src/components/cards/";
import { BasicDialog, SaveTeamDialog } from "/src/components/dialogs";
import { useFlashMessage } from "/src/flash_messages";
import { ButtonText, ButtonTextBasic } from "/src/components/buttons";
import {
  Roster,
  PlayerActionbar,
  PlayerActionbarItemRosterRemove,
  PlayerActionbarItemWristbandPair,
  PlayerActionbarItemDiscount,
  PlayerActionbarItemPrice,
  PlayerWidget,
  PlayerRoster,
  PlayerRosterPackage,
  PlayerWidgetMerge,
  PlayerRosterMerge,
} from "/src/app/route_registration_team/roster";

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

const players = [
  {
    username: "somename",
  },
  {
    username: "somename",
  },
  {
    username: "somename",
  },
  {
    username: "somename",
  },
  {
    username: "somename",
  },
  {
    username: "somename",
  },
];

function Test() {
  const myRef = React.useRef(null);
  const [dial, setDial] = React.useState(false);
  const [fm, createFm] = useFlashMessage();

  return (
    <React.Fragment>
      <Container ref={myRef}>
        <button
          onClick={() => {
            createFm(<p>toehuneothu</p>);
          }}
        >
          show dialog
        </button>
        <MyCard>
          {/* <PlayerWidget/> */}
          {/* <MyCard2>yo</MyCard2> */}
          <PlayerRoster />
          <PlayerRosterPackage />
          <PlayerRosterMerge />
          <SaveTeamDialog />
        </MyCard>
        {fm()}
      </Container>
      <Cont>
        {/* <PlayerActionbarItemRosterRemove/> */}
        {/* <PlayerActionbarItemWristbandPair/> */}
        {/* <PlayerActionbarItemDiscount/> */}
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
