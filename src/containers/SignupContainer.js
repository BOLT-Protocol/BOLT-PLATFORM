import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import produce from 'immer';
import { connect } from 'react-redux';
import Router from 'next/router';

import InputField from '../components/inputField';
import Term from '../components/term';
import BackArrow from '../components/backArrow';
import { WGH1 } from '../widgets/h';
import { WGmainP, WGerrorP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton, WGsmallButton } from '../widgets/button';
import { validateEmail, validatePassword, vaildateEqual } from '../utils/validation';
import { setInput, handleStep } from '../utils/loginService';
import { registerUser$ } from '../actions/user';
import { checkRegistered } from '../utils/keystone';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onRegister$: payload => dispatch(registerUser$(payload))
});

class Signup extends Component {
    static getInitialProps({ store }) {
        const { user } = store.getState();

        return {
            namespacesRequired: [],
            user,
            page: 'signup'
        };
    }

    static propTypes = {
        onRegister$: PropTypes.func.isRequired,
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
            // 1 ~ 3, 3 steps
            page: 1,
            page1: {
                name: {
                    ...initialInput,
                    placeholder: '您的稱呼',
                    error: '此欄位不可為空白'
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
                    hint: '密碼須英數字8個字元以上，32個字元以下',
                    error: '密碼須英數字8個字元以上，32個字元以下'
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
                    error: '驗證碼錯誤'
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
            ],
            termError: false
        };

        this.setInput = setInput.bind(this);
        this.handleStep = handleStep.bind(this);
    }

    componentDidMount() {
        this.count = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props;

        // if signup success
        if (prevState.page === 2 && !prevProps.user.isAuth && user.isAuth) {
            setTimeout(() => {
                this.setState(
                    produce(draft => {
                        draft.page = 3;
                    })
                );

                this.timmer = setTimeout(() => {
                    Router.push('/');
                }, 3000);
            }, 200);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timmer);
        this.count = false;
    }

    handleCheck = index => {
        this.setState(
            produce(draft => {
                draft.terms[index].checked = !draft.terms[index].checked;
            }),
            () => {
                const { terms } = this.state;
                if (terms[0].checked && terms[1].checked) {
                    this.setState(
                        produce(draft => {
                            draft.termError = false;
                        })
                    );
                }
            }
        );
    };

    checkEmail = email => {
        return new Promise(resolve => {
            if (!validateEmail(email)) {
                this.setState(
                    produce(draft => {
                        draft.page1.email.error = '電子郵件格式不符';
                    })
                );

                return resolve(false);
            }

            checkRegistered(email).then(({ data }) => {
                if (!data.isRegister) {
                    return resolve(true);
                } else if (data.isRegister) {
                    this.setState(
                        produce(draft => {
                            draft.page1.email.error = '電子郵件已被註冊';
                        })
                    );

                    return resolve(false);
                } else {
                    this.setState(
                        produce(draft => {
                            draft.page1.email.error = data.message;
                        })
                    );

                    return resolve(false);
                }
            });
        });
    };

    handleSubmit = () => {
        const { onRegister$ } = this.props;
        const { page1, page2, terms } = this.state;
        const { name, email, password } = page1;
        const { cellphone } = page2;

        // check all validation
        for (let el in page2) {
            // eslint-disable-next-line react/destructuring-assignment
            if (!page2[el].valid) {
                this.setState(
                    produce(draft => {
                        draft.page2[el].showError = true;
                    })
                );
                return false;
            }
        }

        // check term
        for (let term of terms) {
            if (!term.checked) {
                return this.setState(
                    produce(draft => {
                        draft.termError = true;
                    })
                );
            }
        }

        this.count = true;

        onRegister$({
            email: email.value,
            password: password.value,
            profile: {
                name: name.value,
                phone: cellphone.value
            }
        });
    };

    sendVeriCode = e => {
        e.preventDefault();

        console.log('Send Verification Code');
    };

    renderHeader() {
        const { page } = this.state;

        if (page < 3) {
            return (
                <div
                    style={{
                        alignItems: 'flex-end'
                    }}
                >
                    <WGH1>註冊</WGH1>

                    <WGmainP>
                        已經有帳號了？ &nbsp;
                        <Link href="/signin">
                            <WGmainA>登入帳號</WGmainA>
                        </Link>
                    </WGmainP>
                </div>
            );
        } else {
            return (
                <Fragment>
                    <WGH1 style={{ marginBottom: '30px' }}>註冊完成</WGH1>

                    <WGmainP>感謝您的註冊，系統將於數秒之後進入主頁面，或按下以下按鈕直接進入，謝謝</WGmainP>
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
                    validCheck = this.checkEmail;
                    break;
                case 'password':
                    validCheck = validatePassword;
                    break;
                case 'replyPassword':
                    const { page1 } = this.state;
                    validCheck = v => vaildateEqual(page1.password.value, v);
                    break;
                default:
                    validCheck = v => v.trim().length > 0;
            }

            const content = <InputField key={key} inputValue={item.value} type={item.type} setInput={this.setInput} name={key} error={item.error} placeholder={item.placeholder} validCheck={validCheck} hint={item.hint} showError={item.showError} valid={item.valid} />;

            if (key === 'veriCode') {
                return (
                    <div key={key} style={{ display: 'flex' }}>
                        {content}

                        <WGsmallButton style={{ marginLeft: '13px' }} onClick={this.sendVeriCode}>
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
                        <WGsmallButton
                            onClick={() => {
                                this.handleStep(2);
                            }}
                        >
                            下一步
                        </WGsmallButton>
                    </div>
                );
            case 2:
                const { user } = this.props;
                const { terms, termError } = this.state;
                const termContent = terms.map((t, i) => <Term key={t.name} term={t.name} link={t.link} checked={t.checked} onChange={() => this.handleCheck(i)} />);
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

                        {termError && <WGerrorP>請勾選條款</WGerrorP>}

                        <WGbuttonField>
                            <WGmainButton onClick={this.handleSubmit}>確認註冊</WGmainButton>
                        </WGbuttonField>

                        {user.error && this.count && <WGerrorP>{user.error}</WGerrorP>}

                        <BackArrow onClick={() => this.handleStep(1, false)} />
                    </div>
                );

            case 3:
                return (
                    <WGbuttonField>
                        <Link href="/">
                            <WGmainButton>進入操作系統頁面</WGmainButton>
                        </Link>
                    </WGbuttonField>
                );

            default:
                return null;
        }
    }

    render() {
        return (
            <WGloginField>
                {this.renderHeader()}

                <form>{this.renderInput()}</form>

                {this.renderStep()}
            </WGloginField>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
