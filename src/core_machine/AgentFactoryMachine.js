import { Session } from "./Session.js";

const States = {};

States.setState = function setState() {};
States.error = function error() {};
States.online = function online() {};

function AgentFactoryMachine(state) {
  // States
  this.setState = States.setState.bind(this);
  this.error = States.error.bind(this);
  this.online = States.online.bind(this);

  // State
  this.state = this.hydrate(state);

  this.session = new Session(this);
}

AgentFactoryMachine.prototype.hydrate = function hydrate(state) {};

export { AgentFactoryMachine };
