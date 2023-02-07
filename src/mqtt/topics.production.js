const topicsProduction = [
  {
    alias: "/wristband/scan",
    pub: null,
    sub: "/themaze/${clientId}/gui/player/wristbandScan",
  },
  {
    alias: "/wristband/register",
    pub: "/themaze/${clientId}/gui/player/registerWristband",
    sub: "/themaze/${clientId}/gui/player/registerWristband/response",
  },
];

export { topicsProduction };
