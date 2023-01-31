import * as React from "react";
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
} from "/src/components/selects";

const items = ["one", "two", "three"];
function Test() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <p>iam testing</p>
      {/* <button onClick={() => setOpen((prev) => !prev)}>open dialog</button> */}
      <Combobox items={items}>
        <ComboboxTrigger name="country" placeholder="select a country">
          country
        </ComboboxTrigger>
        <ComboboxList
          renderItem={(props, i) => <ComboboxOption key={i} {...props} />}
        />
      </Combobox>

      <EditableCombobox items={items}>
        <EditableComboboxTrigger name="country" placeholder="select a country">
          country
        </EditableComboboxTrigger>
        <EditableComboboxList
          renderItem={(props, i) => (
            <EditableComboboxOption key={i} {...props} />
          )}
        />
      </EditableCombobox>
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
