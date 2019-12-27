import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { fontWhite, bgLight } from '../../widgets/styleGuid';

const SCcard = styled.div`
    background-color: ${bgLight};
    color: ${fontWhite};
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.21);

    h2 {
        font-size: 1.25rem;
        margin: 0 0 15px 0;
        display: flex;
        align-items: center;
    }

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 1rem;
    }

    > p {
        font-size: .875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:last-child {
            margin-top: 5px;
        }
    }
`;

const CurrencyCard = ({ onSelect, publish, remain, symbol, imgUrl }) => {
    return (
        <SCcard onClick={() => {
            onSelect();
        }}>
            <h2>
                <img src={imgUrl} alt={symbol} />

                {symbol}
            </h2>

            <p>
                已發行數量：{publish.toLocaleString()}
            </p>

            <p>
                剩餘數量： {remain.toLocaleString()}
            </p>
        </SCcard>
    );
};

CurrencyCard.propTypes = {
    onSelect: PropTypes.func.isRequired,
    publish: PropTypes.number.isRequired,
    remain: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default CurrencyCard;
