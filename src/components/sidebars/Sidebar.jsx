import * as React from "react";
import { useSidebarContext, SidebarContext } from "./SidebarContext";
import { useSidebar } from "./useSidebar";
import {
  StyleSidebar,
  StyleFakeItem,
  StyleToolbar,
  StyleSidebarScrollable,
} from "./styles";

function Sidebar({ children, className }) {
  const sidebar = useSidebar();
  return (
    <SidebarContext.Provider value={sidebar}>
      <StyleSidebar className={className}>{children}</StyleSidebar>
    </SidebarContext.Provider>
  );
}

function SidebarContent({ children }) {
  return <StyleSidebarScrollable>{children}</StyleSidebarScrollable>;
}

function SidebarToolbar({ children, className }) {
  const state = useSidebarContext();
  return <StyleToolbar {...state?.props?.toolbar}>{children}</StyleToolbar>;
}

function SomeSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <StyleFakeItem>one</StyleFakeItem>
        <StyleFakeItem>two</StyleFakeItem>
        <StyleFakeItem>three</StyleFakeItem>
        <StyleFakeItem>four</StyleFakeItem>
        <StyleFakeItem>five</StyleFakeItem>
        <StyleFakeItem>six</StyleFakeItem>
        <StyleFakeItem>seven</StyleFakeItem>
        <StyleFakeItem>eight</StyleFakeItem>
      </SidebarContent>
      <SidebarToolbar>toehunoehtu</SidebarToolbar>
    </Sidebar>
  );
}

export { SomeSidebar as Sidebar };
