import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
.HeaderItem-link {
display: flex;
flex-flow: column nowrap;
width: 110px;
height: 100px;
padding: 10px 3px 0px 3px;
background-color: #555555;
align-items: center;
text-transform: uppercase;
font-size: 0.7em;
letter-spacing: 0.5px;
border-radius: 5px;
overflow-wrap: break-word;
text-align: center;
color: white;
fill: white;
}

.HeaderItem-content {
flex: 1;
display: flex;
align-items: center;
}

.HeaderItem-image {
width: 50px;
height: 50px;
}

.HeaderItem-link:not(.isActive):hover {
fill: black;
color: black;
background-color: rgba(240, 240, 240, 1);
}

.isActive {
background-color: #d199ff;
}
`;

export function HeaderItem({to, content, Img}) {
  return (
    <Container>
      <NavLink
        to={to}
        className={({isActive}) => isActive ? 'HeaderItem-link isActive' : 'HeaderItem-link'}
      >
        <Img className='HeaderItem-image'/>
        <strong className='HeaderItem-content'>{content}</strong>
      </NavLink>
    </Container>
  );
}
