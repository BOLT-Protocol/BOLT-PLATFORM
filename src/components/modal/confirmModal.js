import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { bgLight, fontWhite } from '../../widgets/styleGuid';
import { WGmainButton } from '../../widgets/button';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '418px',
        minHeight: '214px',
        backgroundColor: bgLight,
        border: 0,
        color: fontWhite,
        display: 'flex',
        flexDirection: 'column',
        padding: '81px'
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, .62)' }
};

const ConfirmModal = ({ show, close, message }) => {
    return (
        <Modal isOpen={show} style={customStyles}>
            <p style={{ textAlign: 'center', marginBottom: 18 }}>
                {message}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <WGmainButton onClick={close} style={{ width: 120 }}>
                    確定
                </WGmainButton>
            </div>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export default ConfirmModal;