import React, { Component, Fragment } from 'react';

import produce from 'immer';
import { SCcontainer, SCmessage, SCmain, SCcontent, SCstepList, SCstep, SCbasic, SCstepControl, SCupload, SCshowOption } from './style';
import SelectedItem from '../../components/selectItem';
import InputField from '../../components/inputField';
import input from '../../utils/model/input.model';
import { WGmainButton } from '../../widgets/button';
import Overview from './overview';
import CURRENCY from '../../constants/currencyField';

class Currency extends Component {
    static async getInitialProps() {
        return {
            namespacesRequired: []
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            step: 3,
            program: 1,
            newInfo: {
                [CURRENCY.NAME]: {
                    ...input,
                    title: '新幣名稱',
                    placeholder: '小於30位英文及數字，例：BOLTChain Coin'
                },
                [CURRENCY.ABBREVIATION]: {
                    ...input,
                    title: '英文縮寫',
                    placeholder: '小於8位英文及數字，例：BCC 或 XPA123'
                },
                [CURRENCY.AMOUNT]: {
                    ...input,
                    title: '發行數量',
                    placeholder: '請輸入最少 1,000 枚至最多 100,000 枚數量'
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
            },
            existInfo: {
                [CURRENCY.ADDRESS]: {
                    ...input,
                    title: '合約地址',
                    placeholder: '請輸入您的合約地址'
                },
                [CURRENCY.ABBREVIATION]: {
                    ...input,
                    title: '英文縮寫',
                },
                [CURRENCY.AMOUNT]: {
                    ...input,
                    title: '發行數量',
                    placeholder: '請輸入最少 1,000 枚至最多 100,000 枚數量'
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
            }
        };

        this.steps = ['選擇發幣方式', '填寫基本資訊', '總覽', '填寫付款資訊', '完成'];
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

        this.setState(prevState => ({
            ...prevState,
            step: prevState.step + 1
        }));
    };

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
        console.log(newInfo);

        switch (step) {
            case 1:
                return (
                    <Fragment>
                        <SelectedItem onClick={() => this.handleProgram(1)} selected={program === 1} img="/static/images/bolt_d_new_currency.svg" title="新發幣" desc="適用於無任何Token之用戶" />

                        <SelectedItem onClick={() => this.handleProgram(2)} selected={program === 2} img="/static/images/bolt_d_exchange.svg" title="已發幣託管" desc="適用於已有Token之用戶" />
                    </Fragment>
                );

            case 2:
                const info = program === 1 ? newInfo : existInfo; // if program = 1 show new token, else show hosting token
                return (
                    <SCbasic>
                        <ul>
                            {Object.keys(info).map(key => {
                                const inputProps = {
                                    ...info[key],
                                    name: key,
                                    inputValue: info[key].value,
                                    setInput: this.handleInput.bind(this)
                                };

                                return (
                                    <li key={key}>
                                        <span>{info[key].title}</span>

                                        {key === 'address' ? (
                                            <div>
                                                <InputField {...inputProps} />
                                                <WGmainButton style={{ width: 'initial', height: '25.5px', minWidth: '102px' }}>相容性檢視</WGmainButton>
                                            </div>
                                        ) : (<InputField {...inputProps} />)}
                                    </li>
                                );
                            })}
                        </ul>

                        <div>
                            <SCupload>
                                <h4>上傳 Logo</h4>

                                <input type="file" />

                                <img src="/static/images/ic-cloud-upload.svg" alt="upload" />

                                <p>
                                    最大尺寸 1 mb<br />
                                    檔案類型限 jpg, png, gif
                                </p>

                            </SCupload>

                            <SCshowOption>
                                <input type="checkbox" />

                                是否顯示於平台首頁
                            </SCshowOption>

                        </div>

                    </SCbasic>
                );
            case 3:
                const infos = program === 1 ? newInfo : existInfo;
                const field = {};
                Object.keys(infos).forEach(key => {
                    field[key] = infos[key].value;
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
                    {step > 1 && (
                        <a onClick={this.goBack}>
                            <img src="/static/images/ic_arrow_back.svg" alt="back" />
                            上一步
                        </a>
                    )}

                    {(step === 1 || step === 2) && <WGmainButton onClick={this.nextStep}>完成並下一步</WGmainButton>}
                </SCstepControl>
            </SCcontainer>
        );
    }
}

export default Currency;
