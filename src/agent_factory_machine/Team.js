const TEAM_STATUS = {
  initialized: 0,
  registered: 1,
  playing: 2,
  paused: 3,
  archived: 4,
};

const TEAM_SCHEMA = {
  id: "",
  name: "",
  status: TEAM_STATUS["initialized"],
  packages: [],
  roster: [],
};

const Transitions = {};
Transitions.register = function register() {};
Transitions.play = function play() {};
Transitions.pause = function pause() {};
Transitions.resume = function resume() {};
Transitions.archive = function archive() {};

const States = {};
States.Initialized = function Initialized(team) {
  this.name = "initialized";
  this.team = team;
  this.getState = () => this;
};
States.Initialized.prototype.register = function register() {};
States.Initialized.prototype.play = function play() {};
States.Initialized.prototype.pause = function pause() {};
States.Initialized.prototype.resume = function resume() {};
States.Initialized.prototype.archive = function archive() {
  this.team.state = this.team.Archived.getState();
};

States.Registered = function Registered(team) {
  this.name = "registered";
  this.team = team;
  this.getState = () => this;
};
States.Registered.prototype.play = function play() {};
States.Registered.prototype.pause = function pause() {};
States.Registered.prototype.resume = function resume() {};
States.Registered.prototype.archive = function archive() {};

States.Playing = function Playing(team) {
  this.name = "playing";
  this.team = team;
  this.getState = () => this;
};
States.Playing.prototype.play = function play() {};
States.Playing.prototype.pause = function pause() {};
States.Playing.prototype.resume = function resume() {};
States.Playing.prototype.archive = function archive() {};

States.Paused = function Paused(team) {
  this.name = "paused";
  this.team = team;
  this.getState = () => this;
};
States.Paused.prototype.play = function play() {};
States.Paused.prototype.pause = function pause() {};
States.Paused.prototype.resume = function resume() {};
States.Paused.prototype.archive = function archive() {};

States.Archived = function Archived(team) {
  this.name = "archived";
  this.team = team;
  this.getState = () => this;
};
States.Archived.prototype.play = function play() {};
States.Archived.prototype.pause = function pause() {};
States.Archived.prototype.resume = function resume() {};
States.Archived.prototype.archive = function archive() {};

States.Error = function (team) {
  this.name = "error";
  this.team = team;
  this.getState = () => this;
};
States.Error.prototype.play = function play() {};
States.Error.prototype.pause = function pause() {};
States.Error.prototype.resume = function resume() {};
States.Error.prototype.archive = function archive() {};

function Team(afm, team) {
  this.afm = afm;
  this.data = {
    ...TEAM_SCHEMA,
    ...team,
  };

  for (let state in States) {
    this[state] = new States[state](this);
  }

  for (let transition in Transitions) {
    this[transition] = () => this.state[transition]();
  }

  this.state = this.Initialized.getState();
}

export { Team };
