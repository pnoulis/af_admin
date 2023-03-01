import * as CoreMachine from "../../src/core_machine/index.js";
import { test1 } from "./test.1.js";

const tests = [() => test1(CoreMachine)];

function testCoreMachine() {
  tests.forEach((test) => test());
}

export { testCoreMachine };
