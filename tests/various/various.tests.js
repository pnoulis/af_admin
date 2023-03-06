function VariousTests(test) {
  const tests = [];
  if (!test) {
    tests.forEach((test) => test());
  } else if (!tests[test]) {
    throw new Error(`Test: ${test} missing from Various Suite Test`);
  } else {
    tests[test]();
  }
}
