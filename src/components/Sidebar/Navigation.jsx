import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.nav`
    flex: 1;
    align-self: stretch;
    color: white;
    padding: 30px 0 20px 0;

    > ul {
        display: flex;
        flex-flow: column nowrap;
        row-gap: 10px;
        align-self: stretch;
    }
`;
const NavItem = styled.li`
    flex: 1 1 max-content;
    > a {
        font-size: 1.3em;
        font-weight: bolder;
        display: block;
        padding: 10px 0 10px 15px;
        text-align: left;
        outline: none;
        text-decoration: none;
        border-radius: 5px;
    }
`;

const activeStyle = {
    backgroundColor: "#d199ff"
};

const links = [
    {
        name: 'Registration',
        url: '/registration'
    },
    {
        name: 'Manager',
        url: '/manager'
    },
    {
        name: 'Scorebord',
        url: '/scoreboard'
    },
    {
        name: 'Statistics',
        url: '/statistics'
    },
    {
        name: 'Cashier',
        url: '/cashier'
    }
];


export default function Navigation() {
    return (
        <Container>
            <ul>
                {
                    links.map((link, i) => (
                        <NavItem key={i}>
                            <NavLink to={link.url}
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            > {link.name}
                            </NavLink>
                        </NavItem>
                    ))
                }
            </ul>
        </Container>
    );
}
