import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GlobalStore, FormStore } from "/src/stores";
import { TextField_0 } from "/src/components/Fields";
import styled from "styled-components";
import Client from "/src/mqtt";
import { ReactComponent as Arrow1 } from "/assets/icons/arrow1.svg";
import { ReactComponent as Arrow2 } from "/assets/icons/arrow2.svg";
import { ReactComponent as Arrow3 } from "/assets/icons/arrow3.svg";
import { ReactComponent as Arrow4 } from "/assets/icons/arrow4.svg";
import { ReactComponent as Arrow6 } from "/assets/icons/arrow6.svg";
import { ReactComponent as Arrow7 } from "/assets/icons/arrow6-cropped.svg";
import { ReactComponent as Twitter } from "/assets/icons/svg_test_filled.svg";

const TextField = styled(TextField_0)`
  background-color: inherit;
  margin-top: 50px;
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  font-size: 1em;
  width: 200px;
  height: 55px;
  cursor: pointer;

  .label {
    padding: 0 5px;
    border-radius: 6px;
    letter-spacing: 1.5px;
    position: absolute;
    top: 50%;
    transform: translate(20%, -50%);
    transition-property: top, font-size;
    transition-duration: 0.3s;
  }

  .input {
    outline: none;
    border-radius: 6px;
    letter-spacing: 1.5px;
    width: 100%;
    height: 100%;
    border: 3px solid black;
    padding-left: 6px;
    padding-right: 6px;
    font-size: 0.9em;
    text-align: center;
  }

  &:focus-within {
    cursor: initial;
  }

  &.hasText .label,
  &:focus-within .label {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: white;
  }

  &:active {
  }

  &:hover {
  }
`;

function NewTeamForm() {
  const [team, setTeam] = FormStore.init({
    fields: {
      teamName: "",
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <FormStore.Provide value={{ ...team, setForm: setTeam }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField name="teamName" />
      </form>
    </FormStore.Provide>
  );
}

function Button({ children }) {
  const [state, setState] = useState("");
  function createRipple(e) {
    const button = e.currentTarget;
    const btnRect = button.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(btnRect.width, btnRect.height);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.offsetX - radius}px`;
    circle.style.top = `${e.offsetY - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  }
  return (
    <button className="ripple" onClick={createRipple}>
      {children}
    </button>
  );
}

const Button2 = ({ children }) => {
  function createRipple(event) {
    const button = event.currentTarget;
    const btnRect = button.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(btnRect.width, btnRect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
    circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  return <button onClick={createRipple}>{children}</button>;
};

function Selector({ children }) {
  return (
    <div className="select-one">
      <Arrow1 className="select-icon" />
      <Arrow2 className="select-icon" />
      <Arrow3 className="select-icon" />
      <Arrow4 className="select-icon" />
      <Arrow6 className="select-icon" />
      {children}
    </div>
  );
}

const ButtonIcon = ({ children, Img }) => {
  const ref = useRef(null);

  function createRipple(event) {
    const button = event.currentTarget;
    const btnRect = button.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(btnRect.width, btnRect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
    circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  useEffect(() => {
    if (ref.current) {
      ref.current = ref.current.children[0];
      const box = ref.current.getBBox();
      const viewbox = [
        box.x,
        box.y,
        Math.round(box.width),
        Math.round(box.height),
      ].join(" ");
      ref.current.setAttribute("viewBox", viewbox);
    }
  }, []);

  return (
    <button ref={ref} className="button-icon">
      <Img className="button-icon-img" />
      <span className="button-icon-text">{children}</span>
    </button>
  );
};

function Dropdown() {
  const [val, setVal] = useState("default");

  return (
    <div
      className="dropdown"
      onClick={(e) => {
        e.currentTarget.classList.toggle("open");
      }}
    >
      <section className="header">
        <input type="text" value={val} className="chosen-value" disabled />
        <Arrow6 className="icon" />
      </section>
      <ul
        className="value-list"
        onClick={(e) => {
          setVal(e.target.innerHTML);
        }}
      >
        <li>one</li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
        <li>five</li>
      </ul>
    </div>
  );
}

export default function Test() {
  return (
    <React.Fragment>
      <section className="container4">
        <ButtonIcon Img={Twitter}>register</ButtonIcon>
        <ButtonIcon Img={Arrow4}>Login</ButtonIcon>
        <Dropdown />
      </section>
    </React.Fragment>
  );
}
