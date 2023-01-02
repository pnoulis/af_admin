import * as React from 'react';
import { useState, useEffect } from 'react';
import { GlobalStore, FormStore } from '/src/stores';
import { TextField_0 } from '/src/components/Fields';
import Client from '/src/mqtt';



function NewTeamForm() {
  const [team, setTeam] = FormStore.init({
    fields: {
      teamName: '',
    }
  });
  function handleSubmit(e) {
    e.preventDefault();
  }
  console.log(team);
  return (
    <FormStore.Provide value={{ ...team, setForm: setTeam }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField_0
          type='text'
          name='teamName'
        />
      </form>
    </FormStore.Provide>
  )
}

export default function Test() {

  return (
    <React.Fragment>
      <h1>Hi this is a test</h1>
      <NewTeamForm />
    </React.Fragment>
  );
}
