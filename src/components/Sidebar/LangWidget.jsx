import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Langs = ['en', 'fr', 'de', 'nl'];

const Container = styled.div`
    flex: 0 0 100px;
    display: flex;
    align-items: center;
    color: white;
    text-transform: uppercase;
    font-size: 1em;
    line-height: 0.9;
    letter-spacing: 1.5px;
    > ul {
        display: flex;
        flex-flow: row nowrap;
    }

    .lang:not(:last-child) {
        > a::after {
            content: '|';
            font-weight: bolder;
            margin: 0 4px;
            position: relative;
        }
    }
`
export default function LangWidget() {
    return (
        <Container>
            <ul>
                {
                    Langs.map((lang, i) => (
                        <li key={i} className='lang'>
                            <NavLink to={`/${lang}`}
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            > {lang}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </Container>
    )
}