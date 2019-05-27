import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';

import InputField from '../components/inputField';
import { WGH1 } from '../widgets/h';
import { WGmainP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton, WGsmallButton } from '../widgets/button';
import { validateEmail, validatePassword, vaildateEqual } from '../utils/validation';
import { setInput, handleStep } from '../utils/loginService';

class ForgetPassword extends Component {
    static getInitialProps() {
        const user = {
            isAuth: false
        };

        return {
            namespacesRequired: [],
            user,
            page: 'forgetPassword'
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
            page: 1,
            page1: {
                email: {
                    ...initialInput,
                    type: 'email',
                    placeholder: '電子郵件帳號',
                    error: '您的電子郵件輸入錯誤，請檢查帳號及格式是否正確，謝謝'
                }
            },
            page3: {
                password: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '密碼',
                    error: '密碼須英數字8個字元以上，32個字元以下'
                },
                replyPassword: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '重新輸入密碼',
                    error: '您的輸入的密碼不符，請重新輸入'
                }
            }
        };

        this.setInput = setInput.bind(this);
        this.handleStep = handleStep.bind(this);
    }

    sendEmail = () => {
        console.log('send email');
    };

    handleSubmit = () => {
        console.log('submit');
        this.handleStep(4);
    };

    renderHeader() {
        const { page } = this.state;

        switch (page) {
            case 1:
                return (
                    <div>
                        <WGH1>忘記密碼</WGH1>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <WGH1>重設密碼信件已寄出</WGH1>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <WGH1>變更密碼</WGH1>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <WGH1>成功變更密碼</WGH1>
                    </div>
                );
            default:
                return null;
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
            let valid;

            if (key === 'email') {
                valid = validateEmail;
            } else if (key === 'password') {
                valid = validatePassword;
            } else if (key === 'replyPassword') {
                const { page3 } = this.state;
                valid = v => vaildateEqual(page3.password.value, v);
            }
            return <InputField key={key} inputValue={item.value} type={item.type} setInput={this.setInput} name={key} error={item.error} placeholder={item.placeholder} showError={item.showError} validCheck={valid} />;
        });
    }

    renderContent() {
        const { page } = this.state;

        switch (page) {
            case 1:
                return (
                    <Fragment>
                        <WGmainP style={{ marginTop: '30px' }}>請輸入您的電子郵件地址以重設密碼，若您沒有收到信件請查看垃圾郵件資料夾，謝謝</WGmainP>

                        <form>{this.renderInput()}</form>
                    </Fragment>
                );
            case 2:
                const { page1 } = this.state;
                return <WGmainP style={{ margin: '30px 0 18px 0' }}>重設信件已寄送至 {page1.email.value} 請檢查您的電子郵件信箱繼續進一步的操作指示</WGmainP>;
            case 3:
                return (
                    <Fragment>
                        <WGmainP style={{ margin: '30px 0 25px 0' }}>密碼須英數字8個字元以上，32個字元以下</WGmainP>
                        {this.renderInput()}
                    </Fragment>
                );
            case 4:
                return <WGmainP style={{ margin: '30px 0 6px 0' }}>您的密碼已變更完成，請重新登入</WGmainP>;
            default:
                return null;
        }
    }

    renderBottom() {
        const { page } = this.state;

        switch (page) {
            case 1:
                return (
                    <Fragment>
                        <WGmainButton
                            onClick={() => {
                                this.sendEmail();

                                this.handleStep(2);
                            }}
                        >
                            寄送郵件
                        </WGmainButton>

                        <div
                            style={{
                                fontSize: '0.875rem',
                                marginTop: '18px',
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <WGmainP>記起你的密碼了嗎？</WGmainP>
                            <Link href="/signin">
                                <WGmainA>登入帳號</WGmainA>
                            </Link>
                        </div>
                    </Fragment>
                );
            case 2:
                return <WGmainButton onClick={() => this.handleStep(3)}>登入</WGmainButton>;

            case 3:
                return <WGmainButton onClick={this.handleSubmit}>確認變更</WGmainButton>;

            case 4:
                return (
                    <Link href="/">
                        <WGmainButton>重新登入</WGmainButton>
                    </Link>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <WGloginField>
                {this.renderHeader()}

                {this.renderContent()}

                <div>
                    <WGbuttonField>{this.renderBottom()}</WGbuttonField>
                </div>
            </WGloginField>
        );
    }
}

export default connect(
    null,
    null
)(ForgetPassword);
