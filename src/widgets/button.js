import styled from 'styled-components';
import { secondColor } from './styleGuid';

export const WGmainButton = styled.button`
    width: 100%;
    background-color: ${secondColor};
    color: #fff;
    font-size: 0.875rem;
    height: 30px;
    border-radius: 15px;
`;

export const WGsmallButton = styled.button`
    border-radius: 19px;
    height: 30px;
    font-size: 0.75rem;
    color: #fff;
    background-color: ${secondColor};
    width: 120px;
`;
