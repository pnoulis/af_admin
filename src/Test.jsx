import * as React from "react";
import styled from "styled-components";
import {
  useInteractions,
  useFloating,
  useListNavigation,
  FloatingFocusManager,
} from "@floating-ui/react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxList,
  ComboboxOption,
  EditableCombobox,
  EditableComboboxTrigger,
  EditableComboboxList,
  EditableComboboxOption,
  FuzzyCombobox,
  FuzzyComboboxTrigger,
  FuzzyComboboxList,
  FuzzyComboboxOption,
  ComboTest,
} from "/src/components/selects";

function useSomeHook() {
  const [state, setState] = React.useState("");

  React.useEffect(() => {
    console.log("useSomeHook state");
  }, [state]);

  return {
    onChange: ({ target }) => setState(target.value),
  };
}

const options = ["one", "two", "three"];

function SomeComponent() {
  const props = useSomeHook();

  React.useEffect(() => {
    console.log("some component state");
  }, [props]);

  return (
    <div>
      <input type="text" {...props} />
    </div>
  );
}

function Test() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <p>iam testing</p>
      {/* <button onClick={() => setOpen((prev) => !prev)}>open dialog</button> */}
      {/* <Combobox name="country" placeholder="select a country"> */}
      {/*   <ComboboxTrigger /> */}
      {/*   <ComboboxList> */}
      {/*     {options.map((option, i) => ( */}
      {/*       <ComboboxOption key={option} index={i}> */}
      {/*         {option} */}
      {/*       </ComboboxOption> */}
      {/*     ))} */}
      {/*   </ComboboxList> */}
      {/* </Combobox> */}

      {/* <EditableCombobox name="country" placeholder="select a country"> */}
      {/*   <EditableComboboxTrigger /> */}
      {/*   <EditableComboboxList> */}
      {/*     {options.map((option, i) => ( */}
      {/*       <EditableComboboxOption key={option} index={i} label={option}> */}
      {/*         {option} */}
      {/*       </EditableComboboxOption> */}
      {/*     ))} */}
      {/*   </EditableComboboxList> */}
      {/* </EditableCombobox> */}

      {/* <FuzzyCombobox items={options}> */}
      {/*   <FuzzyComboboxTrigger name="country" label="select country" /> */}
      {/*   <FuzzyComboboxList */}
      {/*     renderItem={(props, i) => <FuzzyComboboxOption key={i} {...props} />} */}
      {/*   /> */}
      {/* </FuzzyCombobox> */}

      <ComboTest />
    </div>
  );
}

const routes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export default routes;
