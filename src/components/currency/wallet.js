import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { bgHeader, mainColor, bgLight } from '../../widgets/styleGuid';
import { WGmainButton, WGsecondaryButton } from '../../widgets/button';

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

const Wallet = ({ token, amount, userName, address }) => {
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

                        <a>
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
                    <WGmainButton>提幣</WGmainButton>
                </div>
            </div>
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