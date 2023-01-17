import React, { useState, Children } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "/assets/icons/arrow1-cropped.svg";
import { ReactComponent as Arrow2 } from "/assets/icons/arrow6-cropped.svg";

const StyleDropdownBase = styled.form`
  position: relative;
  .filter {
    position: relative;
  }

  .filter-input {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 4rem;
    padding: 1rem calc(1rem + 20px) 1rem 1rem;
    font-size: 1.1rem;
    background-color: green;
    cursor: pointer;
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

  .filter-input:hover {
    background-color: red;
  }

  .list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    list-style: none;
    overflow: hidden;
    max-height: 0;
    margin-top: 5.4rem;
  }

  .item {
    position: relative;
    height: 4rem;
    background-color: #fafcfd;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    max-height: 0;
    padding: 0;
    opacity: 0;
  }

  .list-arrow {
    position: absolute;
    right: 1rem;
    top: 0;
    width: 15px;
    height: 15px;
    transform: rotate(-90deg);
    fill: white;
    margin-top: calc(5.4rem - 17px);
    z-index: 5;
  }
`;

const StyleDropdownInteractive = styled(StyleDropdownBase)`
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
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  background-color: grey;
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

function Dropdown_2({ className, children, name }) {
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
          placeholder="type to filter"
          onClick={() => setIsOpen((prev) => !prev)}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <span className="filter-icon">
          <Arrow2 />
        </span>
      </div>
      <span className="list-arrow">
        <Arrow />
      </span>
      <ul className="list">
        {Children.toArray(children).map((children, i) => (
          <li key={i} onClick={handleSelection} className="item">
            {children}
          </li>
        ))}
      </ul>
    </StyleDropdownInteractive>
  );
}

const dummyItems = ["one", "two", "three", "four", "five"];
export function displayDropdown_2() {
  return (
    <Container>
      <div>
        <h1>Interactive</h1>
        <Dropdown_2>{dummyItems}</Dropdown_2>
      </div>
    </Container>
  );
}
