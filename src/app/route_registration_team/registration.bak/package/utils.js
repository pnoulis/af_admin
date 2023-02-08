function generateCatalogue(afpackage, backendPackage) {
  const catalogue = afpackage.catalogue || [];
  const costs = {
    constantCost: backendPackage.constant_unit_cost,
    playerCost: backendPackage.player_coefficient,
  };

  switch (afpackage.name) {
    case "missions":
      catalogue.push({
        label: "5",
        amount: 5,
        ...costs,
      });
      catalogue.push({
        label: "10",
        amount: 10,
        ...costs,
      });
      catalogue.push({
        label: "15",
        amount: 15,
        ...costs,
      });
      catalogue.push({
        label: "20",
        amount: 20,
        ...costs,
      });
      break;
    case "time":
      catalogue.push({
        label: "30'",
        amount: 30,
        ...costs,
      });
      catalogue.push({
        label: "60'",
        amount: 60,
        ...costs,
      });
      catalogue.push({
        label: "90'",
        amount: 90,
        ...costs,
      });
      catalogue.push({
        label: "120'",
        amount: 120,
        ...costs,
      });
      break;
    default:
      catalogue.push({
        label: backendPackage.variant_name,
        amount: 1,
        ...costs,
      });
      break;
  }

  return catalogue;
}

function translateBackendPackages(packages) {
  const afpackages = packages.reduce((car, cdr) => {
    let afpackage = car.find((p) => p.name === cdr.package_name);

    if (!afpackage) {
      afpackage = {
        name: cdr.package_name,
        type: cdr.package_type,
      };
      car.push(afpackage);
    }
    afpackage.catalogue = generateCatalogue(afpackage, cdr);

    return car;
  }, []);
  return afpackages;
}

export { translateBackendPackages };
