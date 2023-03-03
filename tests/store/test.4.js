export function test4(store) {
  console.log("[TEST]:store testing TaskRunner using the FileRunner");

  const FileClient = store.FileClient;
  const FileRunner = store.FileRunner;
  const fr = new FileRunner(new FileClient("../tmp.log"));

  fr.connect();
  fr.read().then((f) => console.log(f));
  fr.read().then((f) => console.log(f));
  fr.read().then((f) => console.log(f));
  fr.read().then((f) => console.log(f));
}
