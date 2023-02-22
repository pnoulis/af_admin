import * as React from "react";
import styled from "styled-components";
import { Package } from "./Package";
import { AddPackage } from "./AddPackage";

const ScrollableListContext = React.createContext(null);
const useScrollableListContext = () => {
  const context = React.useContext(ScrollableListContext);
  if (context == null) {
    throw new Error(
      "ScrollableList children must be wrapped in <ScrollableList/>"
    );
  }
  return context;
};

function useScrollableList({ config }) {
  const statesRef = React.useRef({
    UNMOUNTED: 0,
    MOUNTED: 1,
    OVERFLOWING: 4,
    MOVING: 5,
  });
  const [state, setState] = React.useState(statesRef.current.UNMOUNTED);
  const containerRef = React.useRef(null);
  const contentRef = React.useRef([]);

  const events = {};
  events.focus = () => {};

  React.useEffect(() => {
    console.log(state);
    if (!containerRef.current?.parentElement) {
      throw new Error("<ScrollableList/> could not access parent element");
    }

    switch (state) {
      case 0:
        containerRef.current.setAttribute(
          "style",
          `max-height:${containerRef.current.parentElement.clientHeight};`
        );
        setState(statesRef.current.MOUNTED);
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        console.log("none of this");
        break;
    }
    // containerRef.current.setAttribute(
    //   "style",
    //   `max-height:${containerRef.current.parentElement.clientHeight};`
    // );

    // if (
    //   containerRef.offsetHeight < containerRef.scrollHeight ||
    //   containerRef.offsetWidth < containerRef.scrollWidth
    // ) {
    //   console.log("element is overflowing");
    // }

    // setState(statesRef.current.MOUNTED);
  }, [state, config]);

  return {
    refs: {
      container: containerRef,
      content: contentRef,
    },
    events,
  };
}

const StyleScrollableList = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 10px;
  overflow: auto;
  background-color: red;
`;
const StyleScrollableListContent = styled.ul``;

const StyleScrollableListContentItem = styled.li`
  min-height: 50px;
  background-color: green;
`;

const StyleScrollableListToolbar = styled.div``;

function ScrollableList({ children, ...config }) {
  const state = useScrollableList({ config });

  return (
    <ScrollableListContext.Provider value={state}>
      <StyleScrollableList ref={state.refs.container} {...config}>
        {children}
      </StyleScrollableList>
    </ScrollableListContext.Provider>
  );
}

function ScrollableListContent({ children, ...props }) {
  const state = useScrollableListContext();
  return <StyleScrollableListContent>{children}</StyleScrollableListContent>;
}

function ScrollableListContentItem({ render, ...props }) {
  const state = useScrollableListContext();
  return (
    <StyleScrollableListContentItem>
      {render({})}
    </StyleScrollableListContentItem>
  );
}

function ScrollableListToolbar({ children, ...props }) {
  const state = useScrollableListContext();
  return <StyleScrollableListToolbar>{children}</StyleScrollableListToolbar>;
}

const StylePackagesList = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 10px;
  overflow: auto;
  background-color: red;
`;

const StylePackageListItem = styled.li`
  flex: 0 0 55px;
  background-color: blue;
  width: 100%;
  border-radius: 15px;
`;

const StyleAddPackage = styled.li`
  flex: 0 0 55px;
  background-color: yellow;
  width: 100%;
`;

function FakeItem() {
  return <div>iam a fake item</div>;
}

function PackagesList({}) {
  const [items, setItems] = React.useState([]);

  const handleAddItem = () => {
    setItems((items) => [...items, 0]);
  };

  return (
    <ScrollableList>
      <ScrollableListContent>
        {items.map((item, i) => (
          <ScrollableListContentItem
            key={i}
            render={(props) => <FakeItem {...props} />}
          />
        ))}
      </ScrollableListContent>
      <ScrollableListToolbar>
        <div onClick={handleAddItem}>add item</div>
      </ScrollableListToolbar>
    </ScrollableList>
  );
}

// function PackagesList() {
//   const [height, setHeight] = React.useState(0);
//   const listRef = React.useRef(null);

//   React.useEffect(() => {
//     if (!height) {
//       setHeight(listRef.current.parentElement.clientHeight);
//     }
//   }, []);

//   if (!height) {
//     return <StylePackagesList ref={listRef}></StylePackagesList>;
//   }
//   return (
//     <StylePackagesList ref={listRef} style={{ maxHeight: height }}>
//       <ScrollableContent></ScrollableContent>
//     </StylePackagesList>
//   );
// }

export { PackagesList };
