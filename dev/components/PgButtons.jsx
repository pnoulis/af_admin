import React from "react";
import * as Buttons from './buttons';
import Component from './NewComponent';

export default function PgButtons() {
  return (
    <React.Fragment>
      {Object.keys(Buttons).map((k, i) => {
        const Button = Buttons[k];
        return (
          <Component name={`button_${i}`} key={i}>
            <Button />
          </Component>
        );
      })}
    </React.Fragment>
  );
}
