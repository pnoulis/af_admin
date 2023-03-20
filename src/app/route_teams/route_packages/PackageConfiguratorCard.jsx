import styled from "styled-components";
import { Dropdown_0 } from "/src/components/dropdowns";
import { ReactComponent as Checkbox } from "/assets/icons/checkbox-cropped.svg";

const Dropdown = styled(Dropdown_0)`
  .selected-input {
    border: none;
    background-color: var(--grey-2);
    border-radius: var(--border-radius-1);
    color: var(--text-on-white);
  }
`;

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
  box-shadow: 5px -5px 50px rgba(0, 0, 0, 0.1), -1px 1px 20px rgba(0, 0, 0, 0.1);
  // box-shadow: var(--card-basic-shadow-2);
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

const StylePackagePrice = styled.span`
  padding: 7px 15px;
  text-align: center;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  border-radius: 5px;
  background-color: var(--primary-strong);
  font-size: var(--text-xl);
  font-family: NoirPro-Medium;
  color: white;
  letter-spacing: 2px;
`;

function PackageConfiguratorCard({
  title,
  subtitle,
  catalogue,
  placeholder,
  selected,
  pkg,
  onPackageConfigured,
  className,
}) {
  return (
    <StylePackageConfiguratorCard className={className}>
      {selected && (
        <StylePackagePrice>{pkg?.netCost || 0}&euro;</StylePackagePrice>
        /* <span className="package-selected-indicator"> */
        /*   <Checkbox /> */
        /* </span> */
      )}
      <h1 className="package-title">{title}</h1>
      <section className="package-configurator">
        <h3 className="package-configurator-title">{subtitle}</h3>
        <Dropdown
          key={pkg?.id || 0}
          items={
            catalogue.map((p) => ({
              ...p,
              selected:
                pkg?.catalogue && selected && pkg.catalogue.amount === p.amount,
              label: `${p.amount} ${p.unit}`,
            })) || []
          }
          reset={!selected}
          placeholder={placeholder || title}
          onSelected={onPackageConfigured}
        />
      </section>
    </StylePackageConfiguratorCard>
  );
}

export { PackageConfiguratorCard };
