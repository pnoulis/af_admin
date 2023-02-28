import * as React from "react";

function useSidebar(config = {}) {
  const [state, setState] = React.useState(config);

  return state;
}

export { useSidebar };
