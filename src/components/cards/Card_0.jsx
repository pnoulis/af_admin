import styled, {css} from 'styled-components';

const Card_0 = styled.div`
border-radius: var(--border-radius-2);
box-shadow: var(--card-basic-shadow);
border: 4px solid transparent;
padding: 10px;

&:hover {
border-color: var(--primary-strong);
}

${({variant}) => variant === 'filled' && css`
background-color: var(--card-basic-color);
`}
`;

export { Card_0 };
