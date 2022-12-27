import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Registration/Navbar.jsx';


export default function Registration() {
    return (
        <React.Fragment>
            <header><Navbar/></header>
            <section><Outlet/></section>
        </React.Fragment>
    )
}
