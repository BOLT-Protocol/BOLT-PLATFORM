import styled from 'styled-components';
import { fontWhite, secondColor } from './styleGuid';

export const WGmainSelect = styled.select`
    color: ${fontWhite};
    background-color: ${secondColor};
    border: none;
`;

export const WGsecondarySelect = styled.select`
    color: ${fontWhite};
    background-color: rgba(255, 255, 255, .08);
    border: 0;
    width: 100%;
    padding: 12px 18px;
    -webkit-appearance: none;
    outline: 0;
    position: relative;

    > img {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
    }
`;
