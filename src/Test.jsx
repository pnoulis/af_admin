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
} from "/src/components/selects";


const options = ["one", "two", "three"];

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

      <FuzzyCombobox items={options}>
        <FuzzyComboboxTrigger name="country" label="select country" />
        <FuzzyComboboxList
          renderItem={(props, i) => (
            <FuzzyComboboxOption
              key={i}
              {...props}
            />
          )}
        />
      </FuzzyCombobox>
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
