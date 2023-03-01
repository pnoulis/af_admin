const WRISTBAND_SCHEMA = {
  number: null,
  colorCode: null,
  status: "initialized",
};

const Transitions = {};
Transitions.startPairing = function startPairing() {};
Transitions.stopPairing = function stopPairing() {};
Transitions.pair = function pair() {};
Transitions.register = function register() {};
Transitions.verify = function verify() {};

const States = {};
States.Initialized = function Initialized(wristband) {
  this.name = "initialized";
  this.wristband = wristband;
  this.getState = () => this;
};
States.Initialized.prototype.startPairing = function startPairing() {};
States.Initialized.prototype.stopPairing = function stopPairing() {};
States.Initialized.prototype.pair = function pair() {};
States.Initialized.prototype.register = function register() {};
States.Initialized.prototype.verify = function verify() {};

States.Pairing = function Pairing(wristband) {
  this.name = "pairing";
  this.wristband = wristband;
  this.getState = () => this;
};
States.Pairing.prototype.startPairing = function startPairing() {};
States.Pairing.prototype.stopPairing = function stopPairing() {};
States.Pairing.prototype.pair = function pair() {};
States.Pairing.prototype.register = function register() {};
States.Pairing.prototype.verify = function verify() {};

States.Paired = function Paired(wristband) {
  this.name = "paired";
  this.wristband = wristband;
  this.getState = () => this;
};
States.Paired.prototype.startPairing = function startPairing() {};
States.Paired.prototype.stopPairing = function stopPairing() {};
States.Paired.prototype.pair = function pair() {};
States.Paired.prototype.register = function register() {};
States.Paired.prototype.verify = function verify() {};

States.Registered = function Registered(wristband) {
  this.name = "registered";
  this.wristband = wristband;
  this.getState = () => this;
};
States.Registered.prototype.startPairing = function startPairing() {};
States.Registered.prototype.stopPairing = function stopPairing() {};
States.Registered.prototype.pair = function pair() {};
States.Registered.prototype.register = function register() {};
States.Registered.prototype.verify = function verify() {};

States.Verified = function Verified(wristband) {
  this.name = "verified";
  this.wristband = wristband;
  this.getState = () => this;
};
States.Verified.prototype.startPairing = function startPairing() {};
States.Verified.prototype.stopPairing = function stopPairing() {};
States.Verified.prototype.pair = function pair() {};
States.Verified.prototype.register = function register() {};
States.Verified.prototype.verify = function verify() {};

function Wristband(wristband = WRISTBAND_SCHEMA) {
  this.data = wristband;

  for (let state in States) {
    this[state] = new States[state](this);
  }

  for (let transition in Transitions) {
    this[transition] = () => this.state[transition]();
  }

  this.state = this.Initialized.getState();
}

export { Wristband };
