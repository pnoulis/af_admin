import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { language } from '/src/misc';
import {GlobalStore} from '/src/stores';

const Container = styled.div`
    flex: 0 0 100px;
    display: flex;
    align-items: center;
    font-size: 1em;
    line-height: 0.9;
    letter-spacing: 1.5px;
color: grey;
    > ul {
        display: flex;
        flex-flow: row nowrap;
    }

    .lang:not(:last-child) {
        > em::after {
            color: grey;
            content: '|';
            margin: 0 4px;
            position: relative;
        }
    }

    .lang:hover {
        cursor: pointer;
        color: white;
    }

    .lang.onDisplay > em {
        color: white;
    }
`;

export default function LangWidget() {
  const { state, dispatch } = GlobalStore.use();
  return (
    <Container>
      <ul>
        {
          language.langs.map((lang, i) => (
            <li key={i} className={`lang ${state?.lang === lang.bcp47 ? 'onDisplay' : undefined}`}>
              <em
                onClick={() => dispatch('switchLanguage', lang.bcp47)}
              >
                {lang.iso639_1}
              </em>
            </li>
          ))
        }
      </ul>
    </Container>
  );
}
