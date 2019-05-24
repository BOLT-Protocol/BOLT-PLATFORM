import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import produce from 'immer';

import InputField from '../components/inputField';
import { WGH1 } from '../widgets/h';
import { WGmainP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton, WGsmallButton } from '../widgets/button';

class Signin extends Component {
    static getInitialProps() {
        const user = {
            isAuth: false
        };

        return {
            namespacesRequired: [],
            user,
            page: 'Signin'
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
            email: {
                ...initialInput,
                type: 'email',
                placeholder: '電子郵件帳號',
                error: '您的電子郵件輸入錯誤，請檢查帳號及格式是否正確，謝謝'
            },
            password: {
                ...initialInput,
                type: 'password',
                placeholder: '密碼',
                error: '您的密碼輸入錯誤，請重新輸入，或使用下方忘記密碼重新設定'
            }
        };
    }

    setInput = ({ value }) => {
        console.log(value);
    };

    renderInput() {
        return Object.keys(this.state).map(key => {
            // eslint-disable-next-line react/destructuring-assignment
            const item = this.state[key];
            return <InputField key={key} inputValue={item.value} type={item.type} setInput={this.setInput} name={key} error={item.error} placeholder={item.placeholder} showError={item.showError} />;
        });
    }

    render() {
        return (
            <WGloginField>
                <div
                    style={{
                        alignItems: 'flex-end'
                    }}
                >
                    <WGH1>帳號登入</WGH1>

                    <WGmainP>
                        或 &nbsp;
                        <Link href="/signup">
                            <WGmainA>或建立帳戶</WGmainA>
                        </Link>
                    </WGmainP>
                </div>

                <form>{this.renderInput()}</form>

                <WGbuttonField>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                    >
                        <input type="checkbox" />

                        <WGmainP>記住我</WGmainP>
                    </div>
                    <WGmainButton>登入</WGmainButton>
                </WGbuttonField>

                <span
                    style={{
                        fontSize: '0.875rem',
                        marginTop: '18px'
                    }}
                >
                    <Link href="/forgetPassword">
                        <WGmainA>忘記密碼？</WGmainA>
                    </Link>
                </span>
            </WGloginField>
        );
    }
}

export default connect(
    null,
    null
)(Signin);
