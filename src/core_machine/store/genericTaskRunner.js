import { EventEmitter } from "node:events";
import { FileClient } from './clients/index.js';
import process from 'node:process';

const delay = (time = 0) => new Promise((resolve, reject) => setTimeout(() => resolve(), time));


/*
  Transitions
  - Off
  - On
  - Run
 */

const States = {};
States.Idle = function Idle(taskRunner) {
  this.name = 'idle';
  this.taskRunner = taskRunner;
  this.getState = () => this;
};
States.Idle.prototype.run = function run(task) {
  return new Promise((resolve, reject) => {
    const job = {
      execute: () => task().then(resolve, reject)
    };
    this.queue(job);
    this.taskRunner.setState(
      this.connnected
        ? this.taskRunner.states.online.getState()
        : this.taskRunner.states.pending.getState()
    );
  });
};

States.Pending = function Pending(taskRunner) {
  this.name = 'pending';
  this.taskRunner = taskRunner;
  this.timeoutID = null;
  this.pollingExpiration = 0;
  this.getState = () => {
    this.pollingExpiration = Date.now() + 10000;
    return this;
  };
};
States.Pending.prototype.poll = function poll() {
  this.timeoutID = setInterval(() => {
    if (this.taskRunner.connected) {
      clearInterval(this.timeoutID);
      this.taskRunner.setState(this.taskRunner.states.online.getState());
    } else if (Date.now() > this.pollingExpiration) {
      clearInterval(this.timeoutID);
    }
  }, 1000);
};

States.Pending.prototype.run = function run(task) {
  return new Promise((resolve, reject) => {
    const job = {
      execute: () => task().then(resolve, reject)
    };
    this.queue(job);
    this.pollingExpiration += 10000;
  });
};


States.Online = function Online(taskRunner) {
  this.name = 'online';
  this.taskRunner = taskRunner;
  this.getState = () => {
    process.nextTick(() => {
      this.runJobs();
    });
    return this;
  };
};

States.Online.prototype.runJobs = async function runJobs() {
  if (this.taskRunner.taskQueue.length === 0) {
    this.taskRunner.setState(this.taskRunner.states.idle.getState());
  } else {
    for (const job of [...this.taskRunner.taskQueue]) {
    }
    runJobs();
  }
};

States.Online.prototype.run = function online(task) {
  return new Promise((resolve, reject) => {
    const job = {
      execute: () => task().then(resolve, reject)
    };
    this.queue(job);
  });
};


class TaskRunner extends EventEmitter() {
  constructor() {
    super();
    this.taskQueue = [];
    this.connected = false;
    this.states = {
      idle: new States.Idle(this),
      pending: new States.Pending(this),
      online: new States.Online(this)
    };
    this.state = this.states.idle.getState();
  }

  queue(job) {
    this.taskQueue.push(task);
  }

  on() {
    this.connected = true;
    this.state.on();
  }

  off() {
    this.connected = false;
    this.state.off();
  }

  run(task) {
    this.state.run(task);
  }

  setState(state) {
    const oldState = `[TRANSITION]:afm ${this.state?.name}`;
    this.state = state;
    console.log(oldState + ` -> ${this.state.name}`);
  }
}


