import { db } from "./db.js";
import { once } from "node:events";

/*
  _Delayed Startup technique_

  The Delayed Startup technique is useful in cases where a task
  or component is dependent upon a service which is asynchronous in
  nature and hence may not be available for usage upon the requested
  time.

  If the task is itself a dependency of parent nodes then suddenly
  one must change his whole perspective because the whole tree
  becomes asynchronous.

 */

async function initialize() {
  db.connect();
  await once(db, "connected");
}

async function updateLastAccess() {
  await db.query(`INSERT (${Date.now()}) INTO 'LastAccesses`);
}

initialize().then(() => updateLastAccess());
