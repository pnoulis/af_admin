import React, { useCallback } from "react";
import PackageConfiguratorCard from "./PackageConfiguratorCard";

function MissionsConfigurator({ afPackage }) {
  const handlePackageConfigured = useCallback(
    (label) => {
      const conf = afPackage.catalogue.find(
        (catalogueItem) => catalogueItem.label === label
      ) || {
        ...afPackage.catalogue[0],
        label,
        amount: label,
      };
    },
    [afPackage.name]
  );
  return (
    <PackageConfiguratorCard
      title="missions"
      subtitle="number of missions"
      catalogue={afPackage.catalogue}
      onPackageConfigured={handlePackageConfigured}
    />
  );
}

function TimeConfigurator({ afPackage }) {
  const handlePackageConfigured = useCallback(
    (label) => {
      const conf = afPackage.catalogue.find(
        (catalogueItem) => catalogueItem.label === label
      ) || {
        ...afPackage.catalogue[0],
        label,
        amount: label.slice(-1),
      };
      console.log(conf);
    },
    [afPackage.name]
  );

  return (
    <PackageConfiguratorCard
      title="time"
      subtitle="amount of time"
      catalogue={afPackage.catalogue}
      onPackageConfigured={handlePackageConfigured}
    />
  );
}

function ElementsConfigurator({ afPackage, onPackageConfigured }) {
  const handlePackageConfigured = useCallback(
    (label) => {
      const conf = afPackage.catalogue.find(
        (catalogueItem) => catalogueItem.label === label
      ) || {
        ...afPackage.catalogue[0],
        label,
        amount: label,
      };
    },
    [afPackage.name]
  );

  return (
    <PackageConfiguratorCard
      title="elements"
      subtitle="select element"
      dropdownVariant="fixed"
      placeholder="element"
      catalogue={afPackage.catalogue}
      onPackageConfigured={handlePackageConfigured}
    />
  );
}

export { MissionsConfigurator, TimeConfigurator, ElementsConfigurator };
