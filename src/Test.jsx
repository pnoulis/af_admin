import * as React from 'react';
import logo from '/maze_logo.svg';

export default
function Test() {
    return (
        <React.Fragment>
            <p>Hello test</p>
            <img src={logo} alt='site-logo' />
        </React.Fragment>
    )
}
