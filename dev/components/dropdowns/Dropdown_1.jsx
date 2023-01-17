import React, { Children, useState, useRef } from "react";
import styled from "styled-components";

const StyleDropdownBasic = styled.form`
  position: relative;
  .filter {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    height: 4rem;
    font-size: 1.1rem;
    background-color: #fafcfd;
  }

  .filter::placeholder {
    color: #333;
  }

  .list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    list-style: none;
    overflow: hidden;
    max-height: 0;
    margin-top: 4rem;
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

  .scrollbar {
  }
`;

const StyleDropdownInteractive = styled(StyleDropdownBasic)`
  .filter:hover {
    background-color: #ff908b;
    cursor: pointer;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
  }

  .filter:focus {
    outline: 0;
    background-color: #ff908b;
    color: #000;
  }

  .filter:focus::placeholder {
    color: #000;
  }

  &.open .list {
    max-height: 320px;
    overflow: auto;
  }

  &.open .item {
    max-height: 100%;
    overflow: initial;
    opacity: 1;
    padding: 1rem;
  }

  .item:hover {
    background-color: #ff908b;
  }
`;

const StyleDropdown = styled(StyleDropdownBasic)`
  &.closed.hover {
.filter {
background-color: #FF908B;
cursor: pointer;

}
  }

  &.open {
    .list {
      max-height: 320px;
      overflow: auto;
    }

.item {
max-height: 100%;
overflow; initial;
opacity: 1;
padding: 1rem;
}
  }

  &.open.filter.hover {
.filter {
background-color: #FF908B;
cursor: pointer;

}

  }

  &.open.filter.focused {
outline: 0;
background-color: #FF908B;
color: #000;

  }

  &.open.item.hover {
    .item:nth-of-type(odd) {
      background-color: #ff908b;
    }
  }

  &.open.item.active {
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

function Dropdown_1({ className, items, name }) {
  const [value, setValue] = useState("");

  return (
    <StyleDropdown className={className}>
      <input
        className="filter"
        type="text"
        name={name}
        id={name}
        value={value}
        placeholder="type to filter"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <ul className="list">
        {items.map((item, i) => (
          <li key={i} className="item">
            {item}
          </li>
        ))}
      </ul>
    </StyleDropdown>
  );
}

function Dropdown_2({ className, children, name }) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (e) => {
    setValue(e.target.innerHTML);
    setIsOpen(false);
  };

  return (
    <StyleDropdownInteractive
      className={`${className ? className : ""} ${isOpen ? "open" : ""}`}
    >
      <input
        className="filter"
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
export function displayDropdrown() {
  return (
    <Container>
      <div>
        <h1>interactive</h1>
        <Dropdown_2>{dummyItems}</Dropdown_2>
      </div>
      <div>
        <h1>idle state</h1>
        <Dropdown_1 className="closed" items={dummyItems} />
      </div>
      <div>
        <h1>closed hover</h1>
        <Dropdown_1 className="closed hover" items={dummyItems} />
      </div>
      <div>
        <h1>open</h1>
        <Dropdown_1 className="open" items={dummyItems} />
      </div>

      <div>
        <h1>open filter hover</h1>
        <Dropdown_1 className="open filter hover" items={dummyItems} />
      </div>

      <div>
        <h1>open filter focused</h1>
        <Dropdown_1 className="open filter focused" items={dummyItems} />
      </div>

      <div>
        <h1>open item hover</h1>
        <Dropdown_1 className="open item hover" items={dummyItems} />
      </div>

      <div>
        <h1>open item active</h1>
        <Dropdown_1 className="open item active" items={dummyItems} />
      </div>
    </Container>
  );
}
