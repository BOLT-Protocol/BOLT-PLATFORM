import styled from 'styled-components';
import { secondColor, whiteDark, fontWhite } from './styleGuid';

export const WGmainButton = styled.button`
    width: 100%;
    background-color: ${secondColor};
    color: ${fontWhite};
    font-size: 0.875rem;
    height: 30px;
    border-radius: 15px;
`;

export const WGsmallButton = styled.button`
    border-radius: 19px;
    height: 30px;
    font-size: 0.75rem;
    color: ${fontWhite};
    background-color: ${secondColor};
    width: 120px;
`;

export const WGsecondaryButton = styled.button`
    width: 100%;
    height: 30px;
    border-radius: 15px;
    border: 1px solid ${whiteDark};
    color: ${fontWhite};
    font-size: 0.875rem;
    background-color: transparent;
`;