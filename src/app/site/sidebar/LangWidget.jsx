import styled from "styled-components";

const langs = ["eng", "fr", "de", "nl"];

const StyleLayoutLangWidget = styled.ul`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  /* Dimensions */
  /* Position */
  /* Fonts */
  font-size: 1em;
  line-height: 0.9;
  letter-spacing: 1.5px;
  // color: grey;
  /* Effects */
  list-style: none;
  /* Children */
`;

const StyleLayoutLangWidgetItemLang = styled.li`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  /* Fonts */
  color: grey;
  /* Effects */
  cursor: pointer;

  &:hover {
    color: white;
  }

  /* Children */
  &:not(:last-of-type) em::after {
    color: grey;
    content: "|";
    margin: 0 4px;
    position: relative;
  }
`;

function LangWidget() {
  return (
    <StyleLayoutLangWidget>
      {langs.map((lang, i) => (
        <StyleLayoutLangWidgetItemLang key={i}>
          <em>{lang}</em>
        </StyleLayoutLangWidgetItemLang>
      ))}
    </StyleLayoutLangWidget>
  );
}

export { LangWidget };
