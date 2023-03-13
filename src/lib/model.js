function Team() {
  this.state = init;
  this.roster = new Roster();

  function init() {}
  function registered() {}
  function playing() {}
  function paused() {}
}

function Roster() {
  this.state = init;
  this.players = [];

  function init() {}
  function loaded() {}
}

function Player() {
  this.state = init;
  this.wristband = new Wristband();

  function init() {}
  function registered() {}
}

function Wristband() {
  this.state = init;

  function init() {}
  function pairing() {}
  function paired() {}
  function registered() {}
  function verified() {}
}

function Package() {
  this.state = init;
  function init() {}
  function registered() {}
  function paid() {}
  function active() {}
}

function Session() {
  this.state = init;
  this.teams = [];

  function init() {}
  function live() {}
  function cached() {}
  function archived() {}
}

function Mqtt() {}

function App() {
  this.state = init;
  this.session = new Session();
  this.mqtt = new Mqtt();
  function init() {}
  function loaded() {}
}
