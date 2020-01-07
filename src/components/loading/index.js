import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const shining = keyframes`
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

const SCloading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .62);
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    display: ${props => props.show ? 'flex' : 'none'};
    z-index: 1000;
    color: #fff;

    > * {
        animation: ${shining} 2s infinite;
    }
`;

const Loading = ({ show, type }) => {
    return (
        <SCloading show={show}>

            {
                type === 'payment' ? (
                    <div>
                        <img src="/static/images/pay-loading.svg" alt="payment" />
                        <p>
                            付款中 …
                        </p>
                    </div>) :
                    (
                        <p>Loading...</p>
                    )
            }
        </SCloading>
    );
};

Loading.defaultProps = {
    type: ''
};

Loading.propTypes = {
    show: PropTypes.bool.isRequired,
    type: PropTypes.string
};

export default Loading;