import styled from 'styled-components';
import { secondColor, fontGray, fontWhite, bgDark, devices } from '../../widgets/styleGuid';

export const SCcontainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 60px;
`;

export const SCmessage = styled.p`
    padding: 1rem 1.125rem;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.18);
    font-size: 0.75rem;
    line-height: 21px;
    letter-spacing: 0.9px;
    margin-bottom: 10px;
`;

export const SCmain = styled.main`
    display: flex;
`;

export const SCcontent = styled.div`
    display: flex;
    flex: 3.125;
    border-radius: 6px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.21);
    background-color: #3a3b4d;
    justify-content: center;
    align-items: center;

    @media ${devices.laptop} {
        flex: 4;
    }
`;

export const SCstepList = styled.ul`
    display: flex;
    flex: 1;
    border-radius: 6px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.21);
    background-color: #3a3b4d;
    margin-right: 10px;
    padding: 40px;
    flex-direction: column;
`;

export const SCstep = styled.li`
    display: flex;
    margin-bottom: 2rem;

    a {
        width: 1.5rem;
        height: 1.5rem;
        min-width: 1.5rem;
        border-radius: 50%;
        margin-right: 1rem;
        display: flex;
        transition: 0.5s;
        align-items: center;
        justify-content: center;
        background-color: ${props => (props.active ? secondColor : 'transparent')};
        border: 1px solid ${props => (props.active ? secondColor : fontGray)};
        font-size: 0.875rem;
        ${props => props.done && `background-color: ${fontGray}; border: none;`}
    }

    img {
        width: 0.8rem;
    }
`;

export const SCbasic = styled.div`
    padding: 50px;
    display: flex;
    justify-content: space-between;
    flex: 1;

    > div {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        margin-left: 4rem;
        align-items: center;
    }

    ul {
        flex: 1;

        li {
            display: flex;

            span {
                flex: 1;
                text-align: right;
                margin-right: .875rem;
                font-size: .875rem;
                padding-top: .3rem;
            }

            > div {
                flex: 6;
                display: flex;
            }
        }
    }
`;

export const SCstepControl = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;

    a {
        margin-right: 30px;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
    }

    > button {
        max-width: 120px;
        font-size: 0.75rem;
    }
`;

export const SCupload = styled.label`
    display: flex;
    flex-direction: column;
    color: ${fontGray};
    font-size: 0.75rem;
    width: 150px;
    height: 150px;
    background-color: ${bgDark};
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    
    h4 {
        color: ${fontWhite};
        font-size: 0.75rem;
        margin: 1.5rem 0 0 0;
    }

    img {
        margin: 1.25rem 0;
        width: 22.7px;
        height: 14.7px;
    }
    
    input {
        display: none;
    }

    p {
        text-align: center;
    }
`;

export const SCshowOption = styled.div`
    display: flex;
    color: ${fontWhite};
    margin-top: 38px;
    align-items: center;

    input {
        background-color: ${fontGray};
        margin-right: 0.5rem;
        height: 1rem;
        width: 1rem;
    }
`;

export const SCoverview = styled.div`
    display: flex;
    width: 100%;

    > div {
        flex: 6;
        display: flex;
        flex-direction: column;

        > div {
            margin-bottom: 20px;
            display: flex;
        }

        p {
            white-space: pre-wrap;
        }

        &:first-child {
            flex: 1;
        }
    }
`;

export const SCfinishField = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > button {
        width: 120px;
        margin-left: 18px;
    }
`;

export const SCcardHolder = styled.div`
    display: flex;
    margin-bottom: 15px;

    > div {
        width: calc(25% - 15px);
        margin-right: 20px;

        &:last-child {
            margin-right: 0;
        }
    }
`;

export const SCuserField = styled.div`
    display: flex;
    min-height: 376px;

    > div {
        min-height: 100%;

        &:first-child {
            margin-right: 20px;
            width: calc(25% - 15px);
        }
    }
`;