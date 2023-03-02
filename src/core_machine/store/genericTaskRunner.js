import { EventEmitter } from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

/*

  transitions:
  init
  suspend

  actions:
  run

  states:
  offline
  online
  error

 */

const Transitions = {};
Transitions.init = function init() {};
Transitions.suspend = function suspend() {};

const States = {};
States.Offline = function Offline(taskRunner) {
  this.name = "offline";
  this.taskRunner = taskRunner;
  this.getState = () => this;
};
States.Offline.prototype.init = function init() {
  this.taskRunner.setState(this.taskRunner.states.online.getState());
  this.taskRunner.flushQueue();
};
States.Offline.prototype.suspend = function suspend() {
  this.taskRunner.setState(this.getState());
};
States.Offline.prototype.run = function run(task) {
  return new Promise((resolve, reject) => {
    const taskWrapper = () => task().then(resolve, reject);
    this.taskRunner.queue(taskWrapper);
  });
};

States.Online = function Online(taskRunner) {
  this.name = "online";
  this.taskRunner = taskRunner;
  this.getState = () => this;
};
States.Online.prototype.init = function init() {
  this.taskRunner.setState(this.getState());
};
States.Online.prototype.suspend = function suspend() {
  this.taskRunner.setState(this.taskRunner.states.offline.getState());
};
States.Online.prototype.run = function run(task) {
  console.log("onlsine state");
  return task();
};

States.Error = function Error(taskRunner) {
  this.name = "error";
  this.taskRunner = taskRunner;
  this.getState = () => this;
};
States.Error.prototype.init = function init() {
  throw new Error("Task runner error state");
};
States.Error.prototype.suspend = function suspend() {
  throw new Error("Task runner error state");
};
States.Error.prototype.run = function run(task) {
  throw new Error(`Task runner error state`);
};

class TaskRunner extends EventEmitter {
  constructor() {
    super();
    this.taskQueue = [];
    this.states = {
      online: new States.Online(this),
      offline: new States.Offline(this),
      error: new States.Error(this),
    };
    this.setState(this.states.offline.getState());
    this.on("init", () => this.state.init());
    this.on("suspend", () => this.state.suspend());
    this.on("error", (err) => this.state.suspend(err));
  }

  queue(task) {
    console.log("queued task");
    this.taskQueue.push(task);
  }
  async flushQueue() {
    console.log("running queued tasks");
    const copy = [...this.taskQueue];
    this.taskQueue = [];
    for (const task of copy) {
      await this.state.run(task);
      // await task().then(() => console.log("what the hella"));
    }
    // this.taskQueue.forEach((task) =>
    //   task().then(() => console.log("what th efuck"))
    // );
    // const flush = [...this.taskQueue];
    // this.taskQueue = [];
    // for await (const task of this.taskQueue.map((task) => task())) {
    //   // await this.state.run(task);
    //   console.log(task);
    //   console.log("running");
    // }

    // for await (const task of flush) {
    //   console.log(this.state);
    //   console.log(task);
    //   // this.state.run(task);
    // }
    // flush.forEach((task) => {
    //   console.log(this.state);
    //   this.state.run(task);
    // });
    // this.taskQueue.forEach((task) => {});
    // this.taskQueue.forEach((task) => task());
    // this.taskQueue = [];
  }
  setState(state) {
    const transition = `[TRANSITION]:afm ${this.state?.name}`;
    this.state = state;
    console.log(transition + ` -> ${this.state.name}`);
  }
  run(task) {
    return this.state.run(task);
  }
}

class FileClient extends EventEmitter {
  constructor(filepath) {
    super();
    this.connected = false;
    this.path = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      filepath
    );
    this.handle = null;
  }

  /**
   * @return {Promise}
   */
  read() {
    return this.handle
      .read({ position: 0 })
      .then((data) => data.buffer.toString("utf8"));
  }

  /**
   * @return {Promise}
   */
  write(data) {
    return this.handle.appendFile(data, { encoding: "utf8" });
  }

  close() {
    this.handle.close();
    this.emit("close");
  }

  /**
   * @return {Promise}
   */
  async connect() {
    // flag options:
    // a+ -> open for reading and appending, create if not exist
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        this.handle = await fs.open(this.path, "a+");
        this.emit("connected");
      }, 2000);
    });
    // this.handle = await fs.open(this.path, "a+");
    // this.emit("connected");
  }
}

class FileDbRunner extends TaskRunner {
  constructor(fileClient) {
    super();
    this.fileClient = fileClient;
    fileClient.on("connected", () => this.emit("init"));
    fileClient.on("close", () => this.emit("suspend"));
  }

  read() {
    return this.run(() => this.fileClient.read());
  }

  write(data) {
    return this.run(() => this.fileClient.write(data));
  }

  connect() {
    this.fileClient.connect();
  }

  close() {
    this.fileClient.close();
  }
}

const aFileClient = new FileClient("./tmp.log");

// TASK RUNNER
// VASIS DEDOMENON JSON
const aFileDbRunner = new FileDbRunner(aFileClient);

aFileDbRunner.read().then((f) => console.log(f));
aFileDbRunner.read().then((f) => console.log(f));
aFileDbRunner.connect();

// aFileDbRunner
//   .read()
//   .then((f) => console.log(f))
//   .then(() => aFileDbRunner.close());
// aFileDbRunner.read().then((f) => console.log(f));
// aFileDbRunner.read().then((f) => console.log(f));
// aFileDbRunner
//   .read()
//   .then((f) => console.log(f))
//   .then(() => aFileDbRunner.close());

// aFileClient
//   .connect()
//   .then(() => aFileClient.write("yolo\n"))
//   .then(() => aFileClient.write("yolo2\n"))
//   .then(() => aFileClient.read())
//   .then((f) => console.log(f))
//   .finally(() => aFileClient.close());
