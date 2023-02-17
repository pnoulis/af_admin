import * as React from "react";
import styled from "styled-components";

const StyleLayoutMergeTeam = styled.div``;
const StyleLayoutItemMergeTeamHeader = styled.header``;
const StyleLayoutItemTeamCreationForm = styled.form``;

function MergeTeam({ className }) {
  return (
    <StyleLayoutMergeTeam className={className}>
      <StyleLayoutItemMergeTeamHeader>
        merge team header
      </StyleLayoutItemMergeTeamHeader>
      <StyleLayoutItemTeamCreationForm />
    </StyleLayoutMergeTeam>
  );
}

export { MergeTeam };
