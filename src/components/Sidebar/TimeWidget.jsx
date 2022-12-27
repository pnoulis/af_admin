import { useEffect, useState } from "react";
import GlobalState from '/src/stores/app.js';
import styled from 'styled-components';

const getTime = (() => {
    let currentLang;
    let locale;
    const time = new Map();
    return (lang) => {
        if (typeof locale === 'undefined' || lang !== currentLang) {
            locale = new Intl.DateTimeFormat(lang, {
                month: 'short', weekday: 'short', day: 'numeric',
                hour: '2-digit', second: '2-digit', hourCycle: 'h24'
            })
        }
        locale.formatToParts().forEach(el => {
            switch (el.type) {
                case 'month': return time.set(el.type, el.value);
                case 'weekday': return time.set(el.type, el.value);
                case 'day': return time.set(el.type, el.value);
                case 'hour': return time.set(el.type, el.value);
                case 'second': return time.set(el.type, el.value);
                default: break;
            }
        });
        return Object.fromEntries(time);
    }
})()


const Container = styled.article`
    color: white;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    > .widget-time {
        font-size: 2em;
        letter-spacing: 3px;

        > i {
            font-weight: light;
            margin: 0 3px;
        }
    }

    > .widget-date {
        font-size: 0.8em;
        letter-spacing: 0.5px;
        position: relative;
        top: -10px;
        transform: translateX(-50%, 50%);
        left: -1px;

        > i {
            margin-right: 5px;
            font-weight: light;
        }
    }
`

export default function TimeWidget() {
    const {state, dispatch} = GlobalState.use();
    const [time, setTime] = useState(() => getTime(state.lang));

    useEffect(() => {
        const event = setInterval(() => setTime(getTime(state.lang)), 1000);
        return () => clearInterval(event);
    }, [state.lang]);

    return (
        <Container>
            <p className='widget-time'>{time.hour}<i>:</i>{time.second}</p>
            <p className='widget-date'>{time.weekday}<i>,</i>{time.day} {time.month}</p>
        </Container>
    );
}

