import * as React from "react";
import styled from "styled-components";

const StyleTeamStatusWidget = styled.div`
  all: unset;
  /* Type */
  display: flex;
  box-sizing: border-box;
  flex-flow: row nowrap;
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  gap: 10px;
  /* Position */
  /* Fonts */
  /* Effects */
  background-color: red;
  /* Children */

  .status-selectbox {
    flex: 80%;
    background-color: green;
  }
  .status-indicator {
    flex: 20%;
    background-color: red;
  }
`;

const StyleIndicator = styled.div`
  all: unset;
  /* Type */
  display: block;
  box-sizing: border-box;
  /* Dimensions */
  width: 100%;
  height: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  background-color: red;
  /* Children */
`;

function TeamStatusWidget({ team }) {
  return (
    <div>
      <section className="status-selectbox"></section>
      <section className="status-indicator">
        <StyleIndicator playing={team.status === "PACKAGE_RUNNING"} />
      </section>
    </div>
  );
}

export { TeamStatusWidget };
