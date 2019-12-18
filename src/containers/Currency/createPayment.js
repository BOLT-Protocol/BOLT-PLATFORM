import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-modal';

import { WGmainButton } from '../../widgets/button';
import { getPaymentToken } from '../../utils/api';

const CreatePayment = ({ orderID }) => {
    let submitEl = null;

    useEffect(() => {
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

    }, []);

    const handleSubmit = () => {
        if (!submitEl) return;

        submitEl.requestPaymentMethod(function (err, payload) {
            console.log('payload:', payload);
            // Submit payload.nonce to your server
        });
    };

    return (
        <>
            <div id="dropin-container">

            </div>

            <WGmainButton onClick={handleSubmit}>
                確認付款
            </WGmainButton>
        </>
    );
};

CreatePayment.propTypes = {
    orderID: PropTypes.string.isRequired
};

export default CreatePayment;