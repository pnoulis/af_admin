import * as React from "react";
import styled from "styled-components";
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
  TestAsyncCombobox,
} from "/src/components/selects";

import {
  UniMenuButton,
  UniMenuButtonTrigger,
  UniMenuButtonList,
  UniMenuButtonListMember,
} from "/src/components/menus";

import {
  TestInfiniteScroll,
  Infinite,
  MyGoogleInfinite,
} from "/src/components/infiniteScrolling";
import { useInfiniteScrolling } from "/src/hooks";

import { fetch } from "/src/lib";

async function getBooks(number = 20) {
  const data = await fetch.get("/books", {
    _quantity: number,
    _locale: "en_US",
  });
  return data;
}

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

const Container = styled.div`
  background-color: yellow;
  width: 100%;
  min-height: max-content;
  max-height: 200px;
  overflow: scroll;

  .list {
    margin: auto;
    width: 200px;
    background-color: green;
  }
`;

function TestScrolling() {
  const once = React.useRef(false);
  const [books, setBooks] = React.useState([]);
  const { setRoot, setTarget } = useInfiniteScrolling(
    {
      offset: 50,
    },
    (observed) => {
      console.log(`is observed:${observed}`);
      if (observed) {
        getBooks().then((data) => {
          setBooks((prev) => [...prev, ...data.data]);
        });
      }
    }
  );

  React.useEffect(() => {
    console.log(`book length:${books.length}`);
  }, [books]);

  return (
    <Container ref={setRoot}>
      <ul className="list" ref={setTarget}>
        {books.map((book, i) => (
          <li key={i}>{book.title}</li>
        ))}
      </ul>
    </Container>
  );
}
function Test() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <p>iam testing</p>
      {/* <Infinite /> */}
      <MyGoogleInfinite />
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
