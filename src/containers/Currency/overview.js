import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CURRENCY from '../../constants/currency';
import { fontGrey, fontYellow } from '../../widgets/styleGuid';

const items = [
    {
        title: '新幣名稱',
        key: CURRENCY.NAME
    },
    {
        title: '合約地址',
        key: CURRENCY.ADDRESS
    },
    {
        title: '英文縮寫',
        key: CURRENCY.SYMBOL
    },
    {
        title: '發行數量',
        key: CURRENCY.AMOUNT
    },
    {
        title: '網站地址',
        key: CURRENCY.WEB
    },
    {
        title: '簡介',
        key: CURRENCY.INTRODUCTION
    }
];

const SCoverview = styled.div`
    display: flex;
    width: 100%;
    padding-right: 40px;
    padding-top: 43px;

    > div {
        flex: 6;
        display: flex;
        flex-direction: column;

        > div {
            margin-bottom: 20px;
            display: flex;
        }

        p {
            white-space: pre-wrap;
        }

        &:first-child {
            flex: 1;
        }
    }

    img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin: 0 auto;
    }
`;

const SCpayment = styled.div`
    border-top: 1px solid ${fontGrey};
    padding-top: 10px;

    p {
        color: ${fontYellow};
        margin-left: auto;
    }

    ul {
        display: flex;
        flex-direction: column;

        li {
            margin-bottom: 20px;
        }
    }
`;

const Overview = (props) => {
    const { image, payment } = props;
    return (
        <SCoverview>
            <div>
                {image && (
                    <img src={image} alt="Logo" />
                )}
            </div>

            <div>
                {items.map(item => (
                    <div key={item.key}>
                        {item.title}：
                        <p>
                            {props[item.key] || '- -'}
                        </p>
                    </div>
                ))}

                <SCpayment>
                    {
                        payment.type ? (
                            <ul>
                                <li>
                                    付款方式：{payment.type}
                                </li>

                                <li>
                                    卡號：**** **** **** {payment.cardNumber}
                                </li>

                                <li>
                                    付款金額 ({payment.unit})：{payment.cost.toLocaleString()} 元
                                </li>
                            </ul>
                        ) :
                            (
                                <p>應付總額 ({payment.unit})：${payment.cost.toLocaleString()} 元</p>
                            )
                    }
                </SCpayment>
            </div>

        </SCoverview>
    );
};

Overview.propTypes = {
    image: PropTypes.string.isRequired,
    payment: PropTypes.object.isRequired
};

export default Overview;