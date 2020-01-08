/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import produce from 'immer';
import Router from 'next/router';

import InputField from '../components/inputField';
import Loading from '../components/loading';
import { WGH1 } from '../widgets/h';
import { WGmainP, WGerrorP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton } from '../widgets/button';
import { WGmainSelect } from '../widgets/select';
import { setInput } from '../utils/loginService';
import { validateEmail } from '../utils/validation';
import { loginUserEmail$, loginUserPhone$ } from '../actions/user';
import countryCode from '../constants/countryCode.json';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onLoginEmail$: payload => dispatch(loginUserEmail$(payload)),
    onLoginPhone$: payload => dispatch(loginUserPhone$(payload))
});
class Signin extends Component {
    static getInitialProps({ store }) {
        const { user } = store.getState();

        return {
            namespacesRequired: [],
            user,
            page: 'Signin'
        };
    }

    static propTypes = {
        onLoginEmail$: PropTypes.func.isRequired,
        onLoginPhone$: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const initialInput = {
            type: 'text',
            value: '',
            valid: null,
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
                    error:
                        '您的電子郵件輸入錯誤，請檢查帳號及格式是否正確，謝謝'
                },
                password: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '密碼',
                    error: '帳號與密碼不符'
                }
            },
            page2: {
                cellphone: {
                    ...initialInput,
                    placeholder: '您的手機號碼',
                    error: '手機格式錯誤'
                },
                password: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '密碼',
                    error: '帳號與密碼不符'
                }
            },
            phoneCode: '+886'
        };

        this.setInput = setInput.bind(this);
    }

    componentDidMount() {
        this.count = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props;
        // if signup success
        // if (prevState.page ===  2 && !prevProps.user.isAuth && user.isAuth) {
        if (!prevProps.user.isAuth && user.isAuth) {
            this.timmer = setTimeout(() => {
                Router.push('/');
            }, 1000);
        }
    }

    componentWillUnmount() {
        this.count = false;
    }

    handleSubmit = () => {
        const { page } = this.state;
        this.count = true;
        if (page === 1) {
            const { onLoginEmail$ } = this.props;
            const { page1 } = this.state;
            const { email, password } = page1;
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
            onLoginEmail$({
                email: email.value,
                password: password.value
            });
        } else if (page === 2) {
            const { onLoginPhone$ } = this.props;
            const { page2, phoneCode } = this.state;
            const { cellphone, password } = page2;
            for (let el in page2) {
                // eslint-disable-next-line react/destructuring-assignment
                if (!page2[el].valid) {
                    this.setState(
                        produce(draft => {
                            draft.page1[el].showError = true;
                        })
                    );
                    return false;
                }
            }
            onLoginPhone$({
                phone: cellphone.value,
                phoneCode,
                password: password.value
            });
        }
    };

    handlePhoneCode = e => {
        const { value } = e.target;

        this.setState(
            produce(draft => {
                draft.phoneCode = value;
            })
        );
    };

    renderHeader() {
        const { page } = this.state;
        const tag =
            page === 1 ? (
                <WGmainP
                    style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#9b9b9b'
                    }}
                >
                    信箱&nbsp;|&nbsp;
                    <WGmainA
                        onClick={() => {
                            this.setState(
                                produce(draft => {
                                    draft.page = 2;
                                })
                            );
                        }}
                    >
                        手機號碼
                    </WGmainA>
                </WGmainP>
            ) :
                (
                    <WGmainP
                        style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#9b9b9b'
                        }}
                    >
                        <WGmainA
                            onClick={() => {
                                this.setState(
                                    produce(draft => {
                                        draft.page = 1;
                                    })
                                );
                            }}
                        >
                            信箱
                        </WGmainA>
                        &nbsp;|&nbsp;手機號碼
                    </WGmainP>
                );
        return (
            <div
                style={{
                    alignItems: 'flex-end'
                }}
            >
                <WGH1>帳號登入</WGH1>
                {tag}
            </div>
        );
    }

    renderInput() {
        const { page } = this.state;

        // eslint-disable-next-line react/destructuring-assignment
        const inputs = this.state[`page${page}`];

        if (!inputs) return null;

        return Object.keys(inputs).map(key => {
            let validCheck = () => true;

            if (key === 'email') {
                validCheck = validateEmail;
            }
            // eslint-disable-next-line react/destructuring-assignment
            const item = inputs[key];
            const { phoneCode } = key === 'cellphone' ? this.state : {};
            return key === 'cellphone' ? (
                <div key={key}>
                    <WGmainSelect
                        name="countryCode"
                        value={phoneCode}
                        onChange={this.handlePhoneCode}
                        style={{
                            height: '28px',
                            margin: '1rem 0',
                            width: '100%',
                            backgroundColor: '#ffffff15',
                            color: '#ffffff'
                        }}
                    >
                        {countryCode.map(c => (
                            <option key={c.countryName} value={c.phoneCode}>
                                {c.countryName} {c.phoneCode}
                            </option>
                        ))}
                    </WGmainSelect>
                    <InputField
                        key={key + page}
                        inputValue={item.value}
                        type={item.type}
                        setInput={this.setInput}
                        name={key}
                        error={item.error}
                        placeholder={item.placeholder}
                        validCheck={validCheck}
                        hint={item.hint}
                        showError={item.showError}
                        valid={item.valid}
                    />
                </div>
            ) :
                (
                    <InputField
                        key={key + page}
                        inputValue={item.value}
                        type={item.type}
                        setInput={this.setInput}
                        name={key}
                        error={item.error}
                        placeholder={item.placeholder}
                        showError={item.showError}
                        validCheck={validCheck}
                        valid={item.valid}
                    />
                );
        });
    }

    render() {
        const { user } = this.props;

        return (
            <>
                <WGloginField>
                    {this.renderHeader()}

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
                        <WGmainButton onClick={this.handleSubmit}>
                            登入
                        </WGmainButton>
                    </WGbuttonField>

                    {user.error && this.count && <WGerrorP>{user.error}</WGerrorP>}

                    <div
                        style={{
                            fontSize: '0.875rem',
                            marginTop: '18px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Link href="/forgetPassword">
                            <WGmainA>忘記密碼？</WGmainA>
                        </Link>
                        <WGmainP>
                            或 &nbsp;
                            <Link href="/signup">
                                <WGmainA>或建立帳戶</WGmainA>
                            </Link>
                        </WGmainP>
                    </div>
                </WGloginField>

                <Loading show={user.loading} />

            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
