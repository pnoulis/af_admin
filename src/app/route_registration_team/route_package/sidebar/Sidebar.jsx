import * as React from "react";
import { PackagesList } from "./PackagesList";

function Sidebar(props) {
  return <PackagesList {...props} />;
}

export { Sidebar };
