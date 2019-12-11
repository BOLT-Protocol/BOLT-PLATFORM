import React, { Component } from 'react';
import produce from 'immer';

import { SCcontainer, SCmessage, SCmain, SCcontent, SCstepList, SCstep, SCstepControl, SCfinishField } from './style';
import Overview from './overview';
import CreateProgram from './createProgram';
import CreatData from './createData';
import { WGmainButton } from '../../widgets/button';
import input from '../../utils/model/input.model';
import { validateCurrencyName, validateCurrencySymbol, validateCurrencyAmount, validateAddress } from '../../utils/validation';
import CURRENCY, { MAX_AMOUNT, MIN_AMOUNT } from '../../constants/currency';

import { createFund, checkAddress } from '../../utils/api';

const commonField = {
    [CURRENCY.SYMBOL]: {
        ...input,
        title: '英文縮寫',
        placeholder: '小於8位英文及數字，例：BCC 或 XPA123',
        error: '格式不符合',
        validCheck: validateCurrencySymbol,
    },
    [CURRENCY.AMOUNT]: {
        ...input,
        title: '發行數量',
        placeholder: `請輸入最少 ${MIN_AMOUNT.toLocaleString()} 枚至最多 ${MAX_AMOUNT.toLocaleString()} 枚數量`,
        error: `最少 ${MIN_AMOUNT.toLocaleString()}，最多 ${MAX_AMOUNT.toLocaleString()}`,
        validCheck: validateCurrencyAmount,
    },
    [CURRENCY.WEB]: {
        ...input,
        title: '您的網站',
        placeholder: '請填入您網站的網址'
    },
    [CURRENCY.INTRODUCTION]: {
        ...input,
        title: '簡介',
        placeholder: '內容',
        type: 'textarea',

    }
};

class CreateToken extends Component {
    static async getInitialProps() {
        return {
            namespacesRequired: []
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            program: 1,
            newInfo: {
                [CURRENCY.NAME]: {
                    ...input,
                    title: '新幣名稱',
                    placeholder: '小於30位英文及數字，例：BOLTChain Coin',
                    validCheck: validateCurrencyName,
                    error: '格式不符合'
                },
                ...commonField
            },
            existInfo: {
                [CURRENCY.ADDRESS]: {
                    ...input,
                    title: '合約地址',
                    placeholder: '請輸入您的合約地址',
                    validCheck: this.checkAddress
                },
                ...commonField
            }
        };

        this.steps = ['選擇發幣方式', '填寫基本資訊', '總覽', '填寫付款資訊', '完成'];
    }

    checkAddress = (address) => {
        return new Promise((resolve) => {
            if (!validateAddress(address)) {
                this.setState(
                    produce(draft => {
                        draft.existInfo[CURRENCY.ADDRESS].error = '合約地址格式錯誤';
                    })
                );

                return resolve(false);
            }

            // TODO check api
            checkAddress(/^0x/.test(address) ? address : `0x${address}`).then(res => {
                console.log(res);
            });

            return true;
        });
    }

    handleProgram = program => {
        this.setState(prevState => ({
            ...prevState,
            program
        }));
    };

    handleInput = ({ key, value, valid }) => {
        const { program } = this.state;
        const selectInfo = program === 1 ? 'newInfo' : 'existInfo';

        this.setState(produce(draft => {
            draft[selectInfo][key].value = value;
            draft[selectInfo][key].valid = valid;
            draft[selectInfo][key].value = value;

            if (valid) {
                draft[selectInfo][key].showError = false;
            }
        }));
    }

    goBack = () => {
        const { step } = this.state;

        if (step > 1)
            this.setState(prevState => ({
                ...prevState,
                step: prevState.step - 1
            }));
    };

    nextStep = () => {
        // check

        const { step, program, newInfo, existInfo } = this.state;
        const inputs = program === 1 ? newInfo : existInfo;

        if (step === 2) {
            for (let i in inputs) {
                const field = inputs[i];
                if (field.validCheck && !field.valid) {
                    return this.setState(produce((draft) => {
                        draft[program === 1 ? 'newInfo' : 'existInfo'][i].showError = true;
                    }));
                }
            }
        }

        if (step === 3) {

            const body = {};

            for (let i in inputs) {
                body[i] = inputs[i].value;
            }
            createFund(body);
        }

        this.setState(prevState => ({
            ...prevState,
            step: prevState.step + 1
        }));
    };

    togglePayModal = () => {

    }

    renderStep() {
        const { step } = this.state;

        return this.steps.map((s, i) => {
            const index = i + 1;

            return (
                <SCstep key={s} active={step === index} done={step > index}>
                    <a>{step > index ? <img src="/static/images/ic_check.svg" alt="check" /> : index}</a>

                    <p>{s}</p>
                </SCstep>
            );
        });
    }

    renderContent() {
        const { step, program, newInfo, existInfo } = this.state;
        const inputs = program === 1 ? newInfo : existInfo; // if program = 1 show new token, else show hosting token

        switch (step) {
            case 1:
                return (
                    <CreateProgram program={program} handleProgram={this.handleProgram} />
                );
            case 2:
                return (
                    <CreatData
                        handleInput={this.handleInput.bind(this)}
                        inputs={inputs}
                    />
                );
            case 3:
                const field = {};
                Object.keys(inputs).forEach(key => {
                    field[key] = inputs[key].value;
                });

                return (
                    <Overview {...field} />
                );

            default:
                return null;
        }
    }

    render() {
        const { step } = this.state;
        return (
            <SCcontainer>
                <SCmessage>BOLT Currency 提供了數字貨幣發行與管理功能，每個用户可在BOLTCHAIN發行多次通證。除了通過BOLTCHAIN直接新發行通證；您也可以將已經發行的代幣，通過託管功能轉換等量通證到BOLTCHAIN系統上，以享有BOLT scaling system帶來的強大效能與便利性。</SCmessage>

                <SCmain>
                    <SCstepList>{this.renderStep()}</SCstepList>

                    <SCcontent>{this.renderContent()}</SCcontent>
                </SCmain>

                <SCstepControl>
                    {(step > 1 && step !== 5) && (
                        <a onClick={this.goBack}>
                            <img src="/static/images/ic_arrow_back.svg" alt="back" />
                            上一步
                        </a>
                    )}

                    {(step === 1 || step === 2) && <WGmainButton onClick={this.nextStep}>完成並下一步</WGmainButton>}

                    {step === 3 && <WGmainButton onClick={this.nextStep}>前往付款</WGmainButton>}
                    {step === 5 && <SCfinishField>付款完成，您可開始使用您的 BC Token<WGmainButton onClick={this.nextStep}>開始使用</WGmainButton></SCfinishField>}
                </SCstepControl>
            </SCcontainer>
        );
    }
}

export default CreateToken;
