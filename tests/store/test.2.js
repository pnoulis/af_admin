export function test2(store) {
  console.log("[TEST]:store asynchronous initializiation");
  const db = store.db;
  db.query("get players");
}
