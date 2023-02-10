import * as React from "react";

const REGISTRATION_SCHEMA = {
  /**
     @value {Object = teams[0]} - The team currently being
     'processed' by the admin.

     When the admin *adds* another team for processing it is
     pushed in the teams[n++] array and made active.

     active = teams[n]
   */
  active: null,
  teams: [
    {
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
      players: [
        {
          username: "", // string
          firstname: "", // string

          /**
             @value {Integer} - Wristband Id
           */
          wristbandNumber: 0,

          /**
             @value {Integer} - A pool of wristband colors
             available to the players.

             0 - green
             1 - yellow
             2 - blue
             3 - red
             4 - pink
             5 - purple
           */
          wristbandColorCode: 0,

          /**
            @value {String} - a wristband is
            first registered, then verified.
           */
          wristbandStatus: "",

          /**
            @value {Boolean} - Maybe not needed.
           */
          wristbandPairing: false,
        },
      ],
      package: {
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
      },
    },
  ],
};
const RegistrationContext = React.createContext({});
const registrationReducer = (state, action) => {
  switch (action.type) {
    case "new_team":
      break;
    case "add_player":
      break;
    case "remove_player":
      break;
    case "pair_wristband": // toggle
      break;
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

const useRegistrationContext = React.useContext(RegistrationContext);
const RegistrationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    registrationReducer,
    REGISTRATION_SCHEMA
  );
  return (
    <RegistrationContext.Provider
      state={{ state, dispatchRegistration: dispatch }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export { useRegistrationContext, RegistrationProvider };
