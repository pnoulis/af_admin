import React from "react";
import * as Modals from "./modals";
import Component from "./NewComponent";

export default function PgModals() {
  return (
    <React.Fragment>
      {Object.keys(Modals).map((k, i) => {
        const Modal = Modals[k];
        return (
          <Component key={i} name={`modal_${i}`}>
            <Modal />
          </Component>
        );
      })}
    </React.Fragment>
  );
}
