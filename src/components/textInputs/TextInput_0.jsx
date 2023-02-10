import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { FormStore } from "/src/stores";

const StyledTextInput = styled.div`
  // defaults
  all: unset;
  display: block;
  box-sizing: border-box;

  // content
  // dimensions
  width: 100%;
  height: 55px;
  // appearance
  // dynamic
  pointer-events: none;
  // position
  position: relative;

  .input {
    pointer-events: auto;
    width: 100%;
    height: 100%;
    padding: 0 6px;
    border-radius: var(--border-radius-0);
    border: 1px solid var(--input-text-color);
    font-family: "Roboto";
    font-size: var(--text-md);
    text-align: center;
    letter-spacing: 1.5px;
    outline: none;
    color: var(--input-text-color);
  }

  .label {
    padding: 0 5px;
    border-radius: var(--border-radius-0);
    letter-spacing: 1.5px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(20px, -50%);
    transition-property: top, font-size;
    transition-duration: 0.3s;
    color: var(--text);
    pointer-events: none;
  }

  .input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: var(--background-contrast);
  }

  .input:disabled ~ .label {
    color: var(--input-text-color);
  }

  &.error .input {
    border: 1.5px solid var(--error);
  }

  &.error .label {
    color: var(--error);
  }

  &.success .input {
    border: 1.5px solid var(--success);
  }

  &.success .label {
    color: var(--success-strong);
  }
`;

function TextInput_0({ className, type, name, placeholder, ...props }) {
  const { fields, errors, setForm } = FormStore.use();
  const onChange = useCallback(
    (e) => {
      setForm("setInput", name, e.target.value);
    },
    [name]
  );
  return (
    <StyledTextInput className={className}>
      <input
        className="input"
        type={type || "text"}
        id={name}
        autoComplete="off"
        placeholder={placeholder || " "}
        onChange={onChange}
        value={fields[name]}
        {...props}
      ></input>
      <label className="label" htmlFor={name}>
        {name}
      </label>
    </StyledTextInput>
  );
}

function createTextInput(Style) {
  return styled(TextInput_0)`
    ${Style}
  `;
}

export { StyledTextInput, TextInput_0 };
