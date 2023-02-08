import * as React from "react";
import styled from "styled-components";

const LANG = "en-US";

const StyleLayoutTimeWidget = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  /* Dimensions */
  /* Position */
  /* Fonts */
  color: white;
  /* Effects */
  /* Children */
`;

const StyleLayoutTimeWidgetItemTime = styled.p`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  /* Fonts */
  font-size: 2em;
  letter-spacing: 3px;
  /* Effects */
  /* Children */

  & > i {
    font-weight: light;
    margin: 0 3px;
  }
`;
const StyleLayoutTimeWidgetItemDate = styled.p`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  position: relative;
  top: -3px;
  left: -1px;
  /* Fonts */
  font-size: 0.8em;
  letter-spacing: 0.5px;
  /* Effects */
  transform: translateX(-50%, 50%);
  /* Children */

  & > i {
    margin-right: 5px;
    font-weight: light;
  }
`;

const getTime = (() => {
  let currentLang;
  let locale;
  const time = new Map();
  return (lang) => {
    if (typeof locale === "undefined" || lang !== currentLang) {
      locale = new Intl.DateTimeFormat(lang, {
        month: "short",
        weekday: "short",
        day: "numeric",
        hour: "2-digit",
        second: "2-digit",
        hourCycle: "h24",
      });
    }
    locale.formatToParts().forEach((el) => {
      switch (el.type) {
        case "month":
          return time.set(el.type, el.value);
        case "weekday":
          return time.set(el.type, el.value);
        case "day":
          return time.set(el.type, el.value);
        case "hour":
          return time.set(el.type, el.value);
        case "second":
          return time.set(el.type, el.value);
        default:
          break;
      }
    });
    return Object.fromEntries(time);
  };
})();

function TimeWidget({ lang = LANG }) {
  const [time, setTime] = React.useState(() => getTime(lang));

  React.useEffect(() => {
    const event = setInterval(() => setTime(getTime(lang)), 1000);
    return () => clearInterval(event);
  }, [lang]);

  return (
    <StyleLayoutTimeWidget>
      <StyleLayoutTimeWidgetItemTime>
        {time.hour}:<i>{time.second}</i>
      </StyleLayoutTimeWidgetItemTime>
      <StyleLayoutTimeWidgetItemDate>
        {time.weekday},<i>{time.day}</i>
      </StyleLayoutTimeWidgetItemDate>
    </StyleLayoutTimeWidget>
  );
}

export { TimeWidget };
