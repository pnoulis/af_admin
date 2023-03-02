import { db } from "./store_async.js";
import { once } from "node:events";

/*
  _Local Initialization Check technique_

  The Local Initialization Check technique is useful in cases
  where a task or component is dependent upon a service which
  is asynchronous in nature and hence may not be available
  for usage upon the requested time.

  If the task is itself a dependency of parent nodes then suddenly
  one must change his whole perspective because the whole tree
  becomes asynchronous.

  The technique is implemented by wrapping the task with
  guards which block the execution of the task until the
  service becomes available.


  the guard:

  async fn guard(task) {
      make sure service is alive
      .then(run task)
  }

  This technique can be implemented by either the consumer of the provider
  of the asynchronous service.

  If the provider does not implement it, it transfers the burden of boilerplate
  code to the consumer.

  The consumer may then implement a generic utility function or create the
  guard every time he has to run a task.

 */

async function localInitializationCheck() {
  if (!db.connected) {
    await once(db, "connected");
  }

  await db.query(`INSERT (${Date.now()}) INTO 'LastAccesses`);
}

async function genericGuard(task) {
  if (!db.connected) {
    await once(db, "connected");
  }

  await task();
}

export { localInitializationCheck };
