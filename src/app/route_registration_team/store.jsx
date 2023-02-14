import * as React from "react";
import { registrationTestState } from "./store.test";

const PLAYER_SCHEMA = {
  username: "",
  firstName: "",

  /**
     @value {Integer} - Wristband Id
  */
  wristbandNumber: 0,

  /**
     @value {Integer} - A pool of wristband colors
     available to the players.

     0 - black
     1 - red
     2 - purple
     3 - green
     4 - yellow
     5 - blue
     6 - orange
  */
  wristbandColorCode: 0,

  /**
     @value {String} - a wristband is
     first paired, then registered, then verified.
  */
  wristbandStatus: "",

  /**
     @value {Boolean} - Maybe not needed.
  */
  wristbandPairing: false,
};

const PACKAGE_SCHEMA = {
  id: 0, // id sha256...or whatever
  name: "", // 30 missions
  discountCode: "", // id sha256...or whatever
  discountAmount: "", // % || integer
  costPerPerson: [
    {
      username: "",
      discountCode: "",
      discountAmount: "",
      personCost: 0,
      netPersonCost: 0,
    },
  ],
  packageCost: 0,
  netCost: 0, // Sum of netPersonCost
};

const TEAM_SCHEMA = {
  /**
     @value {String} - sha256...or Whatever
     Not certain if id will be used.
  */
  id: "",

  /**
     @value {String} - The teams name.
     The team name acts as the teams main identifier id.
  */
  name: "",

  /**
     @value {String} - A newly created team finds itself
     in the void status.

     A Team's state is void when:
     1. It is initialized.

     A Team moves to the 'cached' state when:
     1. The team's state is first populated.

     The first change in the teams state sets its status to cached.
     Since the team will be persisted at disk through localStorage
     or sessionStorage.

     An team is removed from the cache when:
     1. The admin logs out.
     2. Admin deletes it on purpose.
     3. cache is cleared from browser.

     Teams which can be trashed from the client are those
     that have yet to be registered and hence not saved to disk.
     If they have been saved to disk, deleting them is the
     responsibility of the backend.

     A Team moves to the 'registered' state when:
     1. It has been merged.

     A Team moves to the 'packaged' state when:
     1. The backend has associated the team with the package.

     A Team moves to the 'playing' state when:
     1. The players have initiated their package.

     Looking ahead we might come across a situation where a player
     can request a pause. It seems like a good idea to make such
     a state available, even if it is never utilized.

     A Team moves to the 'paused' state when:
     1. The user makes such a request.
  */
  status: "",
  roster: [],
};
const REGISTRATION_SCHEMA = {
  /**
     @value {Object = teams[0]} - The team currently being
     'processed' by the admin.

     When the admin *adds* another team for processing it is
     pushed in the teams[n++] array and made active.

     active = teams[n]
   */
  active: null,
  teams: [],
};
const RegistrationContext = React.createContext({});
const registrationReducer = (state, action) => {
  switch (action.type) {
    case "new_team":
      break;
    case "add_player":
      const team = state.active || TEAM_SCHEMA;
      team.roster.push({
        ...PLAYER_SCHEMA,
        username: action.player.username,
        firstName: action.player.firstName,
      });

      if (!team.id) {
        team.id = Math.random().toString(16).slice(2, 12);
        state.teams.push(team);
      }
      return {
        ...state,
        active: team,
      };
    case "remove_player":
      break;
    case "pair_wristband": // thin, toggle
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.username) {
          player.wristbandPairing = action.pairing;
        } else {
          player.wristbandPairing = false;
        }
        return player;
      });
      // state.active?.players.forEach((player) => {
      //   if (player.username === action.username) {
      //     player.wristbandPairing = action.pairing;
      //   } else {
      //     player.wristbandPairing = false;
      //   }
      // });
      return {
        ...state,
      };
    case "unpair_wristband":
      return {
        ...state,
      };
    case "register_wristband":
      break;
    case "verify_wristband":
      break;
    case "merge_team":
      break;
    case "add_package":
      break;
    case "add_package_discount":
      break;
    case "add_player_discount":
      break;
    case "register_package":
      break;
    case "trash_team":
      break;
    default:
      throw new Error(
        `Unrecognized team registration context action type:${action.type}`
      );
  }
};

const useRegistrationContext = () => {
  const context = React.useContext(RegistrationContext);
  if (context == null) {
    throw new Error(
      "A Component is not being provided the Registration Context"
    );
  }
  return context;
};
const RegistrationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    registrationReducer,
    registrationTestState[1]()
  );
  return (
    <RegistrationContext.Provider
      value={{ state, dispatchRegistration: dispatch }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export { useRegistrationContext, RegistrationProvider };
