import React from 'react';
import styled from 'styled-components';

const Icon_0 = styled.span`
display: flex;
justify-content: center;
align-items: center;
height: ${(props) => props.size ? props.size + 'em' : '1em' };
width: ${(props) => props.size ? props.size + 'em' : '1em' };


> * {
width: 70%;
height: 70%;
}
`;

export { Icon_0 };
