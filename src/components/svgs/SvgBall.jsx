import styled from "styled-components";
import { Svg } from "./Svg";

const SvgWrapper = styled.span`
  display: flex;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size || "30px"};
  height: ${({ size }) => size || "30px"};
  padding: 6px;
  border-radius: 50%;
  background-color: var(--grey-1);
`;

function SvgBall({ className, size, svgSize, children, ...props }) {
  return (
    <SvgWrapper className={className} size={size} {...props}>
      <Svg size={svgSize || "80%"} color={props.color}>
        {children}
      </Svg>
    </SvgWrapper>
  );
}

export { SvgBall };
