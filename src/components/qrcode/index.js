import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SCQRCodeContianer = styled.div`
    display: flex;
    justify-content: center;
`;

const QRCodeFiled = ({ data, width, height }) => {
    const qrcodeRef = useRef();

    useEffect(() => {
        const { QRCode } = window;
        const qrcodeDOM = qrcodeRef.current;

        const qrcode = new QRCode(qrcodeDOM, {
            text: data,
            width,
            height,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
        });
        return () => qrcode.clear();
    }, []);

    return (
        <SCQRCodeContianer>
            <div ref={qrcodeRef}></div>
        </SCQRCodeContianer>
    );
};

QRCodeFiled.defaultProps = {
    width: 85,
    height: 85,
};

QRCodeFiled.propTypes = {
    data: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default QRCodeFiled;
