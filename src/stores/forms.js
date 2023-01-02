import React, { useReducer, useContext, useCallback } from 'react';
import Field from '/src/lib/fields.js';

const actions = {
  setErrors(errors) {
    return { type: 'ERRORS', errors };
  },
  setInput(name, value) {
    return { type: 'INPUT', name, value };
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'ERRORS':
      return { ...state, errors: action.errors };
    case 'INPUT':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.name]: Field.reduce(action.name, action.value)
        },
        errors: {
          ...state.errors,
          [action.name]: Field.validate(action.name, action.value)
        }
      };
    default:
      return state;
  }
}

const FORM_SCHEMA = {
  fields: {},
  errors: {}
};
const formContext = React.createContext(FORM_SCHEMA);
const useFormContext = () => useContext(formContext);
function useForm(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, { ...FORM_SCHEMA, ...initialState });
  const proxy = useCallback(
    (action, ...payload) => dispatch(actions[action](...payload))
    , [initialState]
  );

  return [state, proxy];
}
const formStore = {
  Provide: formContext.Provider,
  init: useForm,
  use: useFormContext,
};
export default formStore;
