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

import { TestActionMenu } from "/src/components/menus";

const items = ["one", "two", "three"];
function Test() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <p>iam testing</p>
      {/* <button onClick={() => setOpen((prev) => !prev)}>open dialog</button> */}
      <TestActionMenu />
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
