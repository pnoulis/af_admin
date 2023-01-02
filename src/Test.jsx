import * as React from 'react';
import { useState, useEffect } from 'react';
import { GlobalStore, FormStore } from '/src/stores';
import { TextField_0 } from '/src/components/Fields';
import styled from 'styled-components';
import Client from '/src/mqtt';


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

&.hasText .label, &:focus-within .label {
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

`

function NewTeamForm() {
  const [team, setTeam] = FormStore.init({
    fields: {
      teamName: '',
    }
  });
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <FormStore.Provide value={{ ...team, setForm: setTeam }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          name='teamName'
        />
      </form>
    </FormStore.Provide>
  )
}

export default function Test() {

  return (
    <React.Fragment>
      <NewTeamForm />
    </React.Fragment>
  );
}
