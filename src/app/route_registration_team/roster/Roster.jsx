import * as React from 'react';
import {
  StyleLayoutRoster,
  StyleLayoutRosterItem,
  StyleLayoutPlayerWidget,
  StyleLayoutPlayerWidgetItem,
} from './layouts';

const players = [
  {
    username: 'somename',
  },
  {
    username: 'somename',
  },
  {
    username: 'somename',
  },
  {
    username: 'somename',
  },
  {
    username: 'somename',
  },
  {
    username: 'somename',
  },
];

function Roster() {
  return (
    <StyleLayoutRoster>
      {players.map(({username}, i) => (
        <StyleLayoutRosterItem key={i}>
          <StyleLayoutPlayerWidget>
            <StyleLayoutPlayerWidgetItem>{username}</StyleLayoutPlayerWidgetItem>
          </StyleLayoutPlayerWidget>
        </StyleLayoutRosterItem>
      ))}
    </StyleLayoutRoster>
  );
}

export { Roster };
