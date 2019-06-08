import React, { Component } from 'react';
import { SCcontainer, SCmessage, SCmain, SCcontent, SCstepList, SCstep } from './style';

class Currency extends Component {
    static async getInitialProps() {
        console.log('Currency');

        return {
            namespaceRequired: []
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            step: 2
        };

        this.steps = [
            '選擇發幣方式',
            '填寫基本資訊',
            '設定錢包',
            '總覽',
            '填寫付款資訊',
            '完成'
        ];
    }

    renderStep() {
        const { step } = this.state;

        return this.steps.map((s, i) => {
            const index = i + 1;

            return (
                <SCstep key={s} active={step === index} done={step > index}>
                    <a>
                        {
                            step > index ? (
                                <img src="/static/images/ic_check.svg" alt="check"/>
                            ) : index
                        }
                    </a>

                    <p>
                        {s}
                    </p>
                </SCstep>
            );
        });
    }

    render() {
        return (
            <SCcontainer>
                <SCmessage>BOLT Currency 提供了數字貨幣發行與管理功能，每個用户可在BOLTCHAIN發行多次通證。除了通過BOLTCHAIN直接新發行通證；您也可以將已經發行的代幣，通過託管功能轉換等量通證到BOLTCHAIN系統上，以享有BOLT scaling system帶來的強大效能與便利性。</SCmessage>

                <SCmain>
                    <SCstepList>
                        {this.renderStep()}
                    </SCstepList>

                    <SCcontent>
                        renderContent
                    </SCcontent>
                </SCmain>
            </SCcontainer>
        );
    }
}

export default Currency;
