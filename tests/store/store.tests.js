import * as TaskRunners from "../../src/core_machine/task_runners/index.js";
import * as ServiceClients from "../../src/core_machine/service_clients/index.js";
import { test1 } from "./test.1.js";
import { test2 } from "./test.2.js";
import { test3 } from "./test.3.js";
import { test4 } from "./test.4.js";

function testStore(test) {
  const tests = [
    () => test1(TaskRunners, ServiceClients),
    () => test2(TaskRunners, ServiceClients),
    () => test3(TaskRunners, ServiceClients),
    () => test4(TaskRunners, ServiceClients),
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
