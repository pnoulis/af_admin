import styled, { css } from "styled-components";
import { StylePanelMain } from "/src/components/layouts";

const StyleAddPackage = styled(StylePanelMain)`
  display: grid;
  // Contents
  grid-template-rows: 1fr 200px;
  grid-template-columns: 1fr;
  grid-template-areas: "Packages" "toolbar";
`;

const StylePackageSelectionSection = styled.section`
  display: grid;
  // Contents
  grid-template-rows: 250px;
  grid-template-columns: repeat(3, 400px);
  grid-template-areas: "Missions Category Time";
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  // Appearance
  margin-top: 30px;
`;

const StyleToolbarSection = styled.section``;

const StylePackageConfiguratorCard = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  // Dimensions
  width: 100%;
  height: 100%;
  // Contents
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 20px;
  // Appearance
  border-radius: var(--border-radius-2);
  background-color: var(--card-basic-color);
  box-shadow: var(--card-basic-shadow);
  border: 4px solid var(--card-basic-color);
  cursor: pointer;
  border-color: ${(props) =>
    props.selected ? "var(--primary-strong)" : "none"};

  &:hover {
    border-color: var(--primary-strong);
  }

  .package-selected-indicator {
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    transform: translate(75%, -65%);
    fill: var(--primary-strong);
  }

  .package-title {
    font-family: NoirPro-Medium;
    font-size: var(--text-xxl);
    text-transform: uppercase;
    text-align: center;
    font-weight: 100;
  }

  .package-configurator {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .package-configurator-title {
    font-family: Roboto;
    font-size: var(--text-md);
    text-transform: uppercase;
    text-align: center;
    font-weight: 100;
    letter-spacing: 1px;
    word-spacing: 1px;
  }
`;
export {
  StyleAddPackage,
  StylePackageSelectionSection,
  StyleToolbarSection,
  StylePackageConfiguratorCard,
};
