import React, { useReducer, useContext, useCallback } from "react";
import Field from "/src/lib/fields.js";

const actions = {
  setErrors(errors) {
    return { type: "ERRORS", errors };
  },
  setInput(name, value) {
    return { type: "INPUT", name, value };
  },
  setError(error) {
    return { type: "ERROR", error };
  },
  setSubmit(submitting) {
    return { type: "SUBMIT", submitting };
  },
};

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "ERROR":
      return { ...state, error: action.error };
    case "ERRORS":
      return { ...state, errors: action.errors };
    case "INPUT":
      newState = {
        ...state,
        fields: {
          ...state.fields,
          [action.name]: Field.reduce(action.name, action.value),
        },
        errors: {
          ...state.errors,
          [action.name]: Field.validate(action.name, action.value),
        },
      };
      return newState;
    case "RESET":
      return action.initialState;
    case "SUBMIT":
      return {
        ...state,
        submitting: action.submitting,
      };
    default:
      return state;
  }
}

const FORM_SCHEMA = {
  fields: {},
  errors: {},
  error: "",
  submitting: false,
};
const formContext = React.createContext(FORM_SCHEMA);
const useFormContext = () => useContext(formContext);
function useForm(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...FORM_SCHEMA,
    ...initialState,
  });
  const proxy = useCallback(
    (action, ...payload) => {
      if (action === "reset") {
        return dispatch({ type: "RESET", initialState });
      }
      dispatch(actions[action](...payload));
    },
    [initialState]
  );

  return [state, proxy];
}
const formStore = {
  Provide: formContext.Provider,
  init: useForm,
  use: useFormContext,
};
export default formStore;
