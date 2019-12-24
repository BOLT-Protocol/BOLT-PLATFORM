import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

import Loading from '../../components/loading';
import { WGmainButton, WGsecondaryButton } from '../../widgets/button';
import { getPaymentToken, payment } from '../../utils/api';
import { bgLight, fontWhite } from '../../widgets/styleGuid';
import { CREATE } from '../../constants/currency';

const SCpay = styled.div`
    .braintree-heading {
        color: ${fontWhite};
    }

    min-height: 100px;

    & + div {
        display: flex;
        justify-content: flex-end;
        padding-top: 62px;
    } 
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '672px',
        backgroundColor: bgLight,
        border: 0
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, .62)' }
};

Modal.setAppElement('#__next');

const CreatePayment = ({ orderID, show, paymentCallback, cancel }) => {
    const [submitEl, setSubmitEl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (orderID) {
            getPaymentToken()
                .then(({ data }) => {
                    const { token } = data;
                    return window.braintree.dropin.create({
                        authorization: token,
                        selector: '#dropin-container',
                        locale: 'zh_TW'
                    });
                    // return payment({
                    //     orderID,
                    //     type,
                    //     nonce: token
                    // });
                })
                .then((instance) => {
                    setSubmitEl(instance);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [orderID]);

    const handleSubmit = () => {
        if (!submitEl) return;

        setLoading(true);
        submitEl.requestPaymentMethod((err, payload) => {
            if (err) {
                setLoading(false);
                return console.error(err);
            }
            console.log('braintree payload', payload);
            const { nonce, details, type } = payload;

            payment({
                nonce,
                orderID,
                type: CREATE
            })
                .then(({ success }) => {
                    if (success) {
                        paymentCallback({ lastFour: details.lastFour, type });
                    }
                    setLoading(false);
                });
        });
    };

    return (
        <>
            <Modal
                isOpen={show}
                style={
                    customStyles
                }
            >
                <SCpay id="dropin-container" />

                <div>
                    <WGsecondaryButton onClick={cancel} style={{ maxWidth: 120, border: 0 }}>
                        取消
                    </WGsecondaryButton>

                    <WGmainButton onClick={handleSubmit} style={{ maxWidth: 120 }}>
                        確認付款
                    </WGmainButton>
                </div>
            </Modal>
            <Loading show={loading} type="payment" />
        </>
    );
};

CreatePayment.defaultProps = {
    orderID: ''
};

CreatePayment.propTypes = {
    orderID: PropTypes.string,
    show: PropTypes.bool.isRequired,
    paymentCallback: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
};

export default CreatePayment;