import styled from "styled-components";
import { SvgBall } from "./SvgBall";

const SvgButton = styled(SvgBall)`
  cursor: pointer;
  &:hover {
    // background-color: var(--primary-medium);
    opacity: 0.8;
  }
`;

export { SvgButton };
