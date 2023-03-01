const Transitions = {};
Transitions.init = function init() {};
Transitions.shutdown = function shutdown() {};
Transitions.pause = function pause() {};
Transitions.resume = function resume() {};

const States = {};
States.Initializing = function Initializing(afm) {
  this.name = "initializing";
  this.afm = afm;
  this.getState = () => this;
};
States.Initializing.prototype.getState = function getState() {
  return this;
};
States.Initializing.prototype.init = function init() {};
States.Initializing.prototype.shutdown = function shutdown() {};
States.Initializing.prototype.pause = function pause() {};
States.Initializing.prototype.resume = function resume() {};

States.Live = function Live(afm) {
  this.name = "live";
  this.afm = afm;
  this.getState = () => this;
};
States.Live.prototype.init = function init() {};
States.Live.prototype.shutdown = function shutdown() {};
States.Live.prototype.pause = function pause() {};
States.Live.prototype.resume = function resume() {};

States.Halted = function Halted(afm) {
  this.name = "halted";
  this.afm = afm;
  this.getState = () => this;
};
States.Halted.prototype.init = function init() {};
States.Halted.prototype.shutdown = function shutdown() {};
States.Halted.prototype.pause = function pause() {};
States.Halted.prototype.resume = function resume() {};

States.Archived = function Archived(afm) {
  this.name = "archived";
  this.afm = afm;
  this.getState = () => this;
};
States.Archived.prototype.init = function init() {};
States.Archived.prototype.shutdown = function shutdown() {};
States.Archived.prototype.pause = function pause() {};
States.Archived.prototype.resume = function resume() {};

States.Error = function (afm) {
  this.name = "error";
  this.afm = afm;
  this.getState = () => this;
};
States.Error.prototype.init = function init() {};
States.Error.prototype.shutdown = function shutdown() {};
States.Error.prototype.pause = function pause() {};
States.Error.prototype.resume = function resume() {};

function Session(afm) {
  for (let state in States) {
    this[state] = new States[state](this);
  }

  for (let transition in Transitions) {
    this[transition] = () => this.state[transition]();
  }

  this.state = this.Initializing.getState();
  this.data = {};
  this.afm = afm;
}

export { Session };
