import * as React from "react";
import { registrationTestState } from "./store.test";

const WRISTBAND_STATUS = {
  paired: 1,
  registered: 2,
  verified: 3,
};

const WRISTBAND_COLOR_CODES = [
  "black",
  "red",
  "purple",
  "green",
  "yellow",
  "blue",
  "orange",
];

const WRISTBAND_SCHEMA = {
  /**
    @value {Integer} - Wristband Id
 */
  number: 0,

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
  colorCode: null,

  /**
     @value {String} - a wristband is
     first paired, then registered, then verified.
     0 - null
     1 - paired
     2 - registered
     3 - verified
  */
  status: 0,

  /**
     @value {Boolean} - Maybe not needed.
  */
  pairing: false,
};

const PLAYER_SCHEMA = {
  assigned: false,
  username: "",
  firstName: "",
  wristband: WRISTBAND_SCHEMA,
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
  roster: [
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
  ],
};
const REGISTRATION_SCHEMA = {
  /**
     @value {Object = teams[0]} - The team currently being
     'processed' by the admin.

     When the admin *adds* another team for processing it is
     pushed in the teams[n++] array and made active.

     active = teams[n]
   */
  active: TEAM_SCHEMA,
  teams: [],
};
const RegistrationContext = React.createContext({});
const registrationReducer = (state, action) => {
  switch (action.type) {
    case "new_team":
      break;
    case "add_player":
      const team = state.active || TEAM_SCHEMA;
      let assigned = false;
      team.roster = team.roster.map((player) => {
        if (!player.assigned && !assigned) {
          assigned = true;
          return {
            ...PLAYER_SCHEMA,
            username: action.player.username,
            firstName: action.player.firstName,
            assigned: true,
          };
        }
        return player;
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
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          return PLAYER_SCHEMA;
        }
        return player;
      });
      return {
        ...state,
      };
    case "pair_wristband": // thin, toggle
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          if (action.wristband) {
            player.wristband = {
              ...action.wristband,
              status: WRISTBAND_STATUS["paired"],
              pairing: false,
            };
          } else {
            player.wristband = {
              ...WRISTBAND_SCHEMA,
              pairing: action.pairing,
            };
          }
        } else {
          player.wristband.pairing = false;
        }
        return player;
      });
      return {
        ...state,
      };
    case "register_wristband":
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          player.wristband.status = WRISTBAND_STATUS["registered"];
        }
        return player;
      });
      return {
        ...state,
      };
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
    REGISTRATION_SCHEMA
    // registrationTestState[1]()
  );

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <RegistrationContext.Provider
      value={{ state, dispatchRegistration: dispatch }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export { useRegistrationContext, RegistrationProvider, WRISTBAND_STATUS };
