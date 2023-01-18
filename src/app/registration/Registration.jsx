import React, { useEffect } from "react";
import { StylePanel } from "/src/components/layouts";
import { Header } from "./Header";
import { Outlet, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("team/players", {
      replace: true,
      relative: true
    });
  }, []);
  return (
    <StylePanel>
      <Header />
      <Outlet/>
    </StylePanel>
  );
}

export default Register;
