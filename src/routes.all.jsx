import { createBrowserRouter } from "react-router-dom";
import appRoutes from "./app";
import devRoutes from './routes.dev.jsx';

let router;
if (import.meta.env.DEV) {
  router = createBrowserRouter([...appRoutes, ...devRoutes]);
} else {
  router = createBrowserRouter([...appRoutes]);
}

export default router;
