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
  /* Type */
  display: block;
  box-sizing: border-box;
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding: 50px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemMergeTeam = styled(MergeTeam)``;

const StyleLayoutItemValidateWristband = styled(VerifyWristband)``;

function RouteMerge() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    if (
      state.active?.roster.every(
        (player) => player.wristband?.status === WRISTBAND_STATUS["verified"]
      )
    ) {
      setToggle(true);
    }
  }, [state]);
  return (
    <StyleLayoutRouteMerge>
      {toggle ? (
        <StyleLayoutItemMergeTeam />
      ) : (
        <StyleLayoutItemValidateWristband />
      )}
    </StyleLayoutRouteMerge>
  );
}

export { RouteMerge };
