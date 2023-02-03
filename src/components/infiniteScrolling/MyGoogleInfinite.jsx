import * as React from "react";
import { fetch } from "/src/lib";
import styled from "styled-components";

const Container = styled.div`
  background-color: green;
  min-height: 200px;
  overflow: scroll;
  max-height: 200px;
  width: 200px;
  margin: auto;

  #book {
    height: 10px;
  }

  scrollbar-color: red yellow;
`;

const Loader = styled.div`
  position: relative;
  #loader {
    position: absolute;
    bottom: 200px;
    display: block;
    height: 20px;
    background-color: red;
    width: 100%;
  }

  #appender {
    display: block;
    background-color: blue;
    width: 100%;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: block;
  padding: 10px;
  width: 150px;
  background-color: blue;
  margin: auto;
`;

async function getBooks(number = 20) {
  const data = await fetch.get("/books", {
    _quantity: number,
    _locale: "en_US",
  });
  return data;
}

function MyGoogleInfinite() {
  const [books, setBooks] = React.useState([]);
  const [dataPending, setDataPending] = React.useState(true);
  const loaderRef = React.useRef(null);
  const appenderRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const dataRef = React.useRef([]);

  function getMoreBooks(observer) {
    console.log("should load data");
    observer.unobserve(loaderRef.current);
    setDataPending((pending) => {
      if (pending) return pending;
      getBooks().then((res) => {
        dataRef.current = res.data;
        setTimeout(() => {
          setDataPending(false); //switch to not pending
        }, 1000); //delay;
      });
      return !pending; //switch to pending
    });
  }

  function insertNewItems(observer) {
    console.log("should append more data");
    console.log(dataRef.current);
    if (dataRef.current.length > 0) {
      console.log("new books to add");
      return setBooks((prev) => {
        observer.observe(loaderRef.current);
        return [...prev, ...dataRef.current];
      });
    }
    //observer.observe(loaderRef.current);
    // if (dataRef.current.length > 0) {
    //   // observe the sentinel.
    //   appenderRef.current.disabled = true;
    //   return setBooks((prev) => [...prev, ...dataRef.current]);
    // }

    // // data has been fetched but data is empty.
    // if (!dataPending) {
    // }
  }

  React.useEffect(() => {
    getBooks().then((res) => {
      setBooks((prev) => {
        setDataPending(false);
        return res.data;
      });
    });
  }, []);

  React.useEffect(() => {
    console.log(`data pending:${dataPending}`);
  }, [dataPending]);

  function reset() {
    setBooks([]);
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          console.log(entry);
          if (entry.target.id === "appender") {
            if (entry.intersectionRatio < 1) {
              insertNewItems(observer);
            }
          } else if (entry.target.id === "loader") {
            if (entry.isIntersecting) {
              getMoreBooks(observer);
            }
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: "0px 0px 200px 0px",
      }
    );
    observer.observe(loaderRef.current);
    observer.observe(appenderRef.current);
    return () => {
      observer.unobserve(loaderRef.current);
      observer.unobserve(appenderRef.current);
    };
  }, []);
  return (
    <div>
      <Button onClick={getMoreBooks}>get more books</Button>
      <Button onClick={reset}>reset</Button>
      <Container ref={containerRef}>
        {books.map((book, i) => (
          <div key={i} className="book">
            {book.title}
          </div>
        ))}
        <Loader>
          <span ref={loaderRef} id="loader"></span>
          <Button ref={appenderRef} id="appender" disabled={dataPending}>
            {dataPending ? "Loading more items..." : "show more"}
          </Button>
        </Loader>
      </Container>
    </div>
  );
}

export { MyGoogleInfinite };
