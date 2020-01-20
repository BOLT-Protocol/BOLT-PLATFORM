import styled from 'styled-components';
import { fontWhite, secondColor } from '../../widgets/styleGuid';

export const SCcontainer = styled.div`
    display: flex;
    color: ${fontWhite};

    > div {
        padding-top: 70px;
        width: 100%;
    }
`;

export const SCheader = styled.header`
    width: 100vw;
    height: 70px;
    background-color: transparent;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0%;
    left: 0;
    border-bottom: 1px rgba(216, 126, 126, 0.1) solid;

    > div {
        display: flex;

        &:first-child {
            width: 280px;
            justify-content: center;
        }
    }

    img {
        height: 45px;
    }
`;

export const SCnav = styled.nav`
    width: 280px;
    min-width: 280px;
    height: 100vh;
    background-color: rgba(156, 165, 236, 0.04);
    padding-top: 80px;
    font-size: 0.875rem;
`;

export const SCli = styled.li`
    background-color: ${props => (props.active ? 'rgba(255, 255, 255, .05)' : 'tranaparent')};
    border-left: 3px solid transparent;
    border-color: ${props => (props.active ? secondColor : 'transparent')};

    a {
        color: ${fontWhite};
        width: 100%;
        padding: 10px 0;
        padding-left: 40px;
        display: flex;

        > img {
            width: 20px;
            margin-right: 1rem;
            height: 21px;
        }

        > span {
            margin-left: auto;
            margin-right: 1rem;
        }
    }
`;
