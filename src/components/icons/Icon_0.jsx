import React, {
  useEffect,
  useState,
  useRef,
  Children,
  forwardRef,
  useMemo,
} from "react";
import styled from "styled-components";

const Icon_0 = styled.span`
  svg {
    display: inline-block;
    box-sizing: border-box;
    height: ${(props) => (props.size ? props.size + "em" : "1em")};
    width: ${(props) => (props.size ? props.size + "em" : "1em")};
    padding: calc(1%);
    background-color: var(--grey-1);
    border-radius: 50%;
  }
`;

export { Icon_0 };
