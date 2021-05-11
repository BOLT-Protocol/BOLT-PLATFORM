import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { toast } from 'react-toastify';
import Router from 'next/router';

import {
    SCcontainer,
    SCmessage,
    SCmain,
    SCcontent,
    SCstepList,
    SCstep,
    SCstepControl,
    SCfinishField,
} from './style';
import Overview from './overview';
import CreateProgram from './createProgram';
import CreatData from './createData';
import CreatePayment from '../../components/currency/paymentModal';
import Loading from '../../components/loading';
import { WGmainButton } from '../../widgets/button';
import input from '../../utils/model/input.model';
import {
    validateCurrencyName,
    validateCurrencySymbol,
    validateCurrencyAmount,
    validateAddress,
} from '../../utils/validation';
import CURRENCY, {
    MAX_AMOUNT,
    MIN_AMOUNT,
    CREATE,
} from '../../constants/currency';
import {
    createFund,
    checkAddress,
    getCost,
    escrowFund,
    checkCurrencyName,
    checkCurrencySymbol,
    payForCreate,
} from '../../utils/api';
import { TOAST_OPTIONS } from '../../utils/toast';
import { authGuard } from '../../utils/auth';
import global from '../../hooks/global';

toast.configure(TOAST_OPTIONS);

const CREATE_METHOD = {
    data:
        '0xf3c6606d426f6c7443757272656e63790000000000000000000000000000000000000000',
    to: '0xcdf31C99DE8218bE1963786dEE32a7FB06bC9211',
    blockchainId: '8000025B',
    // value: '0x0',
    value: '0x2386f26fc10000',
};

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
        placeholder: '請填入您網站的網址',
    },
    [CURRENCY.INTRODUCTION]: {
        ...input,
        title: '簡介',
        placeholder: '內容',
        type: 'textarea',
    },
};

