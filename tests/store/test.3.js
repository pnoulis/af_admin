export function test3(TaskRunners, ServiceClients) {
  console.log(
    "[TEST]:store handling asynchronous initialization\
 using the local initialization technique"
  );

  const db = store.db;
  const localInitializationCheck = store.localInitializationCheck;

  localInitializationCheck();
  db.connect();
}
