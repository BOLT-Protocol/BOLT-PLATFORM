import styled from 'styled-components';
import { fontWhite, fontGrey, secondColor } from '../../widgets/styleGuid';

export const SCholder = styled.a`
    transition: 0.3s;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    pointer-events: ${props => props.disabled ? 'none' : 'initial'};

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
        max-width: 210px;
        min-width: 210px;
        border-radius: 6px;
        position: relative;
        border: ${props => (props.selected ? '1px solid rgba(255, 255, 255, .19)' : 'none')};

        > img {
            width: 4.5rem;
            height: 4.5rem;
        }
    }

    h3 {
        color: ${fontWhite};
        font-size: 1rem;
        margin: 14px 0 7px 0;
    }

    p {
        font-size: 0.75rem;
        color: ${fontGrey};
    }

    span {
        display: flex;
        transition: 0.3s;
        opacity: ${props => (props.selected ? '1' : '0')};
        background-color: ${secondColor};
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
        width: 34px;
        height: 34px;
        justify-content: center;
        align-items: center;

        > img {
            width: 0.875rem;
            height: 0.875rem;
        }
    }
`;
