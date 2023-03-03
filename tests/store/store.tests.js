import * as Store from "../../src/core_machine/store/index.js";
import { test1 } from "./test.1.js";
import { test2 } from "./test.2.js";
import { test3 } from "./test.3.js";
import { test4 } from "./test.4.js";

function testStore(test) {
  const tests = [
    () => test1(Store),
    () => test2(Store),
    () => test3(Store),
    () => test4(Store),
  ];
  if (!test) {
    tests.forEach((test) => test());
  } else if (!tests[test]) {
    throw new Error(`store test suite missing test: ${test}`);
  } else {
    tests[test]();
  }
}

export { testStore };
