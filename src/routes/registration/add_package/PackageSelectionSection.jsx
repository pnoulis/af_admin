import { StylePackageSelectionSection, StylePackageCard } from "./styles";

function PackageSelectionSection() {
  return (
    <StylePackageSelectionSection>
      <StylePackageCard>
        <h1 className="package-card-title">mission</h1>
        <section className="package-card-configurator">configurator</section>
      </StylePackageCard>
      <StylePackageCard>
        <h1 className="package-card-title">category</h1>
        <section className="package-card-configurator">configurator</section>
      </StylePackageCard>
      <StylePackageCard>
        <h1 className="package-card-title">time</h1>
        <section className="package-card-configurator">configurator</section>
      </StylePackageCard>
    </StylePackageSelectionSection>
  );
}

export default PackageSelectionSection;
