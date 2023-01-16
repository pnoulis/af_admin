import { StyleToolbarSection } from "./styles";
import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";
import styled from "styled-components";
import afDiscounts from "/dummy_backend/discounts.json" assert { type: "json" };
import { Dropdown_0 } from "/src/components/dropdowns";

const StyleDiscount = styled.div`
  width: 200px;
  height: 200px;
`;

const Dropdown = styled(Dropdown_0)`
  .selected-input {
    border: none;
    background-color: var(--grey-2);
    border-radius: var(--border-radius-1);
    color: var(--text-on-white);
  }
`;

function Discount({ afDiscounts, onDiscountAdded }) {
  function handleDiscountAdded(name) {
    console.log(afDiscounts);
    const discount = afDiscounts.find((dis) => dis.name === name);
    onDiscountAdded(discount);
  }
  return (
    <StyleDiscount>
      <Dropdown
        items={afDiscounts.map((discount) => discount.name)}
        placeholder="code"
        onSelected={handleDiscountAdded}
      />
      <DiscountIcon />
    </StyleDiscount>
  );
}

function ToolbarSection({ onDiscountAdded }) {
  return (
    <StyleToolbarSection>
      <p>toolbar section</p>
      <Discount afDiscounts={afDiscounts} onDiscountAdded={onDiscountAdded} />
    </StyleToolbarSection>
  );
}

export default ToolbarSection;
