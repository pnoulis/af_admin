import * as React from "react";

const SidebarContext = React.createContext(null);
const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (context == null) {
    throw new Error("Sidebar children must be wrapped within <Sidebar/>");
  }

  return context;
};

export { useSidebarContext, SidebarContext };
