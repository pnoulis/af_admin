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
  PgModals,
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

const routes = [
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
      {
        path: "modals",
        element: <PgModals />,
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

export default routes;
