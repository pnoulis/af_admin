import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

function Team() {};
Team.prototype.loadJson = async function get() {
  const datapath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    './players.json'
  );

  let handle;
  try {
    handle = await fs.open(datapath);
    const data = await handle.readFile({ encoding: 'utf8' });
    return data;
  } catch(err) {
    throw err;
  } finally {
    handle?.close();
  }
};
Team.prototype.setJson = function set() {};
Team.prototype.create = function create() {};
Team.prototype.read = function read() {};
Team.prototype.update = function update() {};
Team.prototype.remove = function remove() {};

function Package() {};
Package.prototype.loadJson = function loadJson() {};
Package.prototype.setJson = function setJson() {};
Package.prototype.create = function create() {};
Package.prototype.read = function read() {};
Package.prototype.update = function update() {};
Package.prototype.remove = function remove() {};

function Player() {};
Player.prototype.loadJson = function loadJson() {};
Player.prototype.setJson = function setJson() {};
Player.prototype.create = function create() {};
Player.prototype.read = function read() {};
Player.prototype.update = function update() {};
Player.prototype.remove = function remove() {};

let store;
function Store() {
  if (!store) {
    store = this;
    this.player = new Player(this);
    this.team = new Team(this);
    this.package = new Package(this);
  }
  return store;
}

export { Store };
