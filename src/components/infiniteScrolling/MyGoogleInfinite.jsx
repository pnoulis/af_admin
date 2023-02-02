import * as React from "react";
import { fetch } from "/src/lib";
import styled from "styled-components";

const Container = styled.div`
  background-color: green;
  min-height: 20px;
  overflow: scroll;
  max-height: 500px;
  width: 200px;
  margin: auto;
`;

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.target.id === "loader") {
      } else if (entry.target.id === "appender") {
      }
    });
  },
  {
    rootMargin: "0px 0px 200px 0px",
  }
);

function MyGoogleInfinite() {
  return <Container>hello</Container>;
}

export { MyGoogleInfinite };
