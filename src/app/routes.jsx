import App from "./App";
import registrationRoutes from "./registration";

const routes = [
  {
    path: "/app",
    children: [
      {
        path: "",
        element: <App />,
        children: [...registrationRoutes],
      },
    ],
  },
];

export default routes;
