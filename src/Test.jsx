import * as React from "react";
import { useNavigate } from "react-router-dom";
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

import {
  UniMenuButton,
  UniMenuButtonTrigger,
  UniMenuButtonList,
  UniMenuButtonListMember,
} from "/src/components/menus";

import { fetchTest, fetch } from "/src/lib";

const items = ["one", "two", "three"];
function Some({ isActive, isSelected, handleSelection }) {
  const navigate = useNavigate();
  const myRef = React.useRef(null);

  React.useEffect(() => {
    if (isSelected) {
      handleSelection(() => {
        navigate("/app");
      });
    }
  }, [isSelected]);

  React.useEffect(() => {
    if (isActive) {
      console.log("will focus");
      myRef.current.focus();
    }
  }, [isActive]);

  return (
    <div>
      <a ref={myRef} id="sometihng" href="/app">
        click me
      </a>
    </div>
  );
}
function Test() {
  const [open, setOpen] = React.useState(true);

  fetch
    .get("books", {
      _quantity: 100,
      _locale: "en_US",
    })
    .then((res) => console.log(res));

  return (
    <div>
      <p>iam testing</p>
      {/* <button onClick={() => setOpen((prev) => !prev)}>open dialog</button> */}
      {/* <UniMenuButton> */}
      {/*   <UniMenuButtonTrigger> click me </UniMenuButtonTrigger> */}
      {/*   <UniMenuButtonList> */}
      {/*     <UniMenuButtonListMember */}
      {/*       index={0} */}
      {/*       render={(props) => <Some {...props} />} */}
      {/*     /> */}
      {/*     <UniMenuButtonListMember */}
      {/*       index={1} */}
      {/*       render={(props) => <Some {...props} />} */}
      {/*     /> */}
      {/*     <UniMenuButtonListMember */}
      {/*       index={2} */}
      {/*       render={(props) => <Some {...props} />} */}
      {/*     /> */}
      {/*   </UniMenuButtonList> */}
      {/* </UniMenuButton> */}
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
