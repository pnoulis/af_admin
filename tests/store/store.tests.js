import * as Store from "../../src/core_machine/store/index.js";
import { test1 } from './test.1.js';

function testStore(test) {
  const tests = [() => test1(Store)];
  if (!test) {
    tests.forEach((test) => test());
  } else if (!tests[test]) {
    throw new Error(`store test suite missing test: ${test}`);
  } else {
    tests[test]();
  }
}

export { testStore };
