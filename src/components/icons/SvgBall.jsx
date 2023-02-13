import { Svg } from "./Svg";
import styled from "styled-components";

const SvgBall = styled(Svg)`
  padding: calc(2%);
  background-color: var(--grey-1);
  border-radius: 50%;
  height: ${(props) => (props.size ? props.size + "em" : "1em")};
  width: ${(props) => (props.size ? props.size + "em" : "1em")};
`;

export { SvgBall };
