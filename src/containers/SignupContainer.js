import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import produce from "immer";
import { connect } from 'react-redux';

import InputField from '../components/inputField';
import Term from '../components/term';
import BackArrow from '../components/backArrow';
import { WGH1 } from '../widgets/h';
import { WGmainP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton, WGsmallButton } from '../widgets/button';
import { validateEmail, validatePassword } from '../utils/validation';

class Signup extends Component {
    static getInitialProps() {
        const user = {
            isAuth: false
        };

        return {
            namespacesRequired: [],
            user,
            page: 'signup'
        };
    }

    constructor(props) {
        super(props);

        const initialInput = {
            type: 'text',
            value: '',
            valid: false,
            error: '',
            hint: '',
            placeholder: '',
            showError: false
        };

        this.state = {
            // 1 ~ 3, 3 steps
            page: 3,
            page1: {
                name: {
                    ...initialInput,
                    placeholder: '您的稱呼',
                    error: '此欄位不可為空白',
                },
                email: {
                    ...initialInput,
                    type: 'email',
                    placeholder: '電子郵件帳號',
                    error: '電子郵件格式不符'
                },
                password: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '設定密碼',
                    hint: '密碼長度須為8個字元以上，32個字元以下',
                    error: '密碼長度須為8個字元以上，32個字元以下'
                },
                replyPassword: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '重新輸入密碼',
                    error: '您的輸入的密碼不符，請重新輸入'
                }
            },
            page2: {
                cellphone: {
                    ...initialInput,
                    placeholder: '您的手機號碼',
                    error: '手機格式錯誤'

                },
                veriCode: {
                    ...initialInput,
                    placeholder: '輸入手機驗證碼',
                    error: '驗證碼錯誤',
                }
            },
            terms: [
                {
                    name: 'BOLT服務條款',
                    checked: false,
                    link: '/'
                },
                {
                    name: 'BOLT隱私權政策',
                    checked: false,
                    link: '/'
                }
            ]
        };
    }

    handleStep = (step, check = true) => {
        // step: go to step
        // check: should check valid ? for back feature

        const { page } = this.state;

        // eslint-disable-next-line react/destructuring-assignment
        const checkedPage = this.state[`page${page}`];

        // check all validation
        for (let el in checkedPage) {
            // eslint-disable-next-line react/destructuring-assignment
            if (!checkedPage[el].valid && check) {

                this.setState(
                    produce(draft => {
                        draft[`page${page}`][el].showError = true;
                    })
                );
                return false;
            }
        }

        this.setState(
            produce(draft => {
                draft.page = step;
            })
        );
    }

    handleCheck = (index) => {
        this.setState(
            produce(draft => {
                draft.terms[index].checked = !draft.terms[index].checked;
            })
        );
    }

    setInput = ({ key, value, valid }) => {
        const { page } = this.state;

        this.setState(
            produce(draft => {
                draft[`page${page}`][key].value = value;
                draft[`page${page}`][key].valid = valid;

                if (valid) {
                    draft[`page${page}`][key].showError = false;
                }

                // if input password and replyPassword aready has value
                if (key === 'password' && draft[`page${page}`].replyPassword.value !== '') {

                    // if password value === replyPassword value, set replyPassword valid
                    draft[`page${page}`].replyPassword.valid = (draft[`page${page}`].replyPassword.value === value);
                }
            }),
            () => {
                console.log(this.state);
            }
        );
    }

    validateReplyPassword = (v) => {
        const { page1 } = this.state;
        return v === page1.password.value;
    }

    sendVeriCode = (e) => {
        e.preventDefault();

        console.log('Send Verification Code');
    }

    renderHeader() {
        const { page } = this.state;

        if (page < 3) {
            return (
                <div>
                    <WGH1>註冊</WGH1>

                    <WGmainP>
                        已經有帳號了？
                        &nbsp;

                        <Link href="/signin">
                            <WGmainA>
                                登入帳號
                            </WGmainA>

                        </Link>

                    </WGmainP>
                </div>
            );
        }
        else {
            return (
                <Fragment>
                    <WGH1
                        style={{ marginBottom: '30px'}}
                    >
                        註冊完成
                    </WGH1>

                    <WGmainP>

                        感謝您的註冊，系統將於數秒之後進入主頁面，或按下以下按鈕直接進入，謝謝

                    </WGmainP>
                </Fragment>
            );
        }
    }

    renderInput() {
        const { page } = this.state;

        // eslint-disable-next-line react/destructuring-assignment
        const inputs = this.state[`page${page}`];

        // if no input, don't render input
        if (!inputs) return null;

        return Object.keys(inputs).map(key => {
            // eslint-disable-next-line react/destructuring-assignment
            const item = inputs[key];

            let validCheck;

            switch (key) {
                case 'email':
                    validCheck = validateEmail;
                    break;
                case 'password':
                    validCheck = validatePassword;
                    break;
                case 'replyPassword':
                    validCheck = this.validateReplyPassword;
                    break;
                default:
                    validCheck = v => v.trim().length > 0;
            }

            const content = <InputField
                key={key}
                inputValue={item.value}
                type={item.type}
                setInput={this.setInput}
                name={key}
                error={item.error}
                placeholder={item.placeholder}
                validCheck={validCheck}
                hint={item.hint}
                showError={item.showError}
            />;


            if (key === 'veriCode') {
                return (
                    <div key={key} style={{ display: 'flex' }}>
                        {content}

                        <WGsmallButton
                            style={{ marginLeft: '13px' }}
                            onClick={this.sendVeriCode}
                        >
                            取得驗證碼
                        </WGsmallButton>
                    </div>
                );
            } else {
                return content;
            }
        });
    }

    renderStep() {
        const { page } = this.state;

        switch (page) {
            case 1:
                return (
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <WGsmallButton onClick={() => { this.handleStep(2); }}>
                            下一步
                        </WGsmallButton>
                    </div>
                );
            case 2:

                const { terms } = this.state;
                const termContent = terms.map((t, i) => (
                    <Term
                        key={t.name}
                        term={t.name}
                        link={t.link}
                        checked={t.checked}
                        onChange={() => this.handleCheck(i)}
                    />
                ));
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            marginTop: '10px'
                        }}
                    >
                        {termContent}

                        <WGbuttonField>

                            <WGmainButton onClick={() => { this.handleStep(3); }}>
                                確認註冊
                            </WGmainButton>

                        </WGbuttonField>

                        <BackArrow onClick={() => this.handleStep(1, false)} />

                    </div>
                );

            case 3:
                return(
                    <WGbuttonField>
                        <Link href="/">
                            <WGmainButton>
                                進入操作系統頁面
                            </WGmainButton>
                        </Link>

                    </WGbuttonField>);

            default:
                return null;
        }
    }

    render() {

        return (
            <Fragment>

                <WGloginField>

                    {this.renderHeader()}

                    <form>

                        {this.renderInput()}

                    </form>

                    {this.renderStep()}

                </WGloginField>
            </Fragment>
        );
    }
}

export default connect(
    null,
    null
)(Signup);
