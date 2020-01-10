import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import CurrencyModal from './currencyModal';
import { bgHeader, mainColor, bgLight } from '../../widgets/styleGuid';
import { WGmainButton, WGsecondaryButton } from '../../widgets/button';
import { TOAST_OPTIONS } from '../../utils/toast';
import { WITHDRAW } from '../../constants/currency';

const SCwallet = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: ${bgLight};
    overflow: hidden;
    font-size: 0.875rem;

    h2 {
        background-color: ${bgHeader};
        margin: 0;
        font-size: 0.875rem;
        padding: 12px 18px 8px 12px;
    }

    > div {
        display: flex;
        padding: 0 20px;
        flex-direction: column;

        > div {
            border-bottom: 1px solid rgba(151, 151, 151, .34);
            justify-content: space-between;
            display: flex;
            padding: 10px 0;

            &:last-child {
                border: 0;
                margin-top: 14px;

                > button {
                    flex: .45;
                    font-size: .75rem;
                }
            }
        }
    }

    #address_qrcode {
        width: 105px;
        height: 105px;
        min-height: 105px;
        margin: 20px auto 10px auto;
        padding: 10px;
        background-color: #fff;
    }
`;

const SCaddress = styled.div`
    flex-direction: column;

    > div {
        display: flex;

        p {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        justify-content: space-between;

        &:last-child {
            justify-content: center;
        }
    }

    a {
        color: ${mainColor};
        font-size: .75rem;
    }
`;
toast.configure(TOAST_OPTIONS);

const Wallet = ({ token, amount, userName, address }) => {
    const [modal, setModal] = useState({ type: WITHDRAW, show: false });

    const copy = (str = '') => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }

        toast.dismiss(); // close all toast

        setTimeout(() => {
            toast('已複製');
        }, 500);
    };

    const handleWithdrawModal = () => {
        setModal({ type: WITHDRAW, show: true });
    };

    useEffect(() => {
        const qrcodeDOM = document.querySelector('#address_qrcode');
        const { QRCode } = window;
        const qrcode = new QRCode(qrcodeDOM, {
            text: address,
            width: 85,
            height: 85,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        return () => qrcode.clear();
    }, [address]);

    return (
        <SCwallet>
            <h2>Boltchain 錢包</h2>

            <div>
                <div>
                    {userName} 的錢包
                </div>

                <SCaddress>
                    <div>
                        <p>
                            {address}
                        </p>

                        <a onClick={() => copy(address)}>
                            複製
                        </a>
                    </div>

                    <div id="address_qrcode" />
                </SCaddress>

                <div>
                    剩餘&nbsp;&nbsp;&nbsp;{amount.toLocaleString()}

                    <span>
                        {token}
                    </span>
                </div>

                <div>
                    <WGsecondaryButton>
                        入幣
                    </WGsecondaryButton>

                    <WGmainButton onClick={handleWithdrawModal}>提幣</WGmainButton>
                </div>
            </div>

            <CurrencyModal
                show={modal.show}
                type={modal.type}
                token={token}
                cancel={() => setModal({ ...modal, show: false })}
                next={() => {
                    console.log('success');
                }}
                onError={() => { }}
            />
        </SCwallet>
    );
};

Wallet.propTypes = {
    token: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};

export default Wallet;