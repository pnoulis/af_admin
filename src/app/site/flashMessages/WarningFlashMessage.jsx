import styled from "styled-components";
import FlashMessage from "./FlashMessage";
import { Svg } from "/src/components/svgs";
import { ReactComponent as WarningIcon } from "/assets/icons/warning-outlined.svg";

const StyleWarningFlashMessage = styled(FlashMessage)`
  background-color: var(--warn);
`;

function WarningFlashMessage({ message, ...props }) {
  return (
    <StyleWarningFlashMessage {...props}>
      <Svg size={1.5} color="white">
        <WarningIcon />
      </Svg>
      {message.trim().charAt(0).toUpperCase() + message.slice(1)}
    </StyleWarningFlashMessage>
  );
}

export { WarningFlashMessage };
