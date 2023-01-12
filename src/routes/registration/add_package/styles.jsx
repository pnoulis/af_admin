import styled from "styled-components";
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

const StylePackageCard = styled.div`
  // Dimensions
  width: 100%;
  height: 100%;
  // Contents
  padding: 20px;
  // Appearance
  border-radius: var(--border-radius-2);
  background-color: var(--card-basic-color);
  box-shadow: var(--card-basic-shadow);
  border: 4px solid var(--card-basic-color);
  cursor: pointer;

  &:hover {
    border-color: var(--primary-strong);
  }

  .package-card-title {
    font-family: NoirPro-Medium;
    font-size: var(--text-xxl);
    text-transform: uppercase;
    text-align: center;
    font-weight: 100;
    margin-bottom: 50px;
  }

  .package-card-configurator {
    background-color: green;
  }
`;

export {
  StyleAddPackage,
  StylePackageSelectionSection,
  StyleToolbarSection,
  StylePackageCard,
};
