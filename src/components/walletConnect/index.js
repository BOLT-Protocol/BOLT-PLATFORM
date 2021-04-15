import React from 'react';
import PropTypes from 'prop-types';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { convertUtf8ToHex } from '@walletconnect/utils';

import { WGmainButton } from '../../widgets/button';
import { WGbuttonField } from '../../widgets/div';
import Loading from '../loading/ringword';

// import { eip712 } from './mock';

const INITIAL_STATE = {
    connector: null,
    fetching: false,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
    uri: '',
    accounts: [],
    address: '',
    result: null,
    assets: [],
};

class WallectConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        localStorage.removeItem('walletconnect');
    }

    walletConnectInit = async () => {
        // bridge url
        const bridge = 'https://bridge.walletconnect.org';

        // create new connector
        const connector = new WalletConnect({
            bridge,
            qrcodeModal: QRCodeModal,
        });

        await this.setState({ connector });

        // // check if already connected
        if (!connector.connected) {
            // create new session
            await connector.createSession();
        }

        // // subscribe to events
        await this.subscribeToEvents();
    };

    subscribeToEvents = () => {
        const { connector } = this.state;

        if (!connector) {
            return;
        }

        connector.on('session_update', async (error, payload) => {
            console.log(`connector.on("session_update")`);

            if (error) {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            this.onSessionUpdate(accounts, chainId);
        });

        connector.on('connect', (error, payload) => {
            console.log(`connector.on("connect")`);

            if (error) {
                throw error;
            }

            this.onConnect(payload);
        });

        connector.on('disconnect', (error, payload) => {
            console.log(`connector.on("disconnect") ${payload}`);

            if (error) {
                throw error;
            }

            this.onDisconnect();
        });

        if (connector.connected) {
            const { chainId, accounts } = connector;

            this.onSessionUpdate(accounts, chainId);
        }

        this.setState({ connector });
    };

    killSession = async () => {
        const { connector } = this.state;
        if (connector) {
            connector.killSession();
        }
        this.resetApp();
    };

    resetApp = async () => {
        await this.setState({ ...INITIAL_STATE });
    };

    onConnect = async (payload) => {
        const { loading } = this.props;
        const { chainId, accounts } = payload.params[0];
        const address = accounts[0];
        await this.setState({
            chainId,
            address,
        });
        loading();

        this.signPersonalMessage();
    };

    onDisconnect = async () => {
        this.resetApp();
    };

    onSessionUpdate = async (accounts, chainId) => {
        const address = accounts[0];
        await this.setState({ chainId, address });
    };

    signPersonalMessage = async () => {
        const { connector, address } = this.state;

        if (!connector) {
            return;
        }

        // test message
        const data = {
            site: window.location.origin,
            timestamp: Date.now(),
        };
        const message = JSON.stringify(data);

        // encode message (hex)
        const hexMsg = convertUtf8ToHex(message);

        // personal_sign params
        const msgParams = [hexMsg, address];

        try {
            // send message
            console.log(msgParams);
            const result = await connector.signPersonalMessage(msgParams);

            // format displayed result
            const formattedResult = {
                method: 'personal_sign',
                address,
                valid: true,
                result,
            };

            const { login } = this.props;
            const { chainId } = this.state;
            login({ msg: data, signature: result, chainId });

            console.log(formattedResult);
        } catch (error) {
            const { cancel } = this.props;
            cancel();
            console.error(error);
        }
    };

    render() {
        // const { connected, pendingRequest, address } = this.state;
        const { user } = this.props;
        return (
            <div>
                <Loading
                    show={user.loading}
                    text="Waiting..."
                    subTitle="WalletConnect"
                />
                <WGbuttonField>
                    <WGmainButton
                        type="button"
                        onClick={this.walletConnectInit}
                    >
                        Connect to WalletConnect
                    </WGmainButton>
                </WGbuttonField>
            </div>
        );
    }
}

WallectConnect.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};

export default WallectConnect;
