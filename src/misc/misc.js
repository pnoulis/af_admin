function mapTeamStatus(status) {
  switch (status) {
  case 0:
    return 'new';
  case 1:
    return 'cached';
  case 2:
    return 'registered';
  case 3:
    return 'packaged';
  case 4:
    return 'playing';
  case 5:
    return 'paused';
  default:
    throw new Error(`Unknown team status index: ${status}`);
  }
}
function mapWristbandColorCode(wristbandColorCode) {
  switch (wristbandColorCode) {
    case 0:
      return "black";
    case 1:
      return "red";
    case 2:
      return "purple";
    case 3:
      return "green";
    case 4:
      return "yellow";
    case 5:
      return "blue";
    case 6:
      return "orange";
    default:
      throw new Error(`Unknown wristband color code:${wristbandColorCode}`);
  }
}

function mapServerPackagesToClient(packages) {
  const clientPackages = new Map();

  // Time packages
  const timePackages = {
    name: "time",
    catalogue: [],
  };
  timePackages.catalogue = packages
    .filter((p) => p.type === "time")
    .map((p) => ({
      name: p.name,
      amount: p.amount,
      cost: p.cost,
      unit: "minutes",
      type: "time",
    }));
  clientPackages.set("time", timePackages);

  // Mission packages
  const missionPackages = {
    name: "mission",
    catalogue: [],
  };
  missionPackages.catalogue = packages
    .filter((p) => p.type === "mission")
    .map((p) => ({
      name: p.name,
      amount: p.amount,
      cost: p.cost,
      unit: "missions",
      type: "mission",
    }));
  clientPackages.set("mission", missionPackages);

  return clientPackages;
}

export { mapWristbandColorCode, mapServerPackagesToClient, mapTeamStatus };
