import styled from 'styled-components';

export const Question = styled.div`
    padding-left: 42px;
    padding: 20px;
    cursor: pointer;
    display: block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: 400;
    color: #15d5c0;
`;

export const Answer = styled.div`
    display: ${props => props.show ? 'block' : 'none' };
    position: ${props => props.show ? 'inherit' : 'absolute' };;
    margin-top: -40px;
    margin-left: 20px;
    -webkit-transition: margin-top 1s ease-out;
    -moz-transition: margin-top 1s ease-out;
    -o-transition: margin-top 1s ease-out;
    transition: margin-top 1s ease-out;
    color: #ffffff;
    font-size: 12px;
`;

export const QAHr = styled.hr`
    margin: 0px 20px;
    height: 1px;
    border: 1px solid rgb(74, 74, 74);
`;