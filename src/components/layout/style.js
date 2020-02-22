import styled from 'styled-components';
import { fontWhite, secondColor } from '../../widgets/styleGuid';

export const BoltCoinBalance = styled.span`
    position: absolute;
    margin-top: -2px;
    margin-left: 5px;
    color: #0091ea;
`;
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

export const SCMenu = styled.div`
    display: flex;
    position: relative;
    margin-left: auto;
    margin-right: 60px;
    color: ${fontWhite};
    font-size: 0.875rem;

    &:hover {
        > nav {
            max-height: 300px;
        }
    }

    > div, nav {
        display: flex;
        flex-direction: column;

        span > img {
            width: 14px;
            height: 14px;
        }
    }

    > nav {
        z-index: 100;
        /* max-height: ${props => props.show ? '300px' : '0'}; */
        max-height: 0;
        top: calc(100% + 10px);
        left: 0;
        overflow: hidden;
        transition: .3s;
        border-radius: 6px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
        background-color: #fff;
        position: absolute;
        min-width: 129px;
        font-size: 0.75rem;
        color: #7a7a7a;
        box-sizing: border-box;

        li {
            padding: .5rem 1rem;
            cursor: pointer;

            &:hover {
                background-color: #d8d8d8;
                color: #000;
            }

            a {
                display: flex;
                flex: 1;
                justify-content: center;
            }
        }
    }
`;

export const SCAvatar = styled.div`
    background: url('${props => props.avatar}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    border-radius: 50%;
    height: 44px;
    width: 44px;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    margin-right: 14px;    
`;