class FileRunner extends TaskRunner {
  constructor(fileClient) {
    super();
    this.fileClient = fileClient;
    fileClient.on("connected", () => this.on());
    fileClient.on("close", () => this.off());
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




// const Transitions = {};
// Transitions.run = function run() {};

// const States = {};
// States.Idle = function Idle(taskRunner) {
//   this.name = 'idle';
//   this.taskRunner = taskRunner;
//   this.getState = () => this;
// };
// States.Idle.prototype.run = function run(task) {
//   this.taskRunner.setState(this.taskRunner.states.pending.getState());
//   return this.taskRunner.state.run(task);
// };
// States.Pending = function Pending(taskRunner) {
//   this.name = 'pending';
//   this.taskRunner = taskRunner;
//   this.getState = () => this;
// };
// States.Pending.prototype.runLoop = async function runLoop() {
//   this.timerId = setInterval(() => {

//   }, 2000);
//   setInterval(() => {
//     // check if there are any more tasks to run
//     // If there are run them unless they have expired
//   }, 2000);
// };

// States.Pending.run = function run() {
//   return new Promise((resolve, reject) => {
//   });
// };

// class TaskRunner extends EventEmitter {
//   constructor() {
//     super();
//     this.taskQueue = [];
//     this.states = {
//       idle: new States.NoTasks(this),
//       pending: new States.pending(this)
//     };
//     this.state = this.states.idle.getState();
//   }

//   queue(task) {
//     this.taskQueue.push(task);
//   }

//   setState(state) {
//     const oldState = `[TRANSITION]:afm ${this.state?.name}`;
//     this.state = state;
//     console.log(oldState + ` -> ${this.state.name}`);
//   }
// }



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

// const Transitions = {};
// Transitions.init = function init() {};
// Transitions.suspend = function suspend() {};

// const States = {};
// States.Offline = function Offline(taskRunner) {
//   this.name = "offline";
//   this.taskRunner = taskRunner;
//   this.getState = () => this;
// };
// States.Offline.prototype.init = function init() {
//   this.taskRunner.setState(this.taskRunner.states.online.getState());
//   this.taskRunner.flushQueue();
// };
// States.Offline.prototype.suspend = function suspend() {
//   this.taskRunner.setState(this.getState());
// };
// States.Offline.prototype.run = function run(task) {
//   if (typeof task === 'object') {
//     console.log('task is an object');
//     this.taskRunner.queue(task);
//     return;
//   }

//   return new Promise((resolve, reject) => {
//     const taskWrapper = {
//       exec: () => task().then(resolve, reject)
//     };
//     // const taskWrapper = () => task().then(resolve, reject);
//     this.taskRunner.queue(taskWrapper);
//   });
// };

// States.Offline.prototype.runNoGuard = function runNoGuard(task) {
//   return task();
// };

// States.Online = function Online(taskRunner) {
//   this.name = "online";
//   this.taskRunner = taskRunner;
//   this.getState = () => this;
// };
// States.Online.prototype.init = function init() {
//   this.taskRunner.setState(this.getState());
// };
// States.Online.prototype.suspend = function suspend() {
//   this.taskRunner.setState(this.taskRunner.states.offline.getState());
// };
// States.Online.prototype.run = function run(task) {
//   console.log("onlsine state");
//   return task.exec();
// };

// States.Online.prototype.runNoGuard = function runNoGuard(task) {
//   return task();
// };



// States.Error = function Error(taskRunner) {
//   this.name = "error";
//   this.taskRunner = taskRunner;
//   this.getState = () => this;
// };
// States.Error.prototype.init = function init() {
//   throw new Error("Task runner error state");
// };
// States.Error.prototype.suspend = function suspend() {
//   throw new Error("Task runner error state");
// };
// States.Error.prototype.run = function run(task) {
//   throw new Error(`Task runner error state`);
// };

// class TaskRunner extends EventEmitter {
//   constructor() {
//     super();
//     this.taskQueue = [];
//     this.states = {
//       online: new States.Online(this),
//       offline: new States.Offline(this),
//       error: new States.Error(this),
//     };
//     this.setState(this.states.offline.getState());
//     this.on("init", () => this.state.init());
//     this.on("suspend", () => this.state.suspend());
//     this.on("error", (err) => this.state.suspend(err));
//   }

//   queue(task) {
//     console.log("queued task");
//     this.taskQueue.push(task);
//     console.log(this.taskQueue);
//   }
//   async flushQueue() {
//     console.log("running queued tasks");
//     const copy = [...this.taskQueue];
//     this.taskQueue = [];
//     for (const task of copy) {
//       await this.state.run(task);
//       await delay(3000);
//       // await task().then(() => console.log("what the hella"));
//     }
//   }
//   setState(state) {
//     const transition = `[TRANSITION]:afm ${this.state?.name}`;
//     this.state = state;
//     console.log(transition + ` -> ${this.state.name}`);
//   }
//   run(task) {
//     return this.state.run(task);
//   }
// }

// class FileDbRunner extends TaskRunner {
//   constructor(fileClient) {
//     super();
//     this.fileClient = fileClient;
//     fileClient.on("connected", () => this.emit("init"));
//     fileClient.on("close", () => this.emit("suspend"));
//   }

//   read() {
//     return this.run(() => this.fileClient.read());
//   }

//   write(data) {
//     return this.run(() => this.fileClient.write(data));
//   }

//   connect() {
//     this.fileClient.connect();
//   }

//   close() {
//     this.fileClient.close();
//   }
// }

// const aFileClient = new FileClient("../tmp.log");

// // TASK RUNNER
// // VASIS DEDOMENON JSON
// const aFileDbRunner = new FileDbRunner(aFileClient);

// aFileDbRunner.read().then((f) => console.log(f)).then(() => aFileDbRunner.close());
// // delay(4000).then(() => aFileDbRunner.read().then((f) => console.log(f)));
// aFileDbRunner.read().then((f) => console.log(f));
// // aFileDbRunner.connect();
