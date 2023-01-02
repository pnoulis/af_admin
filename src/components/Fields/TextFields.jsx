import {useState, useEffect} from 'react';
import {FormStore} from '/src/stores';

function handleInput(e, set, name, value) {
  e.preventDefault();
  set('setInput', name, value);
}



export function TextField_0({disabled, type, name, placeholder}) {
  const {fields, setForm} = FormStore.use();

  return (
    <div>
      <label htmlFor={name}>
        {name}
      </label>
      <input
      type={type || text}
      id={name}
      value={fields[name]}
      onChange={(e) => handleInput(e, setForm, name, e.target.value)}
      autoComplete='off'
      placeholder={placeholder}
      disabled={disabled}
      >
      </input>
    </div>
  )
}
