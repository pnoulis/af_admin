import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "/assets/icons/arrow6-cropped.svg";

const StyleDropdown_0 = styled.div`
  position: relative;

  .selected {
    position: relative;
  }

  .selected-input {
    width: 100%;
    border-radius: var(--border-radius-0);
    border: 1px solid var(--input-text-color);
    font-family: "Roboto";
    font-size: var(--text-md);
    text-align: center;
    letter-spacing: 1.5px;
    outline: none;
    color: var(--input-text-color);
    cursor: pointer;
    position: relative;
    top: 0;
    left: 0;
    height: 4rem;
    padding: 1rem calc(1rem + 18px) 1rem 1rem;
  }

  .selected-icon {
    box-sizing: content-box;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 18px;
    height: 18px;
    transform: translateY(-50%) rotate(-90deg);
  }

  .list {
    position: absolute;
    box-shadow: var(--input-basic-border-box);
    border-radius: var(--border-radius-1);
    bottom: 5rem;
    left: 0;
    width: 100%;
    list-style: none;
    overflow: hidden;
    max-height: 0;
  }

  .item {
    position: relative;
    height: 4rem;
    background-color: #fafcfd;
    font-size: var(--text-nl);
    font-family: Roboto;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    max-height: 0;
    padding: 0;
    opacity: 0;
    text-transform: uppercase;
    box-shadow: 1px 1px 1px 1px var(--primary-strong);
  }

  &.open .selected-icon {
    transform: translateY(-50%) rotate(90deg);
  }

  &.open .list {
    max-height: 300px;
    overflow: auto;
  }

  &.open .item {
    max-height: 100%;
    overflow: initial;
    opacity: 1;
    padding: 1rem;
  }

  .item:hover {
    background-color: var(--primary-subtle);
  }

  &:not(.open) {
    .selected-input:not(:placeholder-shown) {
      background-color: var(--primary-strong);
      color: white;
      text-transform: uppercase;
    }

    .selected-input:not(:placeholder-shown) ~ .selected-icon {
      fill: white;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  padding: 20px;

  & > div {
    min-height: 500px;
    width: 300px;
  }

  h1 {
    padding: 5px 10px;
    text-decoration: underline;
    font-size: 1.3rem;
    margin-bottom: 5px;
    color: white;
  }

  form {
    background-color: white;
  }
`;

function Dropdown_4({
  className,
  name,
  items,
  placeholder,
  variant,
  onSelected,
}) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [isOpen, setIsOpen]);

  const handleInputChange = useCallback(
    (e) => {
      if (e.target?.innerHTML) {
        setValue(e.target.innerHTML);
        handleDropdownClick(e.target.innerHTML);
      } else {
        setValue(e.target.value);
      }
    },
    [value, setValue]
  );

  useEffect(() => {
    if (!isOpen && value) {
      // onSelected(value);
    }
  }, [isOpen]);

  return (
    <StyleDropdown_0
      className={`${className ? className : ""} ${isOpen ? "open" : "closed"} ${
        !isOpen && value ? "isSelected" : ""
      }`}
    >
      <div className="selected">
        <input
          className="selected-input"
          type="text"
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onClick={handleDropdownClick}
          readOnly={variant === "fixed"}
          onChange={handleInputChange}
        />
        <span className="selected-icon">
          <Arrow />
        </span>
      </div>
      <ul className="list">
        {items.map((item, i) => (
          <li key={i} className="item" onClick={handleInputChange}>
            {item}
          </li>
        ))}
      </ul>
    </StyleDropdown_0>
  );
}

const dummyItems = ["one", "two", "three", "four", "five"];
export function displayDropdown_4() {
  return (
    <Container>
      <div>
        <h1>Interactive</h1>
        <Dropdown_4 items={dummyItems}></Dropdown_4>
      </div>
    </Container>
  );
}
