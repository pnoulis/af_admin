import * as CoreMachine from "../../src/core_machine/index.js";
import { test1 } from "./test.1.js";

function testCoreMachine(test) {
  const tests = [() => test1(CoreMachine)];
  if (!test) {
    tests.forEach((test) => test());
  } else if (!tests[test]) {
    throw new Error(`agentFactoryMachine test suite missing test: ${test}`);
  } else {
    tests[test]();
  }
}

export { testCoreMachine };
