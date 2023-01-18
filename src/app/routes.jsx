import Home from "./Home";
import registrationRoutes from "./registration";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          ...registrationRoutes,
        ]
      },
    ],
  },
];

export default routes;
