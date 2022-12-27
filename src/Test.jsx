import * as React from 'react';
import { useEffect } from 'react';
import GlobalStore from '/src/stores/app.js';

export default function Test() {
    const [state, dispatch] = GlobalStore.init();

    return (
        <GlobalStore.Provide value={{ state, dispatch }}>
            <p>hello {state.login && state.login.username}</p>
            <Login/>
            <Logout/>
        </GlobalStore.Provide >
    )
}


function Login() {
    const { state, dispatch } = GlobalStore.use();
    return (
        <React.Fragment>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch('login', { username: 'eutheu' });
            }}>
                <label htmlFor='username'>Username:</label>
                <input type='text' name='username' id='username' />
                <input type='submit' value='Login' />
            </form>
        </React.Fragment>
    )
}

function Logout() {
    const { state, dispatch } = GlobalStore.use();
    return (
        <React.Fragment>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch('logout');
            }}>
                <h3>{state.login && state.login.username}</h3>
                <input type='submit' value='Logout' />
            </form>
        </React.Fragment>
    )
}