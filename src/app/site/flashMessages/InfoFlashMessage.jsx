import styled from "styled-components";
import FlashMessage from "./FlashMessage";
import { Svg } from "/src/components/svgs";
import { ReactComponent as InfoIcon } from "/assets/icons/info-outlined.svg";

const StyleInfoFlashMessage = styled(FlashMessage)`
  background-color: var(--info);
margin-bottom: 20px;
`;

const StyleMessage = styled.p`
flex: 1;
text-align: center;
`

function InfoFlashMessage({ message, ...props }) {
  return (
    <StyleInfoFlashMessage {...props}>
      <Svg size={1.5} color="white">
        <InfoIcon />
      </Svg>
      <StyleMessage>
        {message.trim().charAt(0).toUpperCase() + message.slice(1)}
      </StyleMessage>
    </StyleInfoFlashMessage>
  );
}

export { InfoFlashMessage };
