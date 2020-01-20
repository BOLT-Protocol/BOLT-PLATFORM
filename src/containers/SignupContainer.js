/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import produce from 'immer';
import { connect } from 'react-redux';
import Router from 'next/router';

import InputField from '../components/inputField';
import Loading from '../components/loading';
import Term from '../components/term';
// import BackArrow from '../components/backArrow';
import { WGH1 } from '../widgets/h';
import { WGmainP, WGerrorP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton, WGsmallButton } from '../widgets/button';
import { WGmainSelect } from '../widgets/select';
import {
    validateEmail,
    validatePassword,
    vaildateEqual,
    validatePhone
} from '../utils/validation';
import { setInput, handleStep } from '../utils/loginService';
import { registerEmail$, registerPhone$ } from '../actions/user';
import {
    checkRegisteredEmail,
    checkRegisteredPhone,
    getVerifyCodeEmail,
    getVerifyCodePhone
    // checkVerifyCodeEmail,
    // checkVerifyCodePhone
} from '../utils/api';
import countryCodeArr from '../constants/countryCode.json';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onRegisterEmail$: payload => dispatch(registerEmail$(payload)),
    onRegisterPhone$: payload => dispatch(registerPhone$(payload))
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
        onRegisterEmail$: PropTypes.func.isRequired,
        onRegisterPhone$: PropTypes.func.isRequired,
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
                    hint: '密碼長度須為8個字元以上(含8個字)',
                    error: '密碼長度須為8個字元以上(含8個字)'
                },
                replyPassword: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '重新輸入密碼',
                    error: '您的輸入的密碼不符，請重新輸入'
                },
                veriCode: {
                    ...initialInput,
                    placeholder: '信箱驗證碼',
                    error: '驗證碼錯誤'
                }
            },
            page2: {
                cellphone: {
                    ...initialInput,
                    placeholder: '您的手機號碼',
                    error: '手機格式錯誤',
                },
                password: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '設定密碼',
                    hint: '密碼長度須為8個字元以上(含8個字)',
                    error: '密碼長度須為8個字元以上(含8個字)'
                },
                replyPassword: {
                    ...initialInput,
                    type: 'password',
                    placeholder: '重新輸入密碼',
                    error: '您的輸入的密碼不符，請重新輸入'
                },
                veriCode: {
                    ...initialInput,
                    placeholder: '手機驗證碼',
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
            termError: false,
            countryCode: '+886',
            verifyError: false
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
        // if (prevState.page ===  2 && !prevProps.user.isAuth && user.isAuth) {
        if (!prevProps.user.isAuth && user.isAuth) {
            setTimeout(() => {
                this.setState(
                    produce(draft => {
                        draft.page = 3;
                    })
                );
                this.timmer = setTimeout(() => {
                    Router.push('/currenncy');
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
            checkRegisteredEmail(email).then(({ success, message, code }) => {
                if (success) {
                    return resolve(true);
                } else if (code === '00107') {
                    this.setState(
                        produce(draft => {
                            draft.page1.email.error = '電子郵件已被註冊';
                        })
                    );

                    return resolve(false);
                } else {
                    this.setState(
                        produce(draft => {
                            draft.page1.email.error = message;
                        })
                    );

                    return resolve(false);
                }
            });
        });
    };

    checkPhone = (phone) => {
        const { countryCode } = this.state;

        return new Promise(resolve => {
            if (!validatePhone(phone)) {
                this.setState(
                    produce(draft => {
                        draft.page2.cellphone.error = '手機格式錯誤';
                    })
                );

                return resolve(false);
            }
            checkRegisteredPhone(phone, countryCode).then(({ success, message, code }) => {
                if (success) {
                    return resolve(true);
                } else if (code === '00108') {
                    this.setState(
                        produce(draft => {
                            draft.page2.cellphone.error = '手機號碼已被註冊';
                        })
                    );

                    return resolve(false);
                } else {
                    this.setState(
                        produce(draft => {
                            draft.page1.email.error = message;
                        })
                    );

                    return resolve(false);
                }
            });
        });
    };

    handleCountryCode = e => {
        const { value } = e.target;

        this.setState(
            produce(draft => {
                draft.countryCode = value;
            }), () => {
                const { page2 } = this.state;
                const { cellphone } = page2;

                if (cellphone.value !== 2 && cellphone.valid) {

                    this.checkPhone(cellphone.value);
                }
            }
        );
    };

    handleSubmit = () => {
        const { page, terms } = this.state;

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

        if (page === 1) {
            const { page1 } = this.state;
            const { email, password, veriCode } = page1;
            const { onRegisterEmail$ } = this.props;
            // check all validation
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
            onRegisterEmail$({
                email: email.value,
                password: password.value,
                code: veriCode.value
            });
        } else if (page === 2) {
            const { page2, countryCode } = this.state;
            const { cellphone, password, veriCode } = page2;
            const { onRegisterPhone$ } = this.props;
            // check all validation
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
            const pv = cellphone.value;
            const phone = pv.charAt(0) === '0' ? pv.substr(1, pv.length) : pv;

            onRegisterPhone$({
                phone,
                password: password.value,
                countryCode,
                code: veriCode.value
            });
        }
    };

    sendVeriCodeEmail = e => {
        e.preventDefault();
        const { page1 } = this.state;

        this.setState(
            produce(draft => {
                // draft.page1.veriCode.hint = '已發送驗證碼';
            })
        );

        if (page1.email.value.trim() === '') {
            this.setState(
                produce(draft => {
                    draft.page1.email.showError = true;
                })
            );
        }

        if (page1.email.valid) {
            const email = page1.email.value.trim();
            getVerifyCodeEmail({ email })
                .then(res => {
                    const { data } = res;
                    // eslint-disable-next-line no-console
                    console.log(data);
                    if (!data.success) {
                        this.setState(
                            produce(draft => {
                                draft.verifyError = true;
                            })
                        );
                    } else {
                        this.setState(
                            produce(draft => {
                                draft.verifyError = false;
                            })
                        );
                    }
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        }
    };

    sendVeriCodePhone = e => {
        e.preventDefault();
        const { page2, countryCode } = this.state;

        if (page2.cellphone.value.trim() === '') {
            this.setState(
                produce(draft => {
                    draft.page2.cellphone.showError = true;
                })
            );
        }

        if (page2.cellphone.valid) {
            const pv = page2.cellphone.value;
            const phone = pv.charAt(0) === '0' ? pv.substr(1, pv.length) : pv;
            getVerifyCodePhone({ phone, countryCode })
                .then(res => {
                    const { data } = res;
                    if (!data.success) {
                        this.setState(
                            produce(draft => {
                                draft.verifyError = true;
                            })
                        );
                    } else {
                        this.setState(
                            produce(draft => {
                                draft.verifyError = false;
                            })
                        );
                    }
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
        }
    };

    // checkVeriCodeEmail = code => {
    //     const { page1 } = this.state;
    //     const email = page1.email.value.trim() === '';
    //     this.setState(
    //         produce(draft => {
    //             draft.verifyError = false;
    //         })
    //     );

    //     // ***************************
    //     // FOR TEST !!!!!!!!!!!!!!!!!!
    //     // ***************************
    //     if (code === 'BOLT') return true;
    //     // ***************************
    //     // FOR TEST !!!!!!!!!!!!!!!!!!
    //     // ***************************

    //     if (email === '') return false;

    //     return new Promise(resolve => {
    //         checkVerifyCodeEmail({ code, email }).then(res => {
    //             const { data } = res;

    //             if (data.error) {
    //                 return resolve(false);
    //             } else {
    //                 return resolve(true);
    //             }
    //         });
    //     });
    // };

    // checkVeriCodePhone = code => {
    //     const { page2, countryCode } = this.state;
    //     const pv = page2.cellphone.value;
    //     const phone =
    //         countryCode + (pv.charAt(0) === '0' ? pv.substr(1, pv.length) : pv);

    //     this.setState(
    //         produce(draft => {
    //             draft.verifyError = false;
    //         })
    //     );

    //     // ***************************
    //     // FOR TEST !!!!!!!!!!!!!!!!!!
    //     // ***************************
    //     if (code === 'BOLT') return true;
    //     // ***************************
    //     // FOR TEST !!!!!!!!!!!!!!!!!!
    //     // ***************************

    //     if (pv.trim() === '') return false;

    //     return new Promise(resolve => {
    //         checkVerifyCodePhone({ phone, countryCode, code }).then(res => {
    //             const { data } = res;

    //             if (data.error) {
    //                 return resolve(false);
    //             } else {
    //                 return resolve(true);
    //             }
    //         });
    //     });
    // };

    renderHeader() {
        const { page } = this.state;

        if (page < 3) {
            const tag =
                page === 1 ? (
                    <WGmainP
                        style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#9b9b9b'
                        }}
                    >
                        電子郵件註冊&nbsp;|&nbsp;
                        <WGmainA
                            onClick={() => {
                                this.setState(
                                    produce(draft => {
                                        draft.page = 2;
                                    })
                                );
                            }}
                        >
                            手機註冊
                        </WGmainA>
                    </WGmainP>
                )
                    : (
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
                                電子郵件註冊
                            </WGmainA>
                            &nbsp;|&nbsp;手機註冊
                        </WGmainP>
                    );
            return (
                <div
                    style={{
                        alignItems: 'flex-end'
                    }}
                >
                    <WGH1>註冊</WGH1>
                    {tag}
                </div>
            );
        } else {
            return (
                <Fragment>
                    <WGH1 style={{ marginBottom: '30px' }}>註冊完成</WGH1>

                    <WGmainP>
                        感謝您的註冊，系統將於數秒之後進入主頁面，或按下以下按鈕直接進入，謝謝
                    </WGmainP>
                </Fragment>
            );
        }
    }

    renderInput() {
        const { page, phoneCode } = this.state;
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
                    // const { page1 } = this.state;
                    validCheck = v => vaildateEqual(inputs.password.value, v);
                    break;
                case 'cellphone':
                    validCheck = this.checkPhone;
                    break;

                case 'veriCode':
                    // validCheck = this.checkVeriCode;
                    break;
                default:
                    validCheck = v => v.trim().length > 0;
            }

            const content = (
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
            );

            if (key === 'veriCode') {
                const { verifyError } = this.state;
                return (
                    <div
                        key={key}
                        style={{ display: 'flex', position: 'relative' }}
                    >
                        {content}

                        <WGsmallButton
                            style={{ marginLeft: '13px' }}
                            onClick={
                                page === 1
                                    ? this.sendVeriCodeEmail
                                    : this.sendVeriCodePhone
                            }
                        >
                            發送驗證碼
                        </WGsmallButton>
                        {verifyError && (
                            <WGerrorP
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0
                                }}
                            >
                                驗證碼已送出請稍後再試
                            </WGerrorP>
                        )}
                    </div>
                );
            } else if (key === 'cellphone') {
                const { countryCode } = this.state;

                return (
                    <div key={key}>
                        <WGmainSelect
                            name="countryCode"
                            value={countryCode}
                            onChange={this.handleCountryCode}
                            style={{
                                height: '28px',
                                margin: '1rem 0',
                                width: '100%',
                                backgroundColor: '#ffffff15',
                                color: '#ffffff'
                            }}
                        >
                            {countryCodeArr.map(c => (
                                <option key={c.countryName} value={c.phoneCode}>
                                    {c.countryName} {c.phoneCode}
                                </option>
                            ))}
                        </WGmainSelect>
                        <InputField
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
                            valid={item.valid}
                        />
                    </div>
                );
            } else {
                return content;
            }
        });
    }

    renderTerms() {
        const { user } = this.props;
        const { terms, termError } = this.state;
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
                    marginTop: '10px',
                    marginBottom: '20px'
                }}
            >
                {termContent}

                {termError && <WGerrorP>請勾選條款</WGerrorP>}
                {user.error && this.count && <WGerrorP>{user.error}</WGerrorP>}
            </div>
        );
    }

    renderStep() {
        const { page } = this.state;

        switch (page) {
            // case 1:
            //     return ;
            // case 2:
            //     return ;
            // {this.renderTerms()}

            case 3:
                return (
                    <WGbuttonField>
                        <Link href="/">
                            <WGmainButton>進入操作系統頁面</WGmainButton>
                        </Link>
                    </WGbuttonField>
                );

            default:
                const { user } = this.props;
                const { terms, termError } = this.state;
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

                        {termError && <WGerrorP>請勾選條款</WGerrorP>}

                        <WGbuttonField>
                            <WGmainButton onClick={this.handleSubmit}>
                                確認註冊
                            </WGmainButton>
                        </WGbuttonField>

                        {user.error && this.count && (
                            <WGerrorP>{user.error}</WGerrorP>
                        )}

                        <WGmainP
                            style={{
                                textAlign: 'center',
                                fontSize: '14px',
                                width: '100%',
                                marginTop: '22px'
                            }}
                        >
                            已經有帳號了？ &nbsp;
                            <Link href="/signin">
                                <WGmainA>登入帳號</WGmainA>
                            </Link>
                        </WGmainP>
                    </div>
                );
        }
    }

    render() {
        const { user } = this.props;

        return (
            <>
                <WGloginField>
                    {this.renderHeader()}

                    <form>{this.renderInput()}</form>

                    {this.renderStep()}

                </WGloginField>

                <Loading show={user.loading} />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
