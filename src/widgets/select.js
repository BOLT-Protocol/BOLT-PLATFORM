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
    background-image: url('/static/images/ic-dropdown.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 18px) 50%;
`;
