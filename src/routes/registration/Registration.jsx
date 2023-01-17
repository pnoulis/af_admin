import React, { useEffect } from "react";
import { StylePanel } from "/src/components/layouts";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

function Register() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   // navigate("team/player/add");
  // }, []);
  return (
    <StylePanel>
      <Header />
    </StylePanel>
  );
}

export default Register;
