import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStore from '/src/stores/app.js';

const Container = styled.article`
    width: 500px;
    margin: auto;
`

export default function Login() {
    const { state, dispatch } = GlobalStore.use();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (state.login) {
            navigate('/');
        }
    })
    return (
        <React.Fragment>
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log('will login');
                dispatch('login', {
                    username,
                })
            }}>
                <label htmlFor='username'>Username:</label>
                <input type='text'
                    id='username'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input type='submit' value='Login' />
            </form>
        </React.Fragment>
    )
}