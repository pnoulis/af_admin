import { EventEmitter } from "node:events";

class DB extends EventEmitter {
  constructor() {
    super();
    this.connected = false;
  }

  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true;
      this.emit("connected");
    }, 500);
  }

  async query(queryString) {
    if (!this.connected) {
      throw new Error("not connected yet!");
    }
    console.log(`Query executed: ${queryString}`);
  }
}

const db = new DB();

export { db };
