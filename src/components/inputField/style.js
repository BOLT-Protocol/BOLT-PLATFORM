import styled from 'styled-components';
import {
    fontWhite,
    fontGrey
} from '../../widgets/styleGuid';

export const SCinputField = styled.div `
    display: flex;
    flex-direction: column;
    flex: 1;

    input, textarea {
        width: 100%;
        border-bottom: 1px solid ${fontGrey};
        color: ${fontWhite};
        padding: 0.3rem 0;
        font-size: 0.875rem;

        &::placeholder {
            color: ${fontGrey};
        }
    }

    textarea {
        background-color: initial;
        padding: 0.3rem;
        resize: none;
        border: 1px solid ${fontGrey};
    }
`;

export const SCinputMessage = styled.div `
    height: 2rem;
    padding-top: 0.3rem;
    width: 100%;
`;