import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CURRENCY from '../../constants/currency';

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

export const SCoverview = styled.div`
    display: flex;
    width: 100%;

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

const Overview = (props) => {
    const { image } = props;
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

            </div>

        </SCoverview>
    );
};

Overview.propTypes = {
    image: PropTypes.string.isRequired
};

export default Overview;