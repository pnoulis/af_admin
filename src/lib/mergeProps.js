const mergeProps = (...props) => {
  const map = new Map();
  return props.reduce((car, cdr) => {
    Object.entries(cdr).forEach(([key, value]) => {
      if (typeof value === "function") {
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key).push(value);
        car[key] = (...args) => map.get(key).forEach((fn) => fn(...args));
      } else if (typeof value === "object") {
        car[key] = {
          ...car[key],
          ...value,
        };
      } else {
        car[key] = value;
      }
    });
    return car;
  }, {});
};

export default mergeProps;
export { mergeProps };
