import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SCcontainer, SCmessage, SCmain, SCcardHolder, SCuserField } from './style';
import CurrencyCard from '../../components/currency/currencyCard';
import Wallet from '../../components/currency/wallet';
import TrusteeShip from '../../components/currency/trusteeship';
import { getUserCard } from '../../utils/api';
import { getCurrencyList } from '../../actions/currency';

const tokens = [
    {
        address: '0x'.padEnd(42, 0),
        name: 'ETH',
        publishAmount: 2000,
        remainAmount: 2000
    }
];

const user = {
    walletAddress: '123',
    userName: 'Paul'
};

const Currency = ({ fetchList }) => {

    const [selectedToken, setSelectedToken] = useState(null);

    useEffect(() => {
        setSelectedToken(tokens[0]);
        fetchList();
    }, []);

    return (

        <SCcontainer>
            <SCmessage>BOLT Currency 提供了數字貨幣發行與管理功能，每個用户可在BOLTCHAIN發行多次通證。除了通過BOLTCHAIN直接新發行通證；您也可以將已經發行的代幣，通過託管功能轉換等量通證到BOLTCHAIN系統上，以享有BOLT scaling system帶來的強大效能與便利性。</SCmessage>

            <SCmain style={{ flexDirection: 'column' }}>
                <SCcardHolder>
                    {tokens.map(token => (
                        <CurrencyCard
                            key={token.address}
                            publish={token.publishAmount}
                            remain={token.remainAmount}
                            name={token.name}
                        />
                    ))}
                </SCcardHolder>

                <SCuserField>
                    {
                        selectedToken && (
                            <Wallet
                                token={selectedToken.name}
                                address={user.walletAddress}
                                userName={user.userName}
                                amount={selectedToken.remainAmount}
                            />
                        )
                    }

                    <TrusteeShip
                        token={selectedToken ? selectedToken.name : ""}
                        tokenList={tokens}
                        publishAmount={2000}
                        publishType="託管發行"
                        source="Ethereum"
                    />
                </SCuserField>
            </SCmain>
        </SCcontainer>
    );

};

Currency.getInitialProps = async () => {
    const card = await getUserCard();
    console.log(card);
    return {
        namespacesRequired: []
    };
};

Currency.propTypes = {
    fetchList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    list: state.currency.currencyList
});

const mapDispatchToProps = {
    fetchList: getCurrencyList
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);