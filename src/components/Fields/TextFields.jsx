import {useState, useEffect} from 'react';
import {FormStore} from '/src/stores';


export function TextField_0({className, disabled, type, name, placeholder}) {
  const {fields, setForm} = FormStore.use();

  function handle(e) {
    e.preventDefault();
    setForm('setInput', name, e.target.value);
  }

  return (
    <div className={className + `${fields[name] ? ' hasText' : ' empty'}`}
    >
      <label className='label' htmlFor={name}>
        {name}
      </label>
      <input
      className='input'
      type={type || 'text'}
      id={name}
      onChange={(e) => handle(e)}
      autoComplete='off'
      placeholder={placeholder}
      disabled={disabled}
      >
      </input>
    </div>
  )
}
