import * as React from "react";
import styled from "styled-components";
import { PackageConfiguratorCard } from "./PackageConfiguratorCard";
import { useMqtt } from "/src/mqtt";
import { mapServerPackagesToClient } from "/src/misc";
import { useRegistrationContext } from "/src/app/route_registration_team";

const StyleLayoutPackages = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;
const StyleLayoutItemConfiguratorCard = styled(PackageConfiguratorCard)`
  flex: 0 0 400px;
  height: 250px;
`;

const catalogue = [
  {
    amount: 10,
    unit: "minutes",
  },
  {
    amount: 20,
    unit: "minutes",
  },
  {
    amount: 30,
    unit: "minutes",
  },
  {
    amount: 40,
    unit: "minutes",
  },
  {
    amount: 50,
    unit: "minutes",
  },
];
function Packages({ className }) {
  const { client } = useMqtt();
  const [packages, setPackages] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const { state, dispatchRegistration } = useRegistrationContext();

  React.useEffect(() => {
    const unsubscribe = client.publish("packages/list", {}, (err, res) => {
      if (err) {
        throw new Error(err);
      }
      if (res.result === "OK") {
        setPackages(mapServerPackagesToClient(res.packages));
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePackageConfigured = (afpackage) => {
    setSelectedPackage(afpackage);
  };

  React.useEffect(() => {
    if (!selectedPackage) return;
    // dispatchRegistration({ type: "add_package", package: selectedPackage });
  }, [selectedPackage]);

  return (
    <StyleLayoutPackages className={className}>
      <StyleLayoutItemConfiguratorCard
        title="time"
        subtitle="amount of time"
        catalogue={packages?.get("time").catalogue || catalogue}
        selected={selectedPackage?.type === "time"}
        onPackageConfigured={handlePackageConfigured}
      />
      <StyleLayoutItemConfiguratorCard
        title="missions"
        subtitle="number of missions"
        catalogue={packages?.get("mission").catalogue || catalogue}
        selected={selectedPackage?.type === "mission"}
        onPackageConfigured={handlePackageConfigured}
      />
    </StyleLayoutPackages>
  );
}

export { Packages };
