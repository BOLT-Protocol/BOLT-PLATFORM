import styled from 'styled-components';
import { fontWhite, errorRed, fontGray } from './styleGuid';

export const WGmainP = styled.p`
    font-size: 0.875rem;
    color: ${props => props.color || fontWhite};
`;

export const WGerrorP = styled.p`
    color: ${errorRed};
    font-size: 0.75rem;
`;

export const WGhintP = styled.p`
    color: ${fontGray};
    font-size: 0.75rem;
`;
