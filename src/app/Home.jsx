import * as React from "react";
import { Outlet } from "react-router-dom";
import { LayoutSite } from "/src/components/layouts";
import Sidebar from "/src/components/Sidebar";
import FlashMessages from "./FlashMessages";
import useFlashMessages from "./useFlashMessages";

const Flash = () => {
  return (
    <div style={{ color: "white", backgroundColor: "green" }}>
      <p>iam a flash message</p>
    </div>
  );
};

function Home() {
  const flashMessage = useFlashMessages();
  React.useEffect(() => {
    setTimeout(() => {
      console.log("will creat ea flash message");
      flashMessage(<Flash />);
    }, 1000);
  }, []);

  return (
    <LayoutSite>
      <header className="site--header"></header>
      <Sidebar />
      <main className="site--main">
        <Outlet />
      </main>
      <div id="flash-messages"></div>
    </LayoutSite>
  );
}

export default Home;
