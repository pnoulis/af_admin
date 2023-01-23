import styled from "styled-components";
import FlashMessage from "./FlashMessage";
import { Svg } from "/src/components/svgs";
import { ReactComponent as ErrorIcon } from "/assets/icons/error-outlined.svg";

const StyleErrorFlashMessage = styled(FlashMessage)`
  background-color: var(--error-2);
`;

function ErrorFlashMessage({ message, ...props }) {
  return (
    <StyleErrorFlashMessage {...props}>
      <Svg size={1.5} color="white">
        <ErrorIcon />
      </Svg>
      {message.trim().charAt(0).toUpperCase() + message.slice(1)}
    </StyleErrorFlashMessage>
  );
}

export { ErrorFlashMessage };
