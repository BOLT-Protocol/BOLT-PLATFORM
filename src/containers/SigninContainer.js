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
import { setInput } from '../utils/loginService';
import { validateEmail } from '../utils/validation';
import { loginUser$ } from '../actions/user';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onLigin$: payload => dispatch(loginUser$(payload))
});
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
            page1: {
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
                    error: '帳號與密碼不符'
                }
            }
        };

        this.setInput = setInput.bind(this);
    }

    handleSubmit = () => {
        const { onLigin$ } = this.props;
        const { page1 } = this.state;

        for (let el in page1) {
            // eslint-disable-next-line react/destructuring-assignment
            if (!page1[el].valid) {
                this.setState(
                    produce(draft => {
                        draft.page1[el].showError = true;
                    })
                );
                return false;
            }
        }

        onLigin$({
            email: page1.email.value,
            password: page1.password.value
        });
    };

    renderInput() {
        const { page1 } = this.state;

        return Object.keys(page1).map(key => {
            let validCheck = () => true;

            if (key === 'email') {
                validCheck = validateEmail;
            }
            // eslint-disable-next-line react/destructuring-assignment
            const item = page1[key];
            return <InputField key={key} inputValue={item.value} type={item.type} setInput={this.setInput} name={key} error={item.error} placeholder={item.placeholder} showError={item.showError} validCheck={validCheck} />;
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
                    <WGmainButton onClick={this.handleSubmit}>登入</WGmainButton>
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
    mapStateToProps,
    mapDispatchToProps
)(Signin);
