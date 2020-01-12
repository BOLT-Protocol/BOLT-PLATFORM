import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { WGmainButton, WGsecondaryButton } from '../../widgets/button';
import { bgLight, bgHeader } from '../../widgets/styleGuid';
import { WGsecondarySelect } from '../../widgets/select';

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

const Trusteeship = ({ token, tokenList, onSelect, openMint, openBurn }) => {
    const selectedToken = tokenList.find(tk => tk.symbol === token);

    const handleSelect = (e) => {
        const { value } = e.target;
        const tk = tokenList.find(_token => _token.currencyAddress === value);

        onSelect(tk);
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
                                        <option key={tk.currencyID} value={tk.currencyID}>{tk.symbol}</option>
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
                            <WGsecondaryButton onClick={openBurn}>銷毀</WGsecondaryButton>

                            <WGmainButton onClick={openMint}>增發</WGmainButton>
                        </SCbuttonField>
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
    openMint: PropTypes.func.isRequired,
    openBurn: PropTypes.func.isRequired,
};

export default Trusteeship;