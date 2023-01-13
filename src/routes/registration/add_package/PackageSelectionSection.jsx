import React, { useState, useEffect } from "react";
import { StylePackageSelectionSection } from "./styles";
import PackageConfiguratorCard from "./PackageConfiguratorCard";

const dummyItems = ["one", "two", "three", "four"];

function PackageSelectionSection() {
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
      <PackageConfiguratorCard
        afPackage={{
          options: ["one", "two", "three"],
        }}
        onPackageConfigured={() => {}}
      />
      <PackageConfiguratorCard
        afPackage={{
          options: ["one", "two", "three"],
        }}
        onPackageConfigured={() => {}}
      />
    </StylePackageSelectionSection>
  );
}

export default PackageSelectionSection;
