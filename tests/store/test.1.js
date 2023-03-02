export function test1(store) {
  console.log("[TEST]:store initialize store");
  const testStore = new store.Store();
  testStore.team.loadJson();
  console.log(testStore);
}
