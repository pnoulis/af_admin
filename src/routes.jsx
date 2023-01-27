import { createBrowserRouter } from "react-router-dom";
import appRoutes from "./app";
import devRoutes from "../dev";
import testRoutes from "./Test";

let router;
if (import.meta.env.DEV) {
  router = createBrowserRouter([...testRoutes, ...appRoutes, ...devRoutes]);
  // router = createBrowserRouter([...testRoutes]);
} else {
  // router = createBrowserRouter([...testRoutes, ...appRoutes]);
  router = createBrowserRouter([...testRoutes]);
}

export default router;
