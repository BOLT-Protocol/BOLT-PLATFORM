import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Modal from './currencyModal';
import PaymentModal from './paymentModal';
import ConfirmModal from '../modal/confirmModal';
import { WGmainButton, WGsecondaryButton } from '../../widgets/button';
import { bgLight, bgHeader } from '../../widgets/styleGuid';
import { WGsecondarySelect } from '../../widgets/select';
import { MINT, BURN } from '../../constants/currency';

const SCtrust = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${bgLight};
    border-radius: 6px;
    overflow: hidden;
    flex: 1;

    h2 {
        padding: 0px 8px 0 20px;
        display: flex;
        align-items: center;
        background-color: ${bgHeader};
        margin: 0;
        font-size: .875rem;
        justify-content: space-between;
        height: 40px;

        button {
            width: 100px;
            font-size: .75rem;
        }
    }

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const SClist = styled.div`
    display: flex;
    min-width: 450px;
    width: 50%;
    font-size: 0.875rem;
    margin-top: 34px;

    > div {
        &:first-child {
            width: 60px;
            text-align: right;
            margin-right: 12px;
            display: flex;
            align-items: center;
        }

        &:last-child {
            border-bottom: 1px solid rgba(151, 151, 151, .34);
            flex: 1;
            padding-bottom: 4px;
            display: flex;
            justify-content: space-between;
        }
    }
`;

const SCbuttonField = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    min-width: 450px;
    width: 50%;
    margin-top: 19px;

    > button {
        width: 100px;
        margin-left: 10px;
    }
`;

const SCempty = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Trusteeship = ({ token, tokenList, onSelect, onUpdate }) => {
    const [modal, setModal] = useState({ show: false, type: MINT });
    const [openPayment, setOpenPayment] = useState(false);
    const [orderID, setOrderID] = useState(null);
    const [confirm, setConfirm] = useState({ show: false, type: MINT });
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null);

    const selectedToken = tokenList.find(tk => tk.symbol === token);

    const confirmMessage = () => {
        if (confirm.type === MINT) return `付款完成，您可開始使用您的 ${token} Token`;
        if (confirm.type === BURN) return `已銷毀 ${amount.toLocaleString()} 個 BC TOKEN`;

        return error;
    };

    const handleSelect = (e) => {
        const { value } = e.target;
        const tk = tokenList.find(_token => _token.currencyAddress === value);

        onSelect(tk);
    };

    const handleOpenpayment = ({ orderID: oId }) => {
        setModal({ ...modal, show: false });
        setOrderID(oId);
        setOpenPayment(true);
    };

    const mintSuccess = () => {
        setOpenPayment(false);
        setConfirm({
            show: true,
            type: MINT
        });
        onUpdate(token);
    };

    const burnSuccess = ({ value }) => {
        setAmount(value);

        setModal({
            ...modal,
            show: false
        });

        setConfirm({
            show: true,
            type: BURN
        });

        onUpdate(token);
    };

    const hideSuccess = () => {
        setConfirm({
            ...confirm,
            show: false
        });
    };

    const handleError = (e) => {
        setError(e);

        setConfirm({
            type: 'ERROR',
            show: true
        });
    };

    return (
        <SCtrust>
            <h2>
                我的 {token} Token

                <Link href="/createCurrency">
                    <a>
                        <WGmainButton>新增Token</WGmainButton>
                    </a>
                </Link>
            </h2>

            {
                token ? (
                    <div>
                        <SClist>
                            <div>
                                幣別
                            </div>

                            <WGsecondarySelect name="token" id="tokenList" onChange={handleSelect}>
                                {
                                    tokenList.map(tk => (
                                        <option key={tk.currencyAddress} value={tk.currencyAddress}>{tk.symbol}</option>
                                    ))
                                }
                            </WGsecondarySelect>
                        </SClist>

                        <SClist>
                            <div>
                                發行總量
                            </div>

                            <div>
                                {selectedToken.totalSupply.toLocaleString()}
                                <span>{token}</span>
                            </div>
                        </SClist>

                        <SClist>
                            <div>
                                發幣方式
                            </div>

                            <div>
                                {selectedToken.type}
                            </div>
                        </SClist>

                        <SClist>
                            <div>
                                託管來源
                            </div>

                            <div>
                                {selectedToken.coinSource}
                            </div>
                        </SClist>

                        <SCbuttonField>
                            <WGsecondaryButton onClick={() => setModal({ show: true, type: BURN })}>銷毀</WGsecondaryButton>

                            <WGmainButton onClick={() => setModal({ show: true, type: MINT })}>增發</WGmainButton>
                        </SCbuttonField>

                        <Modal
                            show={modal.show}
                            type={modal.type}
                            token={token}
                            cancel={() => setModal({ ...modal, show: false })}
                            next={modal.type === MINT ? handleOpenpayment : burnSuccess}
                            onError={handleError}
                        />

                        <PaymentModal
                            show={openPayment}
                            orderID={orderID}
                            paymentCallback={mintSuccess}
                            cancel={() => { setOpenPayment(false); }}
                            actionType={modal.type}
                        />

                        <ConfirmModal
                            show={confirm.show}
                            close={hideSuccess}
                            message={confirmMessage()}
                        />
                    </div>
                ) :
                    (
                        <SCempty>您目前無任何 Token</SCempty>
                    )
            }
        </SCtrust>
    );
};

Trusteeship.propTypes = {
    token: PropTypes.string.isRequired,
    tokenList: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default Trusteeship;