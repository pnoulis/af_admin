import React, { useState, useEffect } from "react";
import { StylePackageSelectionSection } from "./styles";
import {
  MissionsConfigurator,
  TimeConfigurator,
  ElementsConfigurator,
} from "./Packages";

function PackageSelectionSection({ afPackages }) {
  const [_package, setPackage] = useState({
    name: "",
    config: "",
  });

  function handlePackageSelection(name, config) {
    setPackage({
      name,
      config,
    });
  }

  return (
    <StylePackageSelectionSection>
      <MissionsConfigurator
        afPackage={afPackages.find((p) => p.name === "missions")}
      />
      <TimeConfigurator afPackage={afPackages.find((p) => p.name === "time")} />
      <ElementsConfigurator
        afPackage={afPackages.find((p) => p.name === "elements")}
      />
    </StylePackageSelectionSection>
  );
}

export default PackageSelectionSection;
