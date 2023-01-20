import Home from "./Home";
import registrationRoutes from "./registration";

const routes = [
  {
    path: "/app",
    children: [
      {
        path: "",
        element: <Home />,
        children: [...registrationRoutes],
      },
    ],
  },
];

export default routes;
