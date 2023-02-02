import * as React from "react";
import { fetch } from "/src/lib";
import styled from "styled-components";

const Container = styled.div`
  position: relative;

  .sentinel {
    position: absolute;
    width: 100%;
    background-color: red;
    height: 50px;
    bottom: 150vh;
  }

  --active-button-primary: #0080ff;
  --active-button-font: #ffffff;
  --disabled-button-primary: #f5f5f5;
  --disabled-button-secondary: #c4c4c4;
  --disabled-button-font: #000000;

  .item {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 1em;
  width: 100%;
  font-size: 1em;

  &:enabled {
    color: var(--active-button-font);
    background-color: var(--active-button-primary);
  }

  &:enabled .disabled-text {
    display: none;
  }

  &:disabled .active-text {
    display: none;
  }

  &:disabled {
    color: var(--disabled-button-font);
    color: var(--disabled-button-primary);
    cursor: not-allowed;
    animation: 3s ease-in-out infinite loadingAnimation;
  }

  @keyframes loadingAnimation {
    0% {
      background-color: var(--disabled-button-primary);
    }
    50% {
      background-color: var(--disabled-button-secondary);
    }
    100% {
      background-color: var(--disabled-button-primary);
    }
  }
`;

let myBooks = [];
async function getBooks(number = 20) {
  const data = await fetch.get("/books", {
    _quantity: number,
    _locale: "en_US",
  });
  return data;
}

let requestPending = false;
let hasMore = false;
function Infinite() {
  const containerRef = React.useRef(null);
  const sentinelRef = React.useRef(null);
  const loadingButtonRef = React.useRef(null);
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    // if (!books.length) {
    //   requestPending = true;
    //   getBooks().then((res) => {
    //     setBooks((prev) => [...prev, ...res.data]);
    //     requestPending = false;
    //     loadingButtonRef.current.disabled = false;
    //   });
    // }
  }, [books]);

  function requestHandler() {
    console.log("request handler");
    if (requestPending) return;
    requestPending = true;
    getBooks().then((res) => {
      myBooks = [...res.data];
      requestPending = false;
      loadingButtonRef.current.disabled = false;
    });
  }

  const listObserver = React.useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(`entry: ${entry.isIntersecting}`);
          if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) {
            insertNewItems();
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px",
      }
    )
  );

  const sentinelObserver = React.useRef(
    new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        console.log(`entry intersection ratio:${entry.intersectionRatio}`);
        console.log(entry);
        if (entry.intersectionRatio > 0) {
          observer.unobserve(sentinelRef.current);
          requestHandler();
        }
      });
    })
  );

  function insertNewItems() {
    console.log("will insert new items");
    sentinelObserver.current.observe(sentinelRef.current);
    loadingButtonRef.current.disabled = true;
    setBooks((prev) => [...prev, ...myBooks]);
  }

  React.useEffect(() => {
    sentinelObserver.current.observe(sentinelRef.current);
    listObserver.current.observe(loadingButtonRef.current);
    loadingButtonRef.current.addEventListener("click", insertNewItems);
  }, []);

  return (
    <Container ref={containerRef}>
      <div ref={sentinelRef} className="sentinel"></div>
      <div className="item">A</div>
      <div className="item">B</div>
      <div className="item">C</div>
      <div className="item">D</div>
      <div className="item">E</div>
      {books.map((book, i) => (
        <div key={i} className="item">
          {book.title}
        </div>
      ))}
      <Button ref={loadingButtonRef} disabled>
        <span className="disabled-text">Loading more items...</span>
        <span className="active-text">Show more</span>
      </Button>
    </Container>
  );
}

export { Infinite };
