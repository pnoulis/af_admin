import React, { useEffect } from "react";
import { LayoutPanel, StylePanelMain } from "/src/components/layouts";
import { Header } from "./registration";
import { Outlet, useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("team/player/add");
  }, []);
  return (
    <LayoutPanel>
      <Header />
      <StylePanelMain>
        <Outlet />
      </StylePanelMain>
    </LayoutPanel>
  );
}
