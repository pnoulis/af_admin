import { Team } from "./Team.js";

const States = {};
States.setState = function setState() {};
States.initializing = function initializing() {};
States.live = function live() {};
States.archived = function archived() {};

const Transitions = {};
Transitions.initialize = function initialize() {};
Transitions.cashOut = function cashOut() {};

function Session(agentFactoryMachine) {
  this.afmachine = agentFactoryMachine;

  for (let state in States) {
  }
  this.setState = States.setState.bind(this);
  this.initializing = States.initializing.bind(this);
  this.live = States.live.bind(this);
  this.archived = States.archived.bind(this);

  this.state = this.initializing;
}

export { Session };
