import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { WGmainButton } from '../../widgets/button';
import { getPaymentToken } from '../../utils/api';

const CreatePayment = ({ orderID, show }) => {
    let submitEl = null;

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
                    console.log(instance, orderID);
                    submitEl = instance;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [orderID]);

    const handleSubmit = () => {
        if (!submitEl) return;

        submitEl.requestPaymentMethod(function (err, payload) {
            console.log('payload:', payload);
            // Submit payload.nonce to your server
        });
    };

    return (
        <Modal
            isOpen={show}
        >
            <div id="dropin-container">

            </div>

            <WGmainButton onClick={handleSubmit}>
                確認付款
            </WGmainButton>
        </Modal>
    );
};

CreatePayment.defaultProps = {
    orderID: ''
};

CreatePayment.propTypes = {
    orderID: PropTypes.string,
    show: PropTypes.bool.isRequired
};

export default CreatePayment;