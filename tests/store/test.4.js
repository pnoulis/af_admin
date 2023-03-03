export function test4(TaskRunners, ServiceClients) {
  console.log("[TEST]:store testing TaskRunner using the FileRunner");

  const FileClient = ServiceClients.FileClient;
  const FileRunner = TaskRunners.FileRunner;
  const fr = new FileRunner(new FileClient("../tmp.log"));

  fr.connect();
  fr.read().then((f) => console.log(f));
  fr.read().then((f) => console.log(f));
  fr.read().then((f) => console.log(f));
  fr.read().then((f) => console.log(f));
}
