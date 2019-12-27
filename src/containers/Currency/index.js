import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SCcontainer, SCmessage, SCmain, SCcardHolder, SCuserField } from './style';
import CurrencyCard from '../../components/currency/currencyCard';
import Wallet from '../../components/currency/wallet';
import TrusteeShip from '../../components/currency/trusteeship';
import Loading from '../../components/loading';
// import { getUserCard } from '../../utils/api';
import { getCurrencyList$, cancelCurrencyList$ } from '../../actions/currency';


const Currency = ({ fetchList, list, loading, cancelFetch, userName, userAddress }) => {
    const [selectedToken, setSelectedToken] = useState(null);
    const isInitialMount = useRef(true); // 用來確認 didmount 執行

    useEffect(() => {
        if (isInitialMount.current) { // didmount
            isInitialMount.current = false;
            fetchList();

            if (list.length > 0) {
                setSelectedToken(list[0]);
            }
        } else { // didupdate
            // Your useEffect code here to be run on update
            // eslint-disable-next-line no-lonely-if
            if (!selectedToken) {
                setSelectedToken(list[0]);
            }
        }

        return () => { cancelFetch(); };
    }, [list]);

    return (

        <SCcontainer>
            <SCmessage>BOLT Currency 提供了數字貨幣發行與管理功能，每個用户可在BOLTCHAIN發行多次通證。除了通過BOLTCHAIN直接新發行通證；您也可以將已經發行的代幣，通過託管功能轉換等量通證到BOLTCHAIN系統上，以享有BOLT scaling system帶來的強大效能與便利性。</SCmessage>

            <SCmain style={{ flexDirection: 'column' }}>
                <SCcardHolder>
                    {list.map((token, index) => (
                        <CurrencyCard
                            key={token.currencyAddress}
                            publish={token.totalSupply}
                            remain={token.balance}
                            symbol={token.symbol}
                            imgUrl={token.logo}
                            onSelect={() => setSelectedToken(list[index])}
                        />
                    ))}
                </SCcardHolder>

                <SCuserField>
                    {
                        selectedToken && (
                            <Wallet
                                token={selectedToken.symbol}
                                address={userAddress}
                                userName={userName}
                                amount={selectedToken.balance}
                            />
                        )
                    }

                    <TrusteeShip
                        token={selectedToken ? selectedToken.symbol : ""}
                        tokenList={list}
                        publishAmount={selectedToken ? selectedToken.totalSupply : 0}
                        publishType={selectedToken ? selectedToken.type : ''}
                        source={selectedToken ? selectedToken.coinSource : ''}
                        onSelect={setSelectedToken}
                    />
                </SCuserField>

                <Loading show={loading} />
            </SCmain>
        </SCcontainer>
    );

};

Currency.getInitialProps = async () => {
    // const card = await getUserCard();
    // console.log(card);
    return {
        namespacesRequired: []
    };
};

Currency.propTypes = {
    fetchList: PropTypes.func.isRequired,
    cancelFetch: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    list: state.currency.currencyList,
    loading: state.currency.loading,
    userAddress: state.user.address,
    userName: state.user.userName
});

const mapDispatchToProps = {
    fetchList: getCurrencyList$,
    cancelFetch: cancelCurrencyList$
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);