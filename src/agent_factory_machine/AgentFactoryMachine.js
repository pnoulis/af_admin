import { Session } from "./Session.js";
import { Player } from "./Player.js";
import { Team } from "./Team.js";

const AFM_SCHEMA = {
  session: {},
  players: [],
  packages: [],
  coupons: [],
  rooms: [],
  teams: [],
  state: "initializing",
};

const Transitions = {};
Transitions.init = function init() {};
Transitions.shutdown = function shutdown() {};

const States = {};
States.Initializing = function Initializing(afm) {
  this.name = "initializing";
  this.afm = afm;
  this.getState = () => this;
};
States.Initializing.prototype.init = function init() {
  this.afm.data = this.hydrateState(this.afm.data);
  this.registerEventListeners();
  this.afm.setState(this.afm.Online.getState());
};
States.Initializing.prototype.shutdown = function shutdown() {};
States.Initializing.prototype.hydrateState = function hydrateState(state) {
  const hydrated = { ...state };
  hydrated.players = state.players.map(
    (player) => new Player(this.afm, player)
  );
  hydrated.teams = state.teams.map((team) => new Team(this.afm, team));
  return hydrated;
};
States.Initializing.prototype.registerEventListeners =
  function registerEventListeners() {
    function trimState(state) {
      if (!Object.hasOwn(state, "data")) return state;
      const trimmed = {};
      Object.getOwnPropertyNames(state.data).forEach((p) => {
        if (state.data[p] instanceof Array) {
          trimmed[p] = state.data[p].map((member) => trimState(member));
        } else {
          trimmed[p] = state.data[p];
        }
      });
      return trimmed;
    }

    this.afm.addEventListener("E_STATE_CHANGE", (e) => {
      console.log(trimState(e.target));
    });
  };

States.Offline = function Offline(afm) {
  this.name = "offline";
  this.afm = afm;
  this.getState = () => this;
};
States.Offline.prototype.init = function init() {
  console.log("offline state init");
};
States.Offline.prototype.shutdown = function shutdown() {};

States.Online = function Online(afm) {
  this.name = "online";
  this.afm = afm;
  this.getState = () => this;
};
States.Online.prototype.init = function init() {
  console.log("online state init");
};
States.Online.prototype.shutdown = function shutdown() {};

States.Error = function (afm) {
  this.name = "error";
  this.afm = afm;
  this.getState = () => this;
};
States.Error.prototype.init = function error() {
  console.log("error state init");
};
States.Error.prototype.shutdown = function shutdown() {};

class AgentFactoryMachine extends EventTarget {
  constructor(seedState) {
    super();

    this.data = {
      ...AFM_SCHEMA,
      ...seedState,
    };
    this.Session = new Session(this);

    for (let state in States) {
      this[state] = new States[state](this);
    }

    for (let transition in Transitions) {
      this[transition] = () => {
        this.state[transition]();
      };
    }

    this.state = this.Initializing.getState();
  }
}

AgentFactoryMachine.prototype.setState = function setState(state) {
  const transition = `[TRANSITION]:afm ${this.state.name}`;
  this.state = state;
  this.data.state = state.name;
  console.log(transition + ` -> ${this.state.name}`);
};

AgentFactoryMachine.prototype.createTeam = function createTeam(team = {}) {
  const { name } = team;

  if (!name) {
    throw new Error("no name provided");
  }

  // Do not allow two teams with the same name to coexist
  const duplicate = this.data.teams.find((t) => t.data.name === team.name);

  if (duplicate) {
    throw new Error("Team has already been registered");
  } else {
    this.data.teams.push(new Team(this, team));
    console.log(`${name} team created!`);
  }

  this.dispatchEvent(new Event("E_STATE_CHANGE"));
};

AgentFactoryMachine.prototype.removeTeam = function removeTeam(team) {
  const { name } = team;

  if (!name) {
    throw new Error("no name provided");
  }

  // // Check team has actually been initialized
  const initialized = this.data.teams.find((t) => t.data.name === team.name);

  if (!initialized) {
    throw new Error(`${team.name} has not been initialized!`);
  }

  // Archive the team
  initialized.archive();
  this.data.teams = this.data.teams.filter((t) => t.data.name !== team.name);

  this.dispatchEvent(new Event("E_STATE_CHANGE"));
};

export { AgentFactoryMachine };
