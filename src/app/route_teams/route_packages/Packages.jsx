import * as React from "react";
import styled from "styled-components";
import { PackageConfiguratorCard } from "./PackageConfiguratorCard";
import { useMqtt } from "/src/mqtt";
import { mapServerPackagesToClient } from "/src/misc";
import { useTeamsContext } from "/src/app/route_teams";
import { useLocation, useParams } from "react-router-dom";

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
    cost: 100.0,
    unit: "minutes",
  },
  {
    amount: 20,
    cost: 150.0,
    unit: "minutes",
  },
  {
    amount: 30,
    cost: 200.0,
    unit: "minutes",
  },
  {
    amount: 40,
    cost: 250.0,
    unit: "minutes",
  },
  {
    amount: 50,
    cost: 300.0,
    unit: "minutes",
  },
];
function Packages({ className }) {
  const { client } = useMqtt();
  const [packages, setPackages] = React.useState(null);
  const { state, dispatch } = useTeamsContext();
  const params = useParams();
  const [selectedPackage, setSelectedPackage] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = client.publish("packages/list", {}, (err, res) => {
      console.log("--------------------------------------------------");
      console.log(err);
      console.log(res);
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
    console.log(afpackage);
    setSelectedPackage(afpackage);
  };

  React.useEffect(() => {
    if (!selectedPackage) return;
    dispatch({
      type: "conf_package",
      package: params.pkgId,
      catalogue: {
        ...selectedPackage,
        selected: true,
      },
    });
  }, [selectedPackage]);

  React.useEffect(() => {
    const afpkg = state.active.packages.find(
      (afpkg) => afpkg.id === params.pkgId
    );
    if (afpkg && afpkg.catalogue) {
      setSelectedPackage(afpkg.catalogue);
    }
  }, []);

  return (
    <StyleLayoutPackages className={className}>
      <StyleLayoutItemConfiguratorCard
        title="time"
        subtitle="amount of time"
        catalogue={packages?.get("time").catalogue || catalogue}
        selected={selectedPackage?.type === "time"}
        pkg={state.active.packages.find((pkg) => pkg.id === params.pkgId)}
        onPackageConfigured={handlePackageConfigured}
      />
      <StyleLayoutItemConfiguratorCard
        title="missions"
        subtitle="number of missions"
        catalogue={packages?.get("mission").catalogue || catalogue}
        selected={selectedPackage?.type === "mission"}
        pkg={state.active.packages.find((pkg) => pkg.id === params.pkgId)}
        onPackageConfigured={handlePackageConfigured}
      />
    </StyleLayoutPackages>
  );
}

export { Packages };
