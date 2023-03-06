import { Wristband } from "./Wristband.js";

const PLAYER_SCHEMA = {
  username: "",
  firstName: "",
  lastName: "",
  status: "initialized",
  wristband: null,
};

const Transitions = {};
Transitions.register = function register() {};
Transitions.addToRoster = function addToTeam() {};
Transitions.removeFromRoster = function removeFromTeam() {};

const States = {};
States.Initialized = function Initialized(player) {
  this.name = "initialized";
  this.player = player;
  this.getState = () => this;
};
States.Initialized.prototype.register = function register() {};
States.Initialized.prototype.addToRoster = function addToRoster() {};
States.Initialized.prototype.removeFromRoster = function removeFromRoster() {};

States.Registered = function Registered(player) {
  this.name = "registered";
  this.player = player;
  this.getState = () => this;
};
States.Registered.prototype.register = function register() {};
States.Registered.prototype.addToRoster = function addToRoster() {};
States.Registered.prototype.removeFromRoster = function removeFromRoster() {};

States.InRoster = function InRoster(player) {
  this.name = "inRoster";
  this.player = player;
  this.getState = () => this;
};
States.InRoster.prototype.register = function register() {};
States.InRoster.prototype.addToRoster = function addToRoster() {};
States.InRoster.prototype.removeFromRoster = function removeFromRoster() {};

function Player(afm, player = PLAYER_SCHEMA) {
  this.afm = afm;
  this.data = player;
  this.wristband = new Wristband(player.wristband);

  for (let state in States) {
    this[state] = new States[state](this);
  }

  for (let transition in Transitions) {
    this[transition] = () => this.state[transition]();
  }

  this.state = this.Initialized.getState();
  this.data = player;
  this.wristband = new Wristband(player.wristband);
}

export { Player };
