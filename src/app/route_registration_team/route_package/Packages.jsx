import * as React from 'react';
import styled from 'styled-components';
import { PackageConfiguratorCard } from './PackageConfiguratorCard';
import afpackages from "/dummy_backend/afpackages.json" assert { type: "json" };

const StyleLayoutPackages = styled.section`
display: flex;
flex-flow: row nowrap;
background-color: green;
justify-content: space-around;
`;
const StyleLayoutItemConfiguratorCard = styled(PackageConfiguratorCard)`
flex: 0 0 400px;
height: 250px;
`;
function Packages({ className }) {
  const handlePackageConfigured = () => {};
  return (
    <StyleLayoutPackages className={className}>
      <StyleLayoutItemConfiguratorCard
        title="time"
        subtitle="amount of time"
        catalogue={[]}
        onPackageConfigured={handlePackageConfigured}
      />
      <StyleLayoutItemConfiguratorCard
        title="missions"
        subtitle="number of missions"
        catalogue={[]}
        onPackageConfigured={handlePackageConfigured}
      />
    </StyleLayoutPackages>
  )
}

export { Packages };
