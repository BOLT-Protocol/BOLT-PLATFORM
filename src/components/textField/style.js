import styled from 'styled-components';
import {bgHeader, bgLight} from "../../widgets/styleGuid";

export const TextField = styled.div`
    display: block !important;
    height: 77px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.18);
    margin-bottom: 20px;

    padding-top: 16px;
    padding-left: 22px;
    font-family: PingFangTC;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 1.05px;
    color: #ffffff;

    p {
        font-weight: normal;
    }

    a {
        color: #5dade3;
    }
`;

export const TextAreaLayout = styled.div`
    display: flex !important;
    flex-direction: column;
    flex: 1;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.21);

    span {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 11px 8px 0 20px;
        display: flex;
        background-color: ${bgHeader};
        height: 39px;
        font-family: PingFangTC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 1.05px;
        color: #ffffff;
    }
`;

export const TextBody = styled.div`
    display: ${props => props.direction === 'row' ? 'flex' : 'block' };
    background-color: ${bgLight};
    flex-wrap:  wrap;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export const ImgItem = styled.div`
    flex: 0 0 30.6%;
    margin: 0px 20px 30px 20px !important;
    background-color: rgba(156, 165, 236, 0.04);
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.21);
    height: 248px;
    margin-top: 15px;

    img {
        margin: 15px auto auto auto;
        display: flex;
        justify-content: center;
        align-items: center; 
    }

    div {
        padding-top: 10px;
        padding-bottom: 20px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center; 
        color: #9b9b9b;
    }

    :hover {
        border-radius: 8px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.21);
        border: solid 3px #066eb7;
        background-color: #3a3b4d;
    }

    a {
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center; 
        width: 120px;
        height: 30px;
        border-radius: 17px;
        background-color: #066eb7;
        color: #ffffff;
        font-family: PingFangTC;
        font-size: 12px;
    }
`;

export const AItem = styled.div`
    position: relative;
    padding: 22px 0px 20px 52px;
    
    a:before {
        content: "";
        left: 20px;
        position: absolute;
        background-image: url(${props => props.icon || '/static/images/icon/link.png'});
        height: 24px;
        width: 24px;
        padding-right: 20px;
        background-repeat: no-repeat;
    }

    a {
        color: #ffffff;
        ${props => props.isLink ? 'pointer-events: none;' : ''}
    }

    :hover {
      background-color: #404252;
    }
`;