import * as React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { StylePanel } from "/src/components/layouts";
import { Header } from "./Header";

function Register() {
  const { pathname: location } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location === '/register') {
      navigate('team/players', {
        replace: true,
        relative: true,
      });
    }
  }, [location]);

  return (
    <StylePanel>
      <Header />
      <Outlet/>
    </StylePanel>
  );
}

export default Register;
