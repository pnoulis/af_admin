import * as React from "react";
import styled from "styled-components";
import { MergeTeam } from "./merge_team";
import { VerifyWristband } from "./verify_wristband";
import {
  useRegistrationContext,
  WRISTBAND_STATUS,
} from "/src/app/route_registration_team";

const StyleLayoutRouteMerge = styled.div`
  all: unset;
  box-sizing: border-box;
  /* Type */
  display: flex;
  align-items: center;
  /* Dimensions */
  padding-top: 100px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemMergeTeam = styled(MergeTeam)``;

const StyleLayoutItemVerifyWristbands = styled(VerifyWristband)`
flex: 1;
`;

function RouteMerge() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const [toggle, setToggle] = React.useState(false);

  const handleToggleMergeTeam = () => {
    setToggle(true);
  }


  return (
    <StyleLayoutRouteMerge>
      {toggle ? (
        <StyleLayoutItemMergeTeam />
      ) : (
        <StyleLayoutItemVerifyWristbands onVerifiedWristbands={handleToggleMergeTeam}/>
      )}
    </StyleLayoutRouteMerge>
  );
}

export { RouteMerge };
