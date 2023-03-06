import { EventEmitter } from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

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
  connect() {
    // flag options:
    // a+ -> open for reading and appending, create if not exist
    return fs.open(this.path, "a+").then((handle) => {
      this.handle = handle;
      this.emit("connected");
    });
  }
}

export { FileClient };
