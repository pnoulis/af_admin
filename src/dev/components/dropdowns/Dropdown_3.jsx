import React, { Children, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "/assets/icons/arrow6-cropped.svg";

const StyleDropdownBase = styled.form`
  position: relative;
  .filter {
    position: relative;
  }

  .filter-input {
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
    padding: 1rem calc(1rem + 20px) 1rem 1rem;
  }

  .filter-icon {
    box-sizing: content-box;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 15px;
    height: 15px;
    transform: translateY(-50%) rotate(90deg);
  }

  .list {
    position: absolute;
    box-shadow: var(--input-basic-border-box);
    border-radius: var(--border-radius-1);
    top: 0;
    left: 0;
    width: 100%;
    list-style: none;
    overflow: hidden;
    max-height: 0;
    margin-top: 5rem;
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
`;

const StyleDropdownInteractive = styled(StyleDropdownBase)`
  &.open .filter-input {
  }
  &.open .filter-icon {
    transform: translateY(-50%) rotate(-90deg);
  }

  &.open .list {
    max-height: 150px;
    overflow: auto;
  }

  &.open .item {
    max-height: 100%;
    overflow: initial;
    opacity: 1;
    padding: 1rem;
  }

  .item:hover {
    background-color: var(--primary-base);
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

function Dropdown_3({ className, children, name }) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSelection = (e) => {
    setValue(e.target.innerHTML);
    setIsOpen(false);
  };

  return (
    <StyleDropdownInteractive
      className={`${className ? className : ""} ${isOpen ? "open" : ""}`}
    >
      <div className="filter">
        <input
          className="filter-input"
          type="text"
          name={name}
          id={name}
          value={value}
          placeholder="custom value"
          onClick={() => setIsOpen((prev) => !prev)}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <span className="filter-icon">
          <Arrow />
        </span>
      </div>
      <ul className="list">
        {Children.toArray(children).map((children, i) => (
          <li
            key={i}
            onClick={(e) => {
              setValue(e.target?.value || e.target.innerHTML);
            }}
            className="item"
          >
            {children}
          </li>
        ))}
      </ul>
    </StyleDropdownInteractive>
  );
}
const dummyItems = ["one", "two", "three", "four", "five"];
export function displayDropdown_3() {
  return (
    <Container>
      <div>
        <h1>Interactive</h1>
        <Dropdown_3>{dummyItems}</Dropdown_3>
      </div>
    </Container>
  );
}
