import process from "node:process";
import { testCoreMachine } from "./core_machine/index.js";
import { testStore } from "./store/index.js";

const [nodebin, exe, testSuite, test] = process.argv;

switch (testSuite) {
  case "core":
    testCoreMachine(test);
    break;
  case "store":
    testStore(test);
    break;
  default:
    testCoreMachine();
    testStore();
}
