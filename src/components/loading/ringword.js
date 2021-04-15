import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const ringRadius = '7rem';
const ringSectors = 30;
const animDuration = 8;
const color = '#0080FF';

const tiltSpin = keyframes`
    0% {
        transform: rotateY(0) rotateX(30deg);
    }

    100% {
		transform: rotateY(1turn) rotateX(30deg);
    }
`;

const spin = keyframes`
    0% {
        transform: rotateY(0);
    }

    100% {
		transform: rotateY(1turn);
    }
`;

function loopSelector() {
    let styles = '';

    for (let i = 2; i <= ringSectors; i += 1) {
        styles += `
       &:nth-child(${i}) {

           transform: rotateY(${(360 / ringSectors) *
               (i - 1)}deg) translateZ(${ringRadius});
       }
       `;
    }

    return css`
        ${styles}
    `;
}

const SCHolder = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100vh;
    width: 100vw;
    z-index: 9999;
`;

const SCLoading = styled.div`
    animation: ${tiltSpin} ${animDuration}s linear infinite;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 17em;
    height: 17em;
    transform-style: preserve-3d;
    display: flex;
    color: ${color};

    > div {
        transform-style: preserve-3d;
        animation-name: ${spin};
        animation-duration: ${animDuration / 2}s;
        animation-timing-function: inherit;
        animation-iteration-count: inherit;
        font-size: 2em;
        position: relative;
        height: 3rem;
        width: 1.5rem;
        &:nth-child(even) {
            animation-direction: reverse;
        }

        > div {
            font-weight: 600;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            text-transform: uppercase;
            transform: translateZ(${ringRadius});

            &,
            &:empty:before {
                display: inline-block;
                width: 100%;
                height: 100%;
            }
            &:empty:before {
                background: linear-gradient(
                    transparent 45%,
                    ${color} 45% 55%,
                    transparent 55%
                );
                content: '';
            }
            ${loopSelector()}
        }
    }
`;

const rindwordLoading = ({ show, text = 'Loading...', subTitle = '' }) =>
    show && (
        <SCHolder>
            <SCLoading>
                <div>
                    {new Array(ringSectors).fill('').map((t, i) => {
                        return <div>{text[i] || ''}</div>;
                    })}
                </div>

                <div>
                    {new Array(ringSectors).fill('').map((t, i) => {
                        return (
                            <div>
                                {(subTitle ? subTitle[i] : text[i]) || ''}
                            </div>
                        );
                    })}
                </div>
            </SCLoading>
        </SCHolder>
    );

export default rindwordLoading;
