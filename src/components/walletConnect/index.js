import React from 'react';
import PropTypes from 'prop-types';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { convertUtf8ToHex } from '@walletconnect/utils';

import { WGmainButton } from '../../widgets/button';
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

    componentDidMount() {}

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
            const address = accounts[0];
            this.setState({
                connected: true,
                // chainId,
                // accounts,
                address,
            });
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
        const { chainId, accounts } = payload.params[0];
        const address = accounts[0];
        console.log('Chain Id', chainId);
        await this.setState({
            connected: true,
            // chainId,
            // accounts,
            address,
        });
        // this.getAccountAssets();
    };

    onDisconnect = async () => {
        this.resetApp();
    };

    onSessionUpdate = async (accounts, chainId) => {
        const address = accounts[0];
        // await this.setState({ chainId, accounts, address });
        await this.setState({ chainId, address });
        // await this.getAccountAssets();
    };

    // getAccountAssets = async () => {
    //     const { address, chainId } = this.state;
    //     this.setState({ fetching: true });
    //     try {
    //         // get account balances
    //         const assets = await apiGetAccountAssets(address, chainId);

    //         await this.setState({ fetching: false, address, assets });
    //     } catch (error) {
    //         console.error(error);
    //         await this.setState({ fetching: false });
    //     }
    // };

    // toggleModal = () => this.setState({ showModal: !this.state.showModal });

    testSignPersonalMessage = async () => {
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
            // open modal
            this.toggleModal();

            // toggle pending request indicator
            this.setState({ pendingRequest: true });

            // send message
            const result = await connector.signPersonalMessage(msgParams);

            console.log(message, '==> ', result);

            // verify signature
            // const hash = hashPersonalMessage(message);
            // const valid = await verifySignature(address, result, hash, chainId);

            // format displayed result
            const formattedResult = {
                method: 'personal_sign',
                address,
                valid: true,
                result,
            };

            const { login } = this.props;
            const { chainId } = this.state;
            login({ msg: data, signature: chainId, chainId, ip: '127.0.0.1' });

            // display result
            this.setState({
                connector,
                pendingRequest: false,
                // result: formattedResult || null,
            });
            console.log(formattedResult);
        } catch (error) {
            console.error(error);
            // this.setState({ connector, pendingRequest: false, result: null });
            this.setState({ connector, pendingRequest: false });
        }
    };

    // testSignTypedData = async () => {
    //     const { connector, address, chainId } = this.state;

    //     if (!connector) {
    //         return;
    //     }

    //     const message = JSON.stringify(eip712.example);

    //     // eth_signTypedData params
    //     const msgParams = [address, message];

    //     try {
    //         // open modal
    //         this.toggleModal();

    //         // toggle pending request indicator
    //         this.setState({ pendingRequest: true });

    //         // sign typed data
    //         const result = await connector.signTypedData(msgParams);

    //         // verify signature
    //         // const hash = hashTypedDataMessage(message);
    //         // const valid = await verifySignature(address, result, hash, chainId);

    //         // format displayed result
    //         const formattedResult = {
    //             method: 'eth_signTypedData',
    //             address,
    //             valid: true,
    //             result,
    //         };
    //         console.log(formattedResult);

    //         // display result
    //         this.setState({
    //             connector,
    //             pendingRequest: false,
    //             result: formattedResult || null,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         this.setState({ connector, pendingRequest: false, result: null });
    //     }
    // };

    render() {
        const { connected, pendingRequest } = this.state;
        return (
            <div>
                <Loading
                    show={pendingRequest}
                    text="Waiting..."
                    subTitle="WalletConnect"
                />
                {connected ? (
                    <WGmainButton
                        type="button"
                        onClick={this.testSignPersonalMessage}
                    >
                        SignTypedData
                    </WGmainButton>
                ) : (
                    <WGmainButton
                        type="button"
                        onClick={this.walletConnectInit}
                    >
                        Connect to WalletConnect
                    </WGmainButton>
                )}
            </div>
        );
    }
}

WallectConnect.propTypes = {
    login: PropTypes.func.isRequired,
};

export default WallectConnect;
