import React, { Component, createRef } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Signin from "../../src/containers/SigninContainer";
import QAItem from "../../src/components/QAItem";
import { TextField, TextAreaLayout, TextBody, ImgItem, AItem } from "../../src/components/textField/style";
import {QAHr} from "../../src/components/QAItem/style";

const SigninField = styled.div`
    display: ${props => props.show ? 'none' : 'flex'} !important;
`;

class Index extends Component {
    constructor(props) {
        super(props);
        this.user = props.user;
    }


    render() {
        let noneStyle;
        if (this.user.userName) {
            noneStyle = {};
        } else {
            noneStyle = {
                display: 'none',
            };
        }
        return (
            <div>
                <div
                    style={{
                        marginTop: '40px',
                        marginLeft: '80px',
                        marginRight: '80px',
                        ...noneStyle
                    }}
                >
                    <TextField direction="row">
                        Hello, <a>{this.user.userName}</a>

                        <p>歡迎您透過 Boltchain Platform 連接區塊鏈！</p>
                    </TextField>
                    <TextAreaLayout>
                        <span>平台服務</span>
                        <TextBody direction="row">
                            <div
                                style={{
                                    height: '20px',
                                    width: '100%',
                                }}
                            ></div>
                            <ImgItem>
                                <img src="/static/images/index/boltcurrency.png" alt="Working" />
                                <img src="/static/images/index/group-17.png" alt="Working" />
                                <div>發行與管理數字貨幣</div>
                                <Link href="/currency">
                                    <a>開始使用</a>
                                </Link>
                            </ImgItem>
                            <ImgItem>
                                <img src="/static/images/index/boltevidence.png" alt="Working" />
                                <img src="/static/images/index/group-23.png" alt="Working" />
                                <div>數字貨幣支付 App</div>
                                <Link href="/pay">
                                    <a>開始使用</a>
                                </Link>
                            </ImgItem>
                            <ImgItem>
                                <img src="/static/images/index/boltpay.png" alt="Working" />
                                <img src="/static/images/index/group-27.png" alt="Working" />
                                <div>閃電存證服務</div>
                                <Link href="/trust">
                                    <a>開始使用</a>
                                </Link>
                            </ImgItem>
                        </TextBody>
                    </TextAreaLayout>

                    <br></br>

                    <TextAreaLayout>
                        <span>線上資源</span>
                        <TextBody>
                            <AItem>
                                <Link href="">
                                    <a>Boltchain 區塊鏈瀏覽器</a>
                                </Link>
                            </AItem>
                            <AItem>
                                <Link href="">
                                    <a>說明文件</a>
                                </Link>
                            </AItem>
                            <AItem>
                                <Link href="">
                                    <a>系統諮詢服務說明</a>
                                </Link>
                            </AItem>
                        </TextBody>
                    </TextAreaLayout>

                    <br></br>

                    <TextAreaLayout>
                        <span>常見問題</span>
                        <TextBody>
                            <QAItem
                                question="註冊免費帳戶有哪些需求？"
                                answer=""
                            ></QAItem>
                            <QAHr></QAHr>
                            <QAItem
                                question="免費試用結束時會發生什麼情況？"
                                answer=""
                            ></QAItem>
                            <QAHr></QAHr>
                            <QAItem
                                question="在我用完 NT$6,100 免費點數或 30 天結束後會如何？"
                                answer="我們會通知您，好讓您決定是否要升級為隨用隨付定價，並移除消費限制。如果要這麼做，您將可以存取所有免費產品。若不要這麼做，就會停用您的帳戶與產品，而您必須升級才能繼續使用。"
                            ></QAItem>
                        </TextBody>
                    </TextAreaLayout>

                    <br></br>

                    <TextAreaLayout>
                        <span>我需要更多協助</span>
                        <TextBody>
                            <AItem icon="/static/images/icon/fb.png">
                                <Link href="">
                                    <a
                                        style={{
                                            color: '#15d5c0',
                                            textDecoration: 'underline',
                                        }}
                                    >前往粉絲團詢問小編 &gt;</a>
                                </Link>
                            </AItem>
                            <AItem icon="/static/images/icon/phone.png" isLink="false">
                                <a>撥打銷售專線：0800009449</a>
                            </AItem>
                        </TextBody>
                    </TextAreaLayout>

                    <br></br>
                </div>
                <SigninField show={this.user.userName}>
                    <Signin/>
                </SigninField>
            </div>
        );
    }
}

// Index.propTypes = {
//     router: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withRouter(Index));

