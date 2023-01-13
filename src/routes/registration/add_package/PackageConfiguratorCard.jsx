import React from "react";
import { Dropdown_0 } from "/src/components/dropdowns";
import styled from "styled-components";
import { ReactComponent as Checkbox } from "/assets/icons/checkbox-cropped.svg";
import { StylePackageConfiguratorCard } from "./styles";

const Dropdown = styled(Dropdown_0)`
  .selected-input {
    border: none;
    background-color: var(--grey-2);
    border-radius: var(--border-radius-1);
    color: var(--text-on-white);
  }
`;

function PackageConfiguratorCard({ afPackage, onPackageConfigured }) {
  return (
    <StylePackageConfiguratorCard>
      <span className="package-selected-indicator">
        <Checkbox />
      </span>
      <h1 className="package-title">mission</h1>
      <section className="package-configurator">
        <h3 className="package-configurator-title">number of missions</h3>
        <Dropdown
          items={afPackage?.options || []}
          placeholder={"custom"}
          onSelected={(mission) => onPackageConfigured("mission", mission)}
        />
      </section>
    </StylePackageConfiguratorCard>
  );
}

export default PackageConfiguratorCard;
