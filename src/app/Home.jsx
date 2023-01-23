import * as React from "react";
import { Outlet } from "react-router-dom";
import { LayoutSite } from "/src/components/layouts";
import Sidebar from "/src/components/Sidebar";

function Home() {
  return (
    <LayoutSite>
      <header className="site--header"></header>
      <Sidebar />
      <main className="site--main">
        <Outlet />
      </main>
    </LayoutSite>
  );
}

export default Home;
