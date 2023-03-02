import { EventEmitter } from "node:events";

class DB extends EventEmitter {
  constructor() {
    super();
    this.connected = false;
    this.commandsQueue = [];
  }

  async query(queryString) {
    if (!this.connected) {
      console.log(`Request queued: ${queryString}`);

      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject);
        };

        this.commandsQueue.push(command);
      });
    }

    console.log(`Request executed: ${queryString}`);
  }

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emit("connected");
      this.commandsQueue.forEach((command) => command());
      this.commandsQueue = [];
    }, 500);
  }
}
