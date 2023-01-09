import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Trash } from '/assets/icons/trash_1-cropped.svg';
import { ReactComponent as Edit } from '/assets/icons/edit_box_0.svg';
import { ReactComponent as Test } from '/assets/icons/air.svg';

function createRipple(event) {
  const button = event.currentTarget;
  const btnRect = button.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(btnRect.width, btnRect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
  circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}


const StyledButton = styled('button')`
// defaults
all: unset;
display: flex;
box-sizing: border-box;


// content
position: relative;
overflow: hidden;
flex-flow: column nowrap;
align-items: center;
justify-content: center;
text-align: center;
gap: .4em;
font-family: 'Roboto';
text-transform: uppercase;
text-align: center;
color: var(--text-on-dark-basic);


// dimensions
width: 50px;
height: 50px;
padding: 0.5em;

// appearance
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
background-color: var(--btn-accent-color);
cursor: pointer;
border-radius: var(--border-radius-1);


// dynamic

// position

.text {
flex: 2;
font-size: .6vw;
line-height: 1;
font-weight: bolder;
}

.icon {
fill: white;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
}

&:hover {
opacity: 0.8;
}

&:disabled {
opacity: 0.6;
}

  `;


const StyledButtonSmall = styled(StyledButton)`
width: 40px;
height: 40px;
padding: 3px;
gap: 2px;
.text {
text-transform: capitalize;
font-size: .5vw;
}
`;

const StyledButtonMedium = styled(StyledButton)`
width: 60px;
height: 60px;
`;

const StyledButtonLarge = styled(StyledButton)`
width: 70px;
height: 70px;
`;

const StyledButtonXLarge = styled(StyledButton)`
width: 80px;
height: 80px;

.text {
font-size: 0.8vw;
}
`;

const ButtonIcon = ({children, UpIcon, BotIcon, size, disabled}) => {
  const textOrder = UpIcon ? 2 : 1;
  const iconOrder = UpIcon ? 1 : 2;
  switch (size) {
  case 'sm':
    return (
      <StyledButtonSmall disabled={disabled} onClick={createRipple}>
        <span className='text' style={{order: textOrder}}>
          {children}
        </span>
        <span className='icon' style={{order: iconOrder}}>
          {UpIcon ? <UpIcon/> : <BotIcon/>}
        </span>
      </StyledButtonSmall>
    );
  case 'md':
    return (
      <StyledButtonMedium disabled={disabled} onClick={createRipple}>
        <span className='text' style={{order: textOrder}}>
          {children}
        </span>
      <span className='icon' style={{order: iconOrder}}>
        {UpIcon ? <UpIcon/> : <BotIcon/>}
      </span>
      </StyledButtonMedium>
    );
  case 'lg':
    return (
      <StyledButtonLarge disabled={disabled} onClick={createRipple}>
        <span className='text' style={{order: textOrder}}>
          {children}
        </span>
        <span className='icon' style={{order: iconOrder}}>
          {UpIcon ? <UpIcon/> : <BotIcon/>}
        </span>
      </StyledButtonLarge>
    );
  case 'xlg':
    return (
      <StyledButtonXLarge disabled={disabled} onClick={createRipple}>
        <span className='text' style={{order: UpIcon ? 2 : 1}}>
          {children}
        </span>
        <span className='icon' style={{order: UpIcon ? 1 : 2}}>
          {UpIcon ? <UpIcon/> : <BotIcon/>}
        </span>
      </StyledButtonXLarge>
    );
  default:
    return (
      <StyledButton disabled={disabled} onClick={createRipple}>
        <span className='text' style={{order: textOrder}}>
          {children}
        </span>
        <span className='icon' style={{order: iconOrder}}>
          {UpIcon ? <UpIcon/> : <BotIcon/>}
        </span>
      </StyledButton>
    );
  }
};

const ContainButtons = styled.div`
display: flex;
gap: 20px;
`;

export function Buttons() {
  return (
    <React.Fragment>
      <ContainButtons>
        <ButtonIcon size='sm' BotIcon={Trash}>add</ButtonIcon>
        <ButtonIcon BotIcon={Trash}>add</ButtonIcon>
        <ButtonIcon size='md' BotIcon={Trash}>add</ButtonIcon>
        <ButtonIcon size='lg' BotIcon={Trash}>add</ButtonIcon>
        <ButtonIcon size='xlg' BotIcon={Trash}>add</ButtonIcon>
      </ContainButtons>
      <ContainButtons>
        <ButtonIcon size='sm' UpIcon={Trash}>add</ButtonIcon>
        <ButtonIcon UpIcon={Trash}>add</ButtonIcon>
        <ButtonIcon size='md' UpIcon={Trash}>add</ButtonIcon>
        <ButtonIcon size='lg' UpIcon={Trash}>add</ButtonIcon>
        <ButtonIcon size='xlg' UpIcon={Trash}>add</ButtonIcon>
      </ContainButtons>
    </React.Fragment>
  );
}
