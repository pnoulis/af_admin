import React, { useState } from "react";
import { RegisterPlayerForm, LoginPlayerForm } from "/src/components/player";
import {
  PlayerSelectionSectionStyle,
  RegisterPlayerStyle,
  SelectPlayerStyle,
  PlayerSelectionToggleButton as Toggle,
} from "./styles";

// const RegisterPlayerStyle = styled.section`
//   padding-top: 50px;
// `;
// const LoginPlayerStyle = styled.section`
//   margin: auto;
//   width: 100%;
//   max-width: 400px;

//   h3 {
//     font-size: var(--text-xl);
//     letter-spacing: 1.5px;
//     text-transform: capitalize;
//     width: max-content;
//     border-bottom: 2px solid var(--text);
//     margin-bottom: 25px;
//   }
// `;

// const AuthPanelStyle = styled.section`
//   grid-area: Login;
//   display: flex;
//   flex-flow: column nowrap;
// `;

// function RegisterPlayer() {
//   const [showModal, setShowModal] = useState(false);

//   const onClose = () => {
//     setShowModal(false);
//   };

//   return (
//     <RegisterPlayerStyle className="registration-container">
//       <RegisterPlayerButton
//         onClick={(e) => {
//           setShowModal(!showModal);
//         }}
//       >
//         new player
//       </RegisterPlayerButton>
//       <ToggleablePlayerForm register={showModal} />
//       {/* <Modal open={showModal} onClose={onClose}> */}
//       {/*   <RegisterPlayerForm /> */}
//       {/* </Modal> */}
//     </RegisterPlayerStyle>
//   );
// }

// function ToggleablePlayerForm({ register }) {
//   // allow admin to register a user
//   // allow admin to pick a user

//   return (
//     <React.Fragment>
//       {register === true ? <RegisterPlayerForm /> : <LoginPlayer />}
//     </React.Fragment>
//   );
// }

// function LoginPlayer() {
//   return (
//     <LoginPlayerStyle className="login-container">
//       <h3>player:</h3>
//       <LoginPlayerForm />
//     </LoginPlayerStyle>
//   );
// }

function RegisterPlayer() {
  return (
    <RegisterPlayerStyle>
      <RegisterPlayerForm></RegisterPlayerForm>
    </RegisterPlayerStyle>
  );
}

function SelectPlayer() {
  return (
    <SelectPlayerStyle>
      <LoginPlayerForm></LoginPlayerForm>
    </SelectPlayerStyle>
  );
}

export default function PlayerSelectionSection() {
  const [registerPlayer, setRegisterPlayer] = useState(false);

  return (
    <PlayerSelectionSectionStyle>
      <header className="grid-header">
        <Toggle onClick={() => setRegisterPlayer(!registerPlayer)}>
          {registerPlayer ? "cancel" : "new player"}
        </Toggle>
      </header>
      <section className="grid-workarea">
        {registerPlayer ? (
          <RegisterPlayer className="grid-workarea" />
        ) : (
          <SelectPlayer className="grid-workarea" />
        )}
      </section>
    </PlayerSelectionSectionStyle>
  );
}
