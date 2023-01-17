import React, { useState, useCallback } from "react";
import { StyleToolbarSection } from "./styles";
import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";
import styled from "styled-components";
import afDiscounts from "/dummy_backend/discounts.json" assert { type: "json" };
import { Dropdown_0 } from "/src/components/dropdowns";
import { Modal_1 as Modal } from "/src/components/modals";
import { ReactComponent as Cancel } from "/assets/icons/cancel_1-cropped.svg";

import { ReactComponent as EuroIcon } from "/assets/icons/euro-cropped.svg";

const StyleModal = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  // Dimensions
  width: 100%;
  height: 100%;
  // Contents
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  // Appearance
  border-radius: var(--border-radius-2);
  background-color: var(--card-basic-color);
  box-shadow: var(--card-basic-shadow);
  border: 4px solid var(--card-basic-color);

  .modal-title {
    font-family: NoirPro-Medium;
    font-size: var(--text-xxl);
    text-transform: uppercase;
    text-align: center;
    font-weight: 100;
  }
  .modal-dropdown {
    z-index: 25;
  }
  .modal-close-icon {
    box-sizing: content-box;
    padding: 5px;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    fill: var(--primary-medium);
    stroke-width: 1.5;
    stroke: white;
    cursor: pointer;
  }

  &:hover {
    border-color: var(--primary-strong);
  }
`;

const StyleDiscount = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .discount-toggle {
    width: max-content;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
  }

  .discount-toggle-title {
    font-family: NoirPro-Medium;
    font-size: var(--text-md);
    text-transform: uppercase;
    text-align: center;
    font-weight: 100;
  }

  .discount-toggle-icon {
    width: 100px;
  }

  .discount-toggle:hover {
    .discount-toggle-title {
      color: var(--primary-strong);
    }
    .discount-toggle-icon {
      fill: var(--primary-strong);
    }
  }
`;

const PlayersListStyle = styled.ul`
  all: unset;
  box-sizing: border-box;
  background-color: white;
  display: flex;

  // Dimensions
  min-width: 100%;
  min-height: 100%;

  // Contents
  flex-flow: column nowrap;
  gap: 15px;

  // Appearance
  list-style-type: none;
  outline: none;
  text-decoration: none;
`;

const PlayerStyle = styled.div`
  all: unset;
  box-sizing: border-box;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

function Player({ id, username }) {
  return (
    <PlayerStyle>
      <span className="text">{username}</span>
      <section>
        <span>
          <EuroIcon width="20px" />
        </span>
        <span>100</span>
      </section>
      <section>
        <span>
          <DiscountIcon width="20px" />
        </span>
      </section>
    </PlayerStyle>
  );
}

function PlayersList({ players }) {
  return (
    <PlayersListStyle>
      {players.map((player, i) => (
        <li key={i}>
          <Player id={player.id} username={player.username}></Player>
        </li>
      ))}
    </PlayersListStyle>
  );
}

const Dropdown = styled(Dropdown_0)`
  .selected-input {
    border: none;
    background-color: var(--grey-2);
    border-radius: var(--border-radius-1);
    color: var(--text-on-white);
  }
`;

function Discount({ afDiscounts, onDiscountAdded }) {
  const [openDiscounts, setOpenDiscounts] = useState(false);

  function handleDiscountAdded(name) {
    console.log(afDiscounts);
    const discount = afDiscounts.find((dis) => dis.name === name);
    onDiscountAdded(discount);
  }

  const handleDiscountToggle = useCallback(() => {
    setOpenDiscounts((prev) => !prev);
  }, [openDiscounts]);

  return (
    <StyleDiscount>
      <Modal
        open={openDiscounts}
        position="replace"
        onClose={handleDiscountToggle}
      >
        <StyleModal>
          <h3 className="modal-title">discount</h3>
          <Dropdown
            items={afDiscounts.map((discount) => discount.name)}
            upside={true}
            placeholder="code"
            onSelected={handleDiscountAdded}
            className="modal-dropdown"
          />
          <span
            className="modal-close-icon"
            onClick={() => setOpenDiscounts(false)}
          >
            <Cancel />
          </span>
        </StyleModal>
      </Modal>
      <section className="discount-toggle">
        <h3 className="discount-toggle-title">add team discount code</h3>
        <span className="discount-toggle-icon">
          <DiscountIcon onClick={handleDiscountToggle} />
        </span>
      </section>
    </StyleDiscount>
  );
}

const playersList = [
  {
    id: "123",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "345",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "567",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "891",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "131",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
  {
    id: "121",
    firstname: "pavlos",
    lastname: "noulis",
    username: "esperos",
    phone: 123435234,
    email: "pnoulis@gmail.com",
  },
];

function ToolbarSection({ onDiscountAdded }) {
  return (
    <StyleToolbarSection>
      <Discount afDiscounts={afDiscounts} onDiscountAdded={onDiscountAdded} />
      <PlayersList players={playersList} />
    </StyleToolbarSection>
  );
}

export default ToolbarSection;
