import React from "react";
import * as Layouts from './layouts';
import Component from './NewComponent';

export default function PgLayouts() {
  return (
    <React.Fragment>
      {Object.keys(Layouts).map((k, i) => {
        const Layout = Layouts[k];
        return (
          <Component name={`layout_${i}`} key={i}>
            <Layout />
          </Component>
        );
      })}
    </React.Fragment>
  );
}
