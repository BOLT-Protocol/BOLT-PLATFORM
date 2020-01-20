import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SCcontainer, SCmessage, SCmain, SCcardHolder, SCuserField } from './style';
import CurrencyCard from '../../components/currency/currencyCard';
import Wallet from '../../components/currency/wallet';
import TrusteeShip from '../../components/currency/trusteeship';
import Loading from '../../components/loading';
import CurrencyModal from '../../components/currency/currencyModal';
import PaymentModal from '../../components/currency/paymentModal';
import ConfirmModal from '../../components/modal/confirmModal';
// import { getUserCard } from '../../utils/api';
import { getCurrencyList$, cancelCurrencyList$, updateListBySymbol$, getUserBalance$, selectToken } from '../../actions/currency';
import authGuard from '../../utils/auth';
import { MINT, BURN, WITHDRAW } from '../../constants/currency';

const Currency = ({ fetchList, list, loading, cancelFetch, userName, userAddress, updateList, getBalance, selectedToken, setSelectedToken }) => {
    const isInitialMount = useRef(true); // 用來確認 didmount 執行
    const [modal, setModal] = useState({ show: false, type: MINT });
    const [openPayment, setOpenPayment] = useState(false);
    const [orderID, setOrderID] = useState(null);
    const [confirm, setConfirm] = useState({ show: false, type: MINT });
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(0); // 顯示用數量

    useEffect(() => {
        if (isInitialMount.current) { // didmount
            isInitialMount.current = false;
            fetchList();
        } else { // didupdate
            // Your useEffect code here to be run on update
            // eslint-disable-next-line no-lonely-if
            if (!selectedToken) {
                setSelectedToken(list[0]);
            } else if (list.length > 0 && selectedToken.currencyID) {
                getBalance(selectedToken.currencyID);
            }
        }
    }, [list, selectedToken]);


    useEffect(() => {
        return () => { cancelFetch(); };
    }, []);

    const handleOpenPayment = ({ orderID: oId }) => {
        setModal({ ...modal, show: false });
        setOrderID(oId);
        setOpenPayment(true);
    };

    const handleOpenMint = () => {
        setModal({ type: MINT, show: true });
    };

    const handleOpenBurn = () => {
        setModal({ type: BURN, show: true });
    };

    const handleOpenWithdraw = () => {
        setModal({ type: WITHDRAW, show: true });
    };

    const paymentSuccess = () => {
        setOpenPayment(false);
        setConfirm({
            show: true,
            type: modal.type
        });
        updateList(selectedToken.symbol);
    };

    const activeSuccess = ({ value }) => {
        setAmount(value);

        setModal({
            ...modal,
            show: false
        });

        setConfirm({
            show: true,
            type: modal.type
        });

        updateList(selectedToken.symbol);
    };

    const hideSuccess = () => {
        setConfirm({
            ...confirm,
            show: false
        });
    };

    const handleError = (e) => {
        setError(e);

        setConfirm({
            type: 'ERROR',
            show: true
        });
    };

    const confirmMessage = () => {
        if (!selectedToken) return '';
        if (confirm.type === MINT) return `付款完成，您可開始使用您的 ${selectedToken.symbol} Token`;
        if (confirm.type === BURN) return `已銷毀 ${amount.toLocaleString()} 個 ${selectedToken.symbol} TOKEN`;
        if (confirm.type === WITHDRAW) return `已提領 ${amount.toLocaleString()} 個 ${selectedToken.symbol} TOKEN 至錢包`;

        return error;
    };

    return (

        <SCcontainer>
            <SCmessage>BOLT Currency 提供了數字貨幣發行與管理功能，每個用户可在BOLTCHAIN發行多次通證。除了通過BOLTCHAIN直接新發行通證；您也可以將已經發行的代幣，通過託管功能轉換等量通證到BOLTCHAIN系統上，以享有BOLT scaling system帶來的強大效能與便利性。</SCmessage>

            <SCmain style={{ flexDirection: 'column' }}>
                <SCcardHolder>
                    {list.map((token, index) => (
                        <CurrencyCard
                            key={token.currencyID}
                            publish={token.totalSupply}
                            remain={token.totalBalance}
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
                                openWithdrawModal={handleOpenWithdraw}
                            />
                        )
                    }

                    <TrusteeShip
                        token={selectedToken ? selectedToken.symbol : ""}
                        tokenList={list}
                        onSelect={setSelectedToken}
                        openPayment={handleOpenPayment}
                        openMint={handleOpenMint}
                        openBurn={handleOpenBurn}
                    />
                </SCuserField>

                <CurrencyModal
                    show={modal.show}
                    type={modal.type}
                    token={selectedToken ? selectedToken.symbol : ''}
                    cancel={() => setModal({ ...modal, show: false })}
                    next={modal.type === MINT ? handleOpenPayment : activeSuccess}
                    onError={handleError}
                />

                <PaymentModal
                    show={openPayment}
                    orderID={orderID}
                    paymentCallback={paymentSuccess}
                    cancel={() => { setOpenPayment(false); }}
                    actionType={modal.type}
                />

                <ConfirmModal
                    show={confirm.show}
                    close={hideSuccess}
                    message={confirmMessage()}
                />

                <Loading show={loading} />
            </SCmain>
        </SCcontainer>
    );

};

Currency.getInitialProps = async (ctx) => {
    // const card = await getUserCard();
    // console.log(card);
    authGuard(ctx);

    return {
        namespacesRequired: []
    };
};

Currency.defaultProps = {
    selectedToken: null
};

Currency.propTypes = {
    fetchList: PropTypes.func.isRequired,
    cancelFetch: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
    updateList: PropTypes.func.isRequired,
    getBalance: PropTypes.func.isRequired,
    selectedToken: PropTypes.object,
    setSelectedToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    list: state.currency.currencyList,
    loading: state.currency.loading,
    userAddress: state.user.address,
    userName: state.user.userName,
    selectedToken: state.currency.selectedToken,
});

const mapDispatchToProps = {
    fetchList: getCurrencyList$,
    cancelFetch: cancelCurrencyList$,
    updateList: updateListBySymbol$,
    getBalance: getUserBalance$,
    setSelectedToken: selectToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);