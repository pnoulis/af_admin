import { createBrowserRouter } from "react-router-dom";
import appRoutes from "./app";
import devRoutes from '../dev';

let router;
if (import.meta.env.DEV) {
  router = createBrowserRouter([...appRoutes, ...devRoutes]);
} else {
  router = createBrowserRouter([...appRoutes]);
}

export default router;
