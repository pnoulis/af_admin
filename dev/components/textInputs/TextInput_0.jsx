import React from 'react';
import styled from 'styled-components';


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
cursor: pointer;
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
  font-family: 'Roboto';
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
  transform: translate(20%, -50%);
  transition-property: top, font-size;
  transition-duration: 0.3s;
color: var(--text);
  pointer-events: none;
}

.input:focus ~ label, input:not(:placeholder-shown) ~ label {
  top: 0px;
  transition-property: top;
  transition-duration: 0.3s;
  font-size: 0.8em;
  background-color: white;
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

function TextInput_0({type, name, placeholder, disabled, ...props}) {
  return (
    <StyledTextInput>
      <input
        className='input'
        type={type || 'text'}
        id={name}
        autoComplete='off'
        placeholder={placeholder || ' '}
        disabled={disabled}
      >
      </input>
      <label className='label' htmlFor={name}>
        {name}
      </label>
    </StyledTextInput>
  );
}

const ContainTextInputs = styled.div`
display: flex;
gap: 20px;
width: 200px;
`;

export function TextInputs() {
  return (
    <React.Fragment>
      <ContainTextInputs>
        <TextInput_0 type='text' name='username'/>
      </ContainTextInputs>
    </React.Fragment>
  );
}
