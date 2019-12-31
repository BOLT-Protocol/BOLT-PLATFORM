import React, { useState, useMemo, useRef } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputField from '../inputField';
import Loading from '../loading';
import { bgLight, fontWhite, fontYellow } from '../../widgets/styleGuid';
import { WGsecondaryButton, WGmainButton } from '../../widgets/button';
import { MINT, MAX_AMOUNT, MIN_AMOUNT } from '../../constants/currency';
import { getCost, mintFund, burnFund } from '../../utils/api';
import { validateCurrencyAmount } from '../../utils/validation';

const mintInfo = tk => `增加發行 ${tk} Token 的費用，是依照您的發幣類型與數量即時提供報價。增發成功後，
新的Token會匯入您發行時的綁定錢包中，並更新發行總量。`;
const burnInfo = tk => `您可能因某些原因需要銷毀 ${tk} Token，您可以對綁定錢包中您指定的Token數量進行銷毀，
請謹慎使用此功能。`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '672px',
        minHeight: '384px',
        backgroundColor: bgLight,
        border: 0,
        color: fontWhite,
        display: 'flex',
        flexDirection: 'column'
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, .62)' }
};

const SCholder = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    > p {
        font-size: .75rem;
        padding: 20px 95px;
        text-align: center;
    }

    > div {
        display: flex;
        padding: 0 95px;
        position: relative;

        > span {
            position: absolute;
            top: 0;
            right: 95px;
        }

        & + p {
            font-size: .875rem;
            color: ${fontYellow};
            text-align: right;
            padding: 0 95px;
        }

        &:last-child {
            margin-top: auto;
            margin-bottom: 64px;
            justify-content: flex-end;
        }
    }
`;

const timmer = 300;
const initialInput = {
    value: '',
    valid: null,
    error: `最少 ${MIN_AMOUNT.toLocaleString()}，最多 ${MAX_AMOUNT.toLocaleString()}`
};

Modal.setAppElement('#__next');

const CurrencyModal = ({ type, show, cancel, token, next, onError }) => {
    const [input, setInput] = useState(initialInput);
    const [loading, setLoading] = useState(false);
    const [cost, setCost] = useState(0);
    const queue = useMemo(() => [], []);
    const timeoutRef = useRef(null);

    const disqueue = (_queue, setResult) => {
        if (_queue.length < 1) return false;

        const item = _queue.shift();

        setResult({ cost: '計算中...' });

        item.promise()
            .then(res => {
                setResult(res);
                disqueue(_queue, setResult);
            })
            .catch(e => {
                setResult(e);
                disqueue(_queue, setResult);
            });
    };

    const hanldeInput = ({ value, valid }) => {
        setInput({ ...input, value, valid });

        if (!valid) {
            return setCost(0);
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            queue.push({
                value,
                promise: () => new Promise((reslove, reject) => {
                    getCost(value).then(({ data, success, message }) => {
                        if (success) {
                            reslove(data);
                        } else {
                            reject(message);
                        }
                    });
                })
            });

            disqueue(queue, (v) => setCost(v.cost || '-'));
        }, timmer);

    };

    const handleSubmit = () => {
        if (loading || (!cost > 0)) return;

        setLoading(true);

        const callApi = type === MINT ? mintFund : burnFund;

        callApi({
            symbol: token,
            number: input.value
        })
            .then(({ success, data, message }) => {
                setLoading(false);
                setCost(0);
                setInput(initialInput);

                if (success) {
                    const { orderID } = data;
                    next({ orderID, value: parseInt(input.value, 10) });
                } else {
                    console.error(message);
                    onError(message);
                    cancel();
                }
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    };

    return (
        <>
            <Modal isOpen={show} style={customStyles}>
                <SCholder>
                    <p>
                        {type === MINT ? mintInfo(token) : burnInfo(token)}
                    </p>

                    <div>
                        <div style={{ marginTop: '6px', marginRight: '1rem' }}>
                            {type === MINT ? '輸入發行數量' : '輸入銷毀數量'}
                        </div>

                        <InputField
                            name="amount"
                            inputValue={input.value}
                            setInput={hanldeInput}
                            validCheck={validateCurrencyAmount}
                            error={input.error}
                            valid={input.valid}
                        />

                        <span>
                            {token}
                        </span>
                    </div>


                    <p>
                        應付總額 (新台幣)：{cost.toLocaleString()} 元
                    </p>

                    <div>
                        <WGsecondaryButton onClick={cancel} style={{ maxWidth: 120, border: 0 }}>
                            取消
                        </WGsecondaryButton>

                        <WGmainButton onClick={handleSubmit} style={{ maxWidth: 120 }}>
                            {type === MINT ? '前往付款' : '確定銷毀'}
                        </WGmainButton>
                    </div>
                </SCholder>
            </Modal>

            <Loading show={loading} />
        </>
    );
};

CurrencyModal.propTypes = {
    show: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    cancel: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
};

export default CurrencyModal;

