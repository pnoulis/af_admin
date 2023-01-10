import React, { useRef, useEffect, useState, useCallback } from "react";
import { ButtonText } from "/src/components/buttons";
import { Modal_0 as Modal } from "/src/components/modals";
import { RegisterPlayerForm, LoginPlayerForm } from "/src/components/player";
import styled from "styled-components";
import { Dialog } from "@mui/material";

const RegisterPlayerStyle = styled.section`
  padding-top: 50px;
`;
const LoginPlayerStyle = styled.section`
  margin: auto;
  width: 100%;
  max-width: 400px;

  h3 {
    font-size: var(--text-xl);
    letter-spacing: 1.5px;
    text-transform: capitalize;
    width: max-content;
    border-bottom: 2px solid var(--text);
    margin-bottom: 25px;
  }
`;

const AuthPanelStyle = styled.section`
  grid-area: Login;
  display: flex;
  flex-flow: column nowrap;
`;

const RegisterPlayerButton = styled(ButtonText)`
  width: 200px;
  height: 50px;
  align-self: flex-start;
`;

function RegisterPlayer() {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <RegisterPlayerStyle className="registration-container">
      <RegisterPlayerButton
        onClick={(e) => {
          setShowModal(!showModal);
        }}
      >
        new player
      </RegisterPlayerButton>
      <Modal open={showModal} onClose={onClose}>
        <RegisterPlayerForm />
      </Modal>
    </RegisterPlayerStyle>
  );
}

function LoginPlayer() {
  return (
    <LoginPlayerStyle className="login-container">
      <h3>player:</h3>
      <LoginPlayerForm />
    </LoginPlayerStyle>
  );
}

export default function AuthorizationPanel() {
  return (
    <AuthPanelStyle className="player-account-panel">
      <RegisterPlayer />
      <LoginPlayer />
    </AuthPanelStyle>
  );
}
