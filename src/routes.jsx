import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home, Register, AddPlayer, AddPackage } from "./routes/index";
import PgDev, {
  PgMqtt,
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

const devRoutes = [
  {
    path: "dev/mqtt",
    element: <PgMqtt />,
  },
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
        element: <Home />,
        children: [
          {
            path: "register",
            element: <Register />,
            children: [
              {
                path: "team/create",
                element: <p>team create</p>,
              },
              {
                path: "team/player/add",
                element: <AddPlayer />,
              },
              {
                path: "team/package/add",
                element: <AddPackage />,
              },
              {
                path: "team/package/submit",
                element: <p>package submit</p>,
              },
            ],
          },
          {
            path: "manager",
            element: <p>manager</p>,
          },
          {
            path: "scoreboard",
            element: <p>scoreboard</p>,
          },
          {
            path: "cashier",
            element: <p>cashier</p>,
          },
        ],
      },
      ...devRoutes,
    ],
  },
]);

export default router;
