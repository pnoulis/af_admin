import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Crescent } from '/assets/icons/moon3-cropped.svg';


const DarkModeToggle = styled.div`
background-color: hsl(204, 19%, 26%);
border-radius: 50px;
// box-shadow: -.5px 0 .2px .5px hsl(40, 10%, 70%), .5px -.5px .5px .5px hsl(40, 10%, 80%);
cursor: pointer;
aspect-ratio: 2.25 / 1;
padding: 0.15em;

input {
display: none;
}

label {
height: 100%;
width: 100%;
display: block;
position: relative;
}

.ball {
position: absolute;
background-color: white;
border-radius: 50%;
top: 50%;
z-index: 2;
transition: transform 0.2s linear;


height: calc(100% - 0.15em / 2);
aspect-ratio: 1 / 1;
transform: translateY(-50%);
}

.crescent {
z-index: 1;
position: absolute;
top: 50%;
transition: transform 0.2s linear, fill 1s linear;
fill: rgba(145, 163, 176);

height: calc(100% - 0.15em / 2);
aspect-ratio: 1 / 1;
transform: translateY(-50%) rotate(35deg);
}

input:checked + label .crescent {
fill: #F5AF19;
}
`;


export function DarkMode({size}) {
  let Container;
  switch (size) {
  case 'sm':
    Container = styled(DarkModeToggle)`
height: 15px;

.ball {
height: 13px;
right: -1px;
}

.crescent {
height: 12px;
left: -1px;
}

input:checked + label .ball {
transform: translate(-135%, -50%);
}

input:checked + label .crescent {
transform: translate(160%, -50%) rotate(-147deg);
}

`;
    break;
  case 'md':
    Container = styled(DarkModeToggle)`
height: 30px;
.ball {
height: 26px;
right: 0;
}

.crescent {
left: 0;
}

input:checked + label .ball {
transform: translate(-138%, -50%);
}

input:checked + label .crescent {
transform: translate(163%, -50%) rotate(-147deg);
fill: #F5AF19;
}

`;
    break;
  case 'lg':
    Container = styled(DarkModeToggle)`
height: 40px;
.ball {
right: 2px;
}

.crescent {
left: .5px;
}

input:checked + label .ball {
transform: translate(-140%, -50%);
}

input:checked + label .crescent {
transform: translate(150%, -50%) rotate(-147deg);
fill: #F5AF19;
}

`;
    break;
  default:
    Container = styled(DarkModeToggle)`
height: 20px;
.ball {
height: 17px;
right: 0;
}

.crescent {
height: 17px;
left: -.5px;
}

input:checked + label .ball {
transform: translate(-136%, -50%);
}

input:checked + label .crescent {
transform: translate(145%, -50%) rotate(-147deg);
fill: #F5AF19;
}
`;
    break;
  }
  return (
    <Container>
      <input onChange={(e) => {
        document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
      }} type='checkbox' name='darkMode' id={`darkMode${size || 'nm'}`}/>
      <label htmlFor={`darkMode${size || 'nm'}`}>
        <Crescent className='crescent'/>
        <span className='ball'></span>
      </label>
    </Container>
  );
}

export function DarkModeToggles() {
  return (
    <React.Fragment>
      <DarkMode size='sm'/>
      <DarkMode/>
      <DarkMode size='md'/>
      <DarkMode size='lg'/>
      <p style={{backgroundColor: 'var(--primary-color)'}}>hello bro</p>
    </React.Fragment>
  );
}