class CreateToken extends Component {
    static async getInitialProps(ctx) {
        authGuard(ctx);
        return {
            namespacesRequired: [],
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
                    placeholder: '小於30位英文及數字，例：Boltchain Coin',
                    validCheck: validateCurrencyName,
                    error: '格式不符合',
                },
                ...commonField,
            },
            existInfo: {
                [CURRENCY.ADDRESS]: {
                    ...input,
                    title: '合約地址',
                    placeholder: '請輸入您的合約地址',
                    validCheck: this.checkAddress,
                },
                ...commonField,
            },
            image: null, // Token 圖片
            publish: false, // 是否發布
            orderID: null, // 付款用訂單 id
            showModal: false,
            payment: {
                // 支付
                type: null, // 支付方式
                cost: 0, // 花費
                // unit: '新台幣', // 幣種
                unit: 'ETH', // 幣種
                cardNumber: '', // 卡號
            },
            loading: false,
        };

        this.steps = [
            '選擇發幣方式',
            '填寫基本資訊',
            '總覽',
            // '填寫付款資訊',
            '完成',
        ];
    }

    checkAddress = (address) => {
        return new Promise((resolve) => {
            if (!validateAddress(address)) {
                this.setState(
                    produce((draft) => {
                        draft.existInfo[CURRENCY.ADDRESS].error =
                            '合約地址格式錯誤';
                    })
                );

                return resolve(false);
            }

            // TODO check api
            checkAddress(/^0x/.test(address) ? address : `0x${address}`).then(
                ({ success }) => {
                    resolve(success);
                }
            );
        });
    };

    handleProgram = (program) => {
        this.setState((prevState) => ({
            ...prevState,
            program,
        }));
    };

    handleInput = ({ key, value, valid }) => {
        const { program } = this.state;
        const selectInfo = program === 1 ? 'newInfo' : 'existInfo';

        this.setState(
            produce((draft) => {
                draft[selectInfo][key].value = value;
                draft[selectInfo][key].valid = valid;
                draft[selectInfo][key].value = value;

                if (valid) {
                    draft[selectInfo][key].showError = false;
                }
            })
        );
    };

    handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) {
            e.target.value = '';
            this.setState(
                produce((draft) => {
                    draft.image = null;
                })
            );
            return false;
        }
        const reader = new FileReader();

        reader.onload = () => {
            this.setState(
                produce((draft) => {
                    draft.image = reader.result;
                })
            );
        };
        reader.onerror = () => {
            console.error(reader.error);
        };
        // 讀取檔案
        reader.readAsDataURL(file);
    };

    handlePublish = () => {
        this.setState(
            produce((draft) => {
                draft.publish = !draft.publish;
            })
        );
    };

    goBack = () => {
        const { step } = this.state;

        if (step > 1)
            this.setState((prevState) => ({
                ...prevState,
                step: prevState.step - 1,
            }));
    };

    goNext = () => {
        this.setState((prevState) => ({
            ...prevState,
            step: prevState.step + 1,
        }));
    };

    nextStep = () => {
        // check
        const { step, program, newInfo, existInfo, image } = this.state;
        const inputs = program === 1 ? newInfo : existInfo;

        if (step === 2) {
            for (let i in inputs) {
                const field = inputs[i];
                if (field.validCheck && !field.valid) {
                    return this.setState(
                        produce((draft) => {
                            draft[program === 1 ? 'newInfo' : 'existInfo'][
                                i
                            ].showError = true;
                        })
                    );
                }
            }

            if (!image) {
                return toast.error('請上傳圖片');
            }

            const { start, end } = this.loading();

            const checkPromise = Promise.all([
                checkCurrencyName(inputs[CURRENCY.NAME].value),
                checkCurrencySymbol(inputs[CURRENCY.SYMBOL].value),
            ]);

            start(() =>
                checkPromise
                    .then(([nameRes, symbolRes]) => {
                        if (!nameRes.success) {
                            toast.error('名稱已被使用');
                            return Promise.resolve({ success: false });
                        }

                        if (!symbolRes.success) {
                            toast.error('縮寫已被使用');
                            return Promise.resolve({ success: false });
                        }

                        return getCost(inputs[CURRENCY.AMOUNT].value);
                    })
                    .then(({ data, success }) => {
                        if (success) {
                            this.setState(
                                produce((draft) => {
                                    // draft.payment.cost = parseFloat(
                                    //     data.cost,
                                    //     10
                                    // );
                                    console.log(data);
                                    draft.payment.cost = 1;
                                }),
                                () => {
                                    this.goNext();
                                    end();
                                }
                            );
                        } else {
                            end();
                        }
                    })
            );
        }
        // else if (step === 3) {
        // const { start, end } = this.loading();
        // start(() =>
        //     this.sendToken(inputs).then(({ data, success, message }) => {
        //         if (!success) {
        //             console.error(message);
        //             return end();
        //         }
        //         const { orderID } = data;
        //         this.setState(
        //             produce((draft) => {
        //                 draft.orderID = orderID;
        //             })
        //         );
        //         this.goNext();
        //         this.toggleModal();
        //         end();
        //     })
        // );
        // }
        else {
            this.goNext();
        }
    };

    loading = () => ({
        start: (func) => {
            this.setState(
                produce((draft) => {
                    draft.loading = true;
                }),
                () => func()
            );
        },
        end: () => {
            this.setState(
                produce((draft) => {
                    draft.loading = false;
                })
            );
        },
    });

    paymentCallback = ({ lastFour, type }) => {
        this.toggleModal();
        this.setState(
            produce((draft) => {
                draft.payment = {
                    ...draft.payment,
                    type,
                    cardNumber: lastFour,
                };
            })
        );

        this.nextStep();
    };

    cancelPayment = () => {
        this.goBack();
        this.setState(
            produce((draft) => {
                draft.showModal = false;
            })
        );
    };

    toggleModal = () => {
        this.setState(
            produce((draft) => {
                draft.showModal = !draft.showModal;
            })
        );
    };

    sendToken(inputs) {
        const { image, publish, program } = this.state;
        const body = {};

        for (let i in inputs) {
            body[i] = inputs[i].value;
        }
        if (image) body[CURRENCY.LOGO] = image;

        body.publish = publish;

        if (program === 1) {
            return createFund(body);
        } else {
            return escrowFund(body);
        }
    }

    renderStep() {
        const { step } = this.state;

        return this.steps.map((s, i) => {
            const index = i + 1;

            return (
                <SCstep key={s} active={step === index} done={step > index}>
                    <a>
                        {step > index ? (
                            <img
                                src="/static/images/ic_check.svg"
                                alt="check"
                            />
                        ) : (
                            index
                        )}
                    </a>

                    <p>{s}</p>
                </SCstep>
            );
        });
    }

    renderContent() {
        const {
            step,
            program,
            newInfo,
            existInfo,
            image,
            publish,
            payment,
        } = this.state;
        const inputs = program === 1 ? newInfo : existInfo; // if program = 1 show new token, else show hosting token

        switch (step) {
            case 1:
                return (
                    <CreateProgram
                        program={program}
                        handleProgram={this.handleProgram}
                    />
                );
            case 2:
                return (
                    <CreatData
                        handleInput={this.handleInput}
                        inputs={inputs}
                        handleImage={this.handleImage}
                        image={image}
                        handlePublish={this.handlePublish}
                        publish={publish}
                    />
                );
            case 3:
            case 4:
                const field = {};
                Object.keys(inputs).forEach((key) => {
                    field[key] = inputs[key].value;
                });

                return <Overview {...field} image={image} payment={payment} />;
            default:
                return null;
        }
    }

    render() {
        const {
            step,
            showModal,
            orderID,
            loading,
            program,
            newInfo,
            existInfo,
        } = this.state;
        const symbol = (program === 1 ? newInfo : existInfo)[CURRENCY.SYMBOL]
            .value;

        return (
            <SCcontainer>
                <SCmessage>
                    Bolt Currency
                    提供了數字貨幣發行與管理功能，每個用户可在Boltchain發行多次通證。除了通過Boltchain直接新發行通證；您也可以將已經發行的代幣，通過託管功能轉換等量通證到Boltchain系統上，以享有Bolt
                    scaling system帶來的強大效能與便利性。
                </SCmessage>

                <SCmain>
                    <SCstepList>{this.renderStep()}</SCstepList>

                    <SCcontent>{this.renderContent()}</SCcontent>

                    <CreatePayment
                        show={showModal}
                        orderID={orderID}
                        paymentCallback={this.paymentCallback}
                        cancel={this.cancelPayment}
                        actionType={CREATE}
                    />
                </SCmain>

                <SCstepControl>
                    {step > 1 && step !== 5 && step !== 4 && (
                        <a onClick={this.goBack}>
                            <img
                                src="/static/images/ic_arrow_back.svg"
                                alt="back"
                            />
                            上一步
                        </a>
                    )}

                    {(step === 1 || step === 2) && (
                        <WGmainButton onClick={this.nextStep}>
                            完成並下一步
                        </WGmainButton>
                    )}

                    {step === 3 && (
                        <WalletConnectPay
                            nextStep={this.nextStep}
                            sendToken={() => this.sendToken(newInfo)}
                        />
                    )}
                    {step === 4 && (
                        <SCfinishField>
                            付款完成，您可開始使用您的 {symbol} Token
                            <WGmainButton
                                onClick={() => Router.replace('/currency')}
                            >
                                開始使用
                            </WGmainButton>
                        </SCfinishField>
                    )}
                </SCstepControl>

                <Loading show={loading} />
            </SCcontainer>
        );
    }
}

const WalletConnectPay = ({ nextStep, sendToken }) => {
    const [
        walletState,
        walletConnectInit,
        signTransaction,
        // eslint-disable-next-line no-unused-vars
        _,
    ] = global.useWalletConnect;

    const pay = () => {
        console.log(walletState.address);
        // walletConnectInit();
        if (!walletState.connected) {
            walletConnectInit();
        } else {
            signTransaction(
                {
                    data: CREATE_METHOD.data,
                    value: CREATE_METHOD.value,
                    to: CREATE_METHOD.to,
                    blockchainId: CREATE_METHOD.blockchainId,
                },
                (tx) => {
                    sendToken().then(({ data }) => {
                        const { orderID } = data;
                        payForCreate({
                            orderID,
                            type: 'create',
                            paymentType: 'wallet',
                            txid: tx,
                            address: walletState.address,
                        }).then(() => {
                            nextStep();
                        });
                    });
                }
            );
        }
    };
    return <WGmainButton onClick={pay}>前往付款</WGmainButton>;
};

WalletConnectPay.propTypes = {
    nextStep: PropTypes.func.isRequired,
    sendToken: PropTypes.func.isRequired,
};

export default CreateToken;
