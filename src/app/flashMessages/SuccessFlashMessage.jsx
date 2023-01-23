import styled from "styled-components";
import FlashMessage from "./FlashMessage";
import { Svg } from "/src/components/svgs";
import { ReactComponent as SuccessIcon } from "/assets/icons/task-success-outlined.svg";

const StyleSuccessFlashMessage = styled(FlashMessage)`
  background-color: var(--success-strong);
`;

function SuccessFlashMessage({ message, ...props }) {
  return (
    <StyleSuccessFlashMessage {...props}>
      <Svg size={1.5} color="white">
        <SuccessIcon />
      </Svg>
      {message.trim().charAt(0).toUpperCase() + message.slice(1)}
    </StyleSuccessFlashMessage>
  );
}
export { SuccessFlashMessage };
