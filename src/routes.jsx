import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PgDev, {
  PgComponents,
  PgDropdowns,
  PgButtons,
  PgIcons,
  PgLayouts,
  PgLinks,
  PgTextInputs,
  PgPalette,
  PgGreys,
  PgBlues,
  PgPinks,
  PgPurples,
} from "./dev";
import App from "./components/App/App.jsx";

const devRoutes = [
  {
    path: "dev/components",
    element: <PgComponents />,
    children: [
      {
        path: "dropdowns",
        element: <PgDropdowns />,
      },
      {
        path: "buttons",
        element: <PgButtons />,
      },
      {
        path: "icons",
        element: <PgIcons />,
      },
      {
        path: "layouts",
        element: <PgLayouts />,
      },
      {
        path: "links",
        element: <PgLinks />,
      },
      {
        path: "textinputs",
        element: <PgTextInputs />,
      },
    ],
  },
  {
    path: "dev/palette",
    element: <PgPalette />,
    children: [
      {
        path: "greys",
        element: <PgGreys />,
      },
      {
        path: "purples",
        element: <PgPurples />,
      },
      {
        path: "pinks",
        element: <PgPinks />,
      },
      {
        path: "blues",
        element: <PgBlues />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <PgDev />,
    children: [
      {
        path: "",
        element: <App />,
      },
      ...devRoutes,
    ],
  },
]);

export default router;
