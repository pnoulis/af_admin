import React from "react";
import * as TextInputs from "./textInputs";
import Component from "./NewComponent";

export default function PgTextInputs() {
  return (
    <React.Fragment>
      {Object.keys(TextInputs).map((k, i) => {
        const TextInput = TextInputs[k];
        return (
          <Component name={`text input ${i}`} key={i}>
            <TextInput />
          </Component>
        );
      })}
    </React.Fragment>
  );
}
