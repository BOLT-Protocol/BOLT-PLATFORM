import styled from 'styled-components';
import { secondColor, fontGray } from '../../src/widgets/styleGuid';

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
        border-radius: 50%;
        margin-right: 1rem;
        display: flex;
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
