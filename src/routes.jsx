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
  PgMisc,
  PgPalette,
  PgGreys,
  PgBlues,
  PgPinks,
  PgPurples,
  PgWhites,
  PgOranges,
  PgReds,
  PgBlacks,
  PgGreens,
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
      {
        path: "misc",
        element: <PgMisc />,
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
      {
        path: "whites",
        element: <PgWhites />,
      },
      {
        path: "oranges",
        element: <PgOranges />,
      },
      {
        path: "reds",
        element: <PgReds />,
      },
      {
        path: "greens",
        element: <PgGreens />,
      },
      {
        path: "blacks",
        element: <PgBlacks />,
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
