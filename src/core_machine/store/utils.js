const delay = (time = 0) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(), time));

export { delay };
