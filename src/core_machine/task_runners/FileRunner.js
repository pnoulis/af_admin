import { TaskRunner } from "./TaskRunner.js";

class FileRunner extends TaskRunner {
  constructor(fileClient) {
    super();
    this.fileClient = fileClient;
    fileClient.on("connected", () => this.serviceOn());
    fileClient.on("close", () => this.serviceOff());
  }

  read(expire) {
    return this.run(() => this.fileClient.read(), expire);
  }

  write(data) {
    return this.run(() => this.fileClient.write(data));
  }

  connect() {
    return this.fileClient.connect();
  }

  close() {
    const a = this.fileClient.close();
    console.log("file client close");
  }
}

export { FileRunner };
