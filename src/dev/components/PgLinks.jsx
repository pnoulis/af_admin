import React from "react";
import * as Links from './links';
import Component from './NewComponent';

export default function PgLinks() {
  return (
    <React.Fragment>
      {Object.keys(Links).map((k, i) => {
        const Link = Links[k];
        return (
          <Component name={`link_${i}`} key={i}>
            <Link />
          </Component>
        );
      })}
    </React.Fragment>
  );
}
