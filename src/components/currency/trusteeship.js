import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { WGmainButton, WGsecondaryButton } from '../../widgets/button';
import { bgLight, bgHeader } from '../../widgets/styleGuid';

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

        > button {
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

const Trusteeship = ({ token, tokenList, publishAmount, publishType, source }) => {
    return (
        <SCtrust>
            <h2>
                我的 {token} Token

                <Link href="/createCurrency">
                    <WGmainButton>新增Token</WGmainButton>
                </Link>
            </h2>

            {
                token ? (
                    <div>
                        <SClist>
                            <div>
                                幣別
                            </div>

                            <select name="token" id="tokenList">
                                {
                                    tokenList.map(tk => (
                                        <option key={tk.address} value={tk.address}>{tk.name}</option>
                                    ))
                                }
                            </select>
                        </SClist>

                        <SClist>
                            <div>
                                發行總量
                            </div>

                            <div>
                                {publishAmount.toLocaleString()}
                                <span>{token}</span>
                            </div>
                        </SClist>

                        <SClist>
                            <div>
                                發幣方式
                            </div>

                            <div>
                                {publishType}
                            </div>
                        </SClist>

                        <SClist>
                            <div>
                                託管來源
                            </div>

                            <div>
                                {source}
                            </div>
                        </SClist>

                        <SCbuttonField>
                            <WGsecondaryButton>銷毀</WGsecondaryButton>

                            <WGmainButton>增發</WGmainButton>
                        </SCbuttonField>
                    </div>
                ) : (
                    <SCempty>
                            您目前無任何 Token
                    </SCempty>
                )
            }
        </SCtrust>
    );
};

Trusteeship.propTypes = {
    token: PropTypes.string.isRequired,
    tokenList: PropTypes.array.isRequired,
    publishAmount: PropTypes.number.isRequired,
    publishType: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
};

export default Trusteeship;