import * as React from "react";
import { useFl } from "/src/hooks";

function Menu() {
  const [counter, setCounter] = React.useState(0);
  const refs = useFl();

  React.useEffect(() => {
    console.log(counter);
    setTimeout(() => {
      setCounter(counter + 1);
    }, 5000);
  }, [counter, setCounter]);

  return (
    <div>
      <span ref={refs.setReference}>
        on hover i produce a tooltip {counter}
      </span>
      <p ref={refs.setFloating}>a tooltip</p>
    </div>
  );
}

function Test() {
  return (
    <React.Fragment>
      <Menu />
    </React.Fragment>
  );
}

const routes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export default routes;
