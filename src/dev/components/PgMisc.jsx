import React from 'react';
import * as Miscellaneous from './misc';
import Component from './NewComponent';

export default function PgMisc() {
  return (
    <React.Fragment>
      {Object.keys(Miscellaneous).map((k, i) => {
        const Misc = Miscellaneous[k];
        return (
          <Component key={i} name={`misc_${i}`}>
            <Misc/>
          </Component>
        );
      })}
    </React.Fragment>
  );
}
