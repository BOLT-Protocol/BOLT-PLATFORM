import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import WalletConnect from '@walletconnect/client';
// import QRCodeModal from '@walletconnect/qrcode-modal';
// import { convertUtf8ToHex } from '@walletconnect/utils';

import { WGmainButton } from '../../widgets/button';
import { WGbuttonField } from '../../widgets/div';
import Loading from '../loading/ringword';
import useWalletConnect from '../../hooks/useWalletConnect';
import global from '../../hooks/global';
// import { eip712 } from './mock';

const WallectConnect = ({ loading, login, cancel, user }) => {
    global.useWalletConnect = useWalletConnect({
        loading,
        login,
        cancel,
    });
    const [state, walletConnectInit] = global.useWalletConnect;
    useEffect(() => {
        console.log(state);

        localStorage.removeItem('walletconnect');
        return () => {};
    }, []);
    // const { connected, pendingRequest, address } = this.state;
    return (
        <div>
            <Loading
                show={user.loading}
                text="Waiting..."
                subTitle="WalletConnect"
            />
            <WGbuttonField>
                <WGmainButton type="button" onClick={walletConnectInit}>
                    Connect to WalletConnect
                </WGmainButton>
            </WGbuttonField>
        </div>
    );
};

WallectConnect.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};

export default WallectConnect;
