import React from 'react';
import addPlayer from '/src/assets/add_player.svg';
import mergeTeam from '/src/assets/merge_team.svg';
import packageSVG from '/src/assets/package.svg';
import summary from '/src/assets/summary.svg';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const Container = styled.header`
display: flex;
flex-flow: row nowrap;
gap: 10px;
justify-content: flex-start;
height: 100px;
background-color: white;

div {
    display: flex;
    flex-flow: column nowrap;
    background-color: #555555;
    box-sizing: content-box;
    width: 100px;
    height: 90px;
    padding: 8px 5px;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.8em;
    border-radius: 5px;
    cursor: pointer;
    gap: 10px;
    letter-spacing: 0.8px;
    color: white;
    img {
        color: white;
        fill: white;
        height: 60%;
        width: 60%;
        position: relative;
    }

    a {
        cursor: pointer;
    }
}
`


const activeStyle = {
    backgroundColor: '#d199ff',
}

export default function Navbar() {
    return (
        <Container>
            {/* <div>
                <img src={addPlayer} alt='addPlayer' />
                <NavLink to='team/player/add'>
                    add player
                </NavLink>
            </div> */}
            <div>
                <img src={addPlayer} alt='addPlayer' />
                <NavLink to={'team/player/add'}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        add player
                </NavLink>
            </div>
            <div>
                <img src={mergeTeam} alt='mergeTeam' />
                <NavLink to={'team/create'}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        merge team
                </NavLink>
            </div>
            <div>
                <img src={packageSVG} alt='package' />
                <NavLink to={'team/package/edit'}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        package
                </NavLink>
            </div>
            <div>
                <img src={summary} alt='summary' />
                <NavLink to={'team/package/create'}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                        summary
                </NavLink>
            </div>
        </Container>
    )
}