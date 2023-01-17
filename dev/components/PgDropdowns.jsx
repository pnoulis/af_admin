import React from "react";
import * as Dropdowns from "./dropdowns";
import Component from "./NewComponent";

export default function PgDropdowns() {
  return (
    <React.Fragment>
      {Object.keys(Dropdowns).map((k, i) => {
        const Dropdown = Dropdowns[k];
        return (
          <Component name={`aa${i}`} key={i}>
            <Dropdown />
          </Component>
        );
      })}
    </React.Fragment>
  );
}
