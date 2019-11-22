import React from 'react';

import { SCoverview } from './style';
import CURRENCY from '../../constants/currencyField';

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
        key: CURRENCY.ABBREVIATION
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

const Overview = (props) => {
    return (
        <SCoverview>
            <div>
                <img src="" alt="" />
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

export default Overview;