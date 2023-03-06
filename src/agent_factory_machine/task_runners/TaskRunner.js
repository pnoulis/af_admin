import { EventEmitter } from "node:events";

class TaskRunner extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = this.parseConfig(config);
    this.jobQueue = [];
    this.connected = false;
    this.states = {
      idle: new States.Idle(this),
      pending: new States.Pending(this),
      online: new States.Online(this),
    };
    this.setState(this.states.idle.getState());
  }

  queue(job) {
    this.jobQueue.push(job);
  }

  flush() {
    const now = Date.now();
    this.jobQueue = this.jobQueue.filter((job) => {
      if (now > job.expire) {
        console.log("job expired");
        job.done = true;
        // even if the job has expired, it does not hurt to try
        // running it one last time
        job.execute();
      }
      return !job.done;
    });
  }

  serviceOn() {
    this.connected = true;
  }

  serviceOff() {
    this.connected = false;
  }

  run(task, expire) {
    expire = Date.now() + (expire || this.config.taskExpire);
    return this.state.run(task, expire);
  }

  setState(state) {
    const oldState = `[TRANSITION]:afm ${this.state?.name}`;
    this.state = state;
    console.log(oldState + ` -> ${this.state.name}`);
    if ("initialize" in this.state) {
      this.state.initialize();
    }
  }

  parseConfig(config) {
    return {
      taskExpire: 3000,
      ...config,
    };
  }
}

const States = {};
States.Idle = function Idle(taskRunner) {
  this.name = "idle";
  this.taskRunner = taskRunner;
  this.getState = () => this;
};
States.Idle.prototype.run = function run(task, expire) {
  return new Promise((resolve, reject) => {
    const job = {
      expire,
      done: false,
      execute: () => {
        try {
          return task().then(resolve, reject);
        } catch (err) {
          err.name = "ERR_TASK_RUNNER";
          err.message =
            "Asynchronous error, propably service off: " + err.message;
          throw err;
        }
      },
    };
    this.taskRunner.queue(job);
    if (this.taskRunner.connected) {
      this.taskRunner.setState(this.taskRunner.states.online.getState());
    } else {
      this.taskRunner.setState(this.taskRunner.states.pending.getState());
    }
  });
};

States.Pending = function Pending(taskRunner) {
  this.name = "pending";
  this.taskRunner = taskRunner;
  this.timeoutID = null;
  this.getState = () => this;
};

States.Pending.prototype.initialize = function initialize() {
  this.poll();
};

States.Pending.prototype.poll = function poll() {
  this.timeoutID = setInterval(() => {
    console.log("polling");
    console.log(this.taskRunner.jobQueue);

    if (this.taskRunner.connected) {
      clearInterval(this.timeoutID);
      return this.taskRunner.setState(this.taskRunner.states.online.getState());
    }

    this.taskRunner.flush();
    if (this.taskRunner.jobQueue.length === 0) {
      clearInterval(this.timeoutID);
      this.taskRunner.setState(this.taskRunner.states.idle.getState());
    }
  }, 1000);
};

States.Pending.prototype.run = function run(task, expire) {
  return new Promise((resolve, reject) => {
    const job = {
      expire,
      done: false,
      execute: () => {
        try {
          return task().then(resolve, reject);
        } catch (err) {
          err.name = "ERR_TASK_RUNNER";
          err.message =
            "Asynchronous error, propably service off: " + err.message;
          throw err;
        }
      },
    };
    this.taskRunner.queue(job);
  });
};

States.Online = function Online(taskRunner) {
  this.name = "online";
  this.taskRunner = taskRunner;
  this.getState = () => this;
};

States.Online.prototype.initialize = function initialize() {
  this.runJobs();
};

States.Online.prototype.runJobs = async function runJobs() {
  console.log("running all jobs");
  console.log(this.taskRunner.jobQueue);

  this.taskRunner.flush();

  if (this.taskRunner.jobQueue.length === 0) {
    return this.taskRunner.setState(this.taskRunner.states.idle.getState());
  }

  if (!this.taskRunner.connected) {
    return this.taskRunner.setState(this.taskRunner.states.pending.getState());
  }

  for (const job of this.taskRunner.jobQueue) {
    console.log("executing job");
    if (this.taskRunner.connected) {
      console.log("task runner connected");
      await job.execute().then(() => (job.done = true));
    } else {
      console.log("connection went offline");
      break;
    }
    console.log("job done");
  }

  this.runJobs();
};

States.Online.prototype.run = function online(task, expire) {
  console.log("running on online state");
  const job = {
    expire,
    done: false,
    execute: () => {
      try {
        return task().then(resolve, reject);
      } catch (err) {
        err.name = "ERR_TASK_RUNNER";
        err.message =
          "Asynchronous error, propably service off: " + err.message;
        throw err;
      }
    },
  };
  this.taskRunner.queue(job);
  this.runJobs();
};

export { TaskRunner };
