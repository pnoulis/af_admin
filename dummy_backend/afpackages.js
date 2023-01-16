const afpackages = [
  {
    package_name: "time",
    package_type: "linear",
    constant_unit_cost: 1.5,
    player_coefficient: 1.05,
    catalogue: [
      {
        label: 30,
      },
      {
        label: 60,
      },
      {
        label: 90,
      },
      {
        label: 120,
      },
    ],
  },
  {
    package_name: "missions",
    package_type: "linear",
    constant_unit_cost: 1.6,
    player_coefficient: 1.06,
    catalogue: [
      {
        label: 5,
      },
      {
        label: 10,
      },
      {
        label: 15,
      },
      {
        label: 20,
      },
    ],
  },
  {
    package_name: "elements",
    package_type: "nonlinear",
    catalogue: [
      {
        label: "earth",
        constant_unit_cost: 40,
        player_coefficient: 1.06,
      },
      {
        label: "wind",
        constant_unit_cost: 50,
        player_coefficient: 1.06,
      },
      {
        label: "fire",
        constant_unit_cost: 60,
        player_coefficient: 1.02,
      },
      {
        label: "water",
        constant_unit_cost: 70,
        player_coefficient: 1.9,
      },
    ],
  },
];
