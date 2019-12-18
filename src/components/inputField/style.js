import styled from 'styled-components';
import {
    fontWhite,
    fontGray
} from '../../widgets/styleGuid';

export const SCinputField = styled.div `
    display: flex;
    flex-direction: column;
    flex: 1;

    input {
        width: 100%;
        border-bottom: 1px solid ${fontGray};
        color: ${fontWhite};
        padding: 0.3rem 0;
        font-size: 0.875rem;

        &::placeholder {
            color: ${fontGray};
        }
    }
`;

export const SCinputMessage = styled.div `
    height: 2rem;
    padding-top: 0.3rem;
    width: 100%;
`;