import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import GlobalStore from '/src/stores/app.js';
import Client from '/src/mqtt';

const client = Client(true, 'msq', 'msq');

export default function Test() {

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <h1>Hi this is a test</h1>
    </React.Fragment>
  );
}
