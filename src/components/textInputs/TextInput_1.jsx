import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { FormStore } from "/src/stores";

const StyleTextInput_1 = styled.div`
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

  &.error .input {
    border: 1.5px solid var(--error);
  }

  &.success .input {
    border: 1.5px solid var(--success);
  }
`;

function TextInput_1({ className, type, name, placeholder, ...props }) {
  const { fields, errors, setForm } = FormStore.use();
  const onChange = useCallback(
    (e) => {
      setForm("setInput", name, e.target.value);
    },
    [name]
  );
  return (
    <StyleTextInput_1 className={className}>
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
    </StyleTextInput_1>
  );
}

export { TextInput_1 };
