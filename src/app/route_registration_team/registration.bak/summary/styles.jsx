import styled from "styled-components";
import { StylePanelMain } from "/src/components/layouts";

const StyleSummary = styled(StylePanelMain)`
  display: grid;
  // Contents
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "Players Package";
`;

export { StyleSummary };
