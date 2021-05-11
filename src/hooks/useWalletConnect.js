import { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { convertUtf8ToHex } from '@walletconnect/utils';

import { getNonce, getFee } from '../utils/api';

const INITIAL_STATE = {
    connector: null,
    fetching: false,
    connected: false,
    chainId: 3, // TODO:
    showModal: false,
    pendingRequest: false,
    uri: '',
    accounts: [],
    address: '',
    result: null,
    assets: [],
};

const useWalletConnect = (props) => {
    const connectorRef = useRef(null);
    const [walletState, setWalletState] = useState(INITIAL_STATE);

    const signPersonalMessage = async (_address) => {
        const address = _address || walletState.address;

        if (!connectorRef.current) {
            return;
        }

        // test message
        const data = {
            site: window.location.origin,
            timestamp: Date.now(),
        };
        const message = JSON.stringify(data);
        console.log('Message: ', message);

        // encode message (hex)
        const hexMsg = convertUtf8ToHex(message);

        // personal_sign params
        const msgParams = [hexMsg, address];

        try {
            // send message
            console.log(msgParams);
            const result = await connectorRef.current.signPersonalMessage(
                msgParams
            );

            // format displayed result
            const formattedResult = {
                method: 'personal_sign',
                address,
                valid: true,
                result,
            };

            const { login } = props;
            const { chainId } = walletState;
            console.log('Address: ', address);
            console.log(result);
            login({ msg: data, signature: result, chainId });

            console.log(formattedResult);
        } catch (error) {
            const { cancel } = props;
            cancel();
            console.error(error);
        }
    };

    const onConnect = async (payload) => {
        const { loading } = props;
        const { chainId, accounts } = payload.params[0];
        const address = accounts[0];
        setWalletState({
            ...walletState,
            chainId,
            address,
            connected: true,
        });
        loading();

        signPersonalMessage(address);
    };

    const resetApp = async () => {
        setWalletState({ ...INITIAL_STATE });
    };

    const killSession = () => {
        if (connectorRef.current) {
            connectorRef.current.killSession();
        }
        resetApp();
    };

    const onDisconnect = async () => {
        resetApp();
    };

    const onSessionUpdate = async (accounts, chainId) => {
        const address = accounts[0];
        setWalletState({ ...walletState, chainId, address });
    };

    const subscribeToEvents = async () => {
        const connector = connectorRef.current;

        if (!connector) {
            return;
        }

        connector.on('session_update', async (error, payload) => {
            console.log(`connector.on("session_update")`);

            if (error) {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            onSessionUpdate(accounts, chainId);
        });

        connector.on('connect', (error, payload) => {
            console.log(`connector.on("connect")`);

            if (error) {
                throw error;
            }

            onConnect(payload);
        });

        connector.on('disconnect', (error, payload) => {
            console.log(`connector.on("disconnect") ${payload}`);

            if (error) {
                throw error;
            }

            onDisconnect();
        });

        if (connector.connected) {
            const { chainId, accounts } = connector;

            onSessionUpdate(accounts, chainId);
        }

        setWalletState({ ...walletState, connector });
    };

    const walletConnectInit = useCallback(async () => {
        // bridge url
        const bridge = 'https://bridge.walletconnect.org';
        console.log(walletState.chainId);

        // create new connector
        const connector = new WalletConnect({
            session: {
                bridge,
                chainId: walletState.chainId, // Not Worked
            },
            qrcodeModal: QRCodeModal,
        });

        connector.chainId = 3;

        connectorRef.current = connector;

        setWalletState({
            ...walletState,
            connector,
        });

        // // check if already connected
        if (!connector.connected) {
            // create new session
            await connector.createSession();
        }

        // // subscribe to events
        await subscribeToEvents();
    });

    const signTransaction = async (
        { data = '0x', value = '0x0', to, blockchainId },
        callback
    ) => {
        // const { connector, address, chainId } = walletState;
        const { address } = walletState;
        const connector = connectorRef.current;

        if (!connector) {
            return;
        }

        // from
        const from = address;
        console.log(from);

        const nonceRes = await getNonce(blockchainId, from);

        const gasPriceRes = await getFee(blockchainId);

        // const gasLimitRes = await getGasLimit(blockchainId)({
        //     fromAddress: from,
        //     toAddress: to,
        //     value,
        //     data,
        // });

        // test transaction
        const tx = {
            from,
            to,
            nonce: (Number(nonceRes.data.nonce) / 10 ** 18).toString(16),
            gasPrice: gasPriceRes.data.standard,
            // gasLimit: (Number(gasLimitRes.data.gasLimit) / 10 ** 18).toString(
            //     16
            // ),
            gasLimit: '0x186a0',
            value,
            data,
        };

        console.log(tx);

        try {
            // open modal
            // this.toggleModal();

            // toggle pending request indicator
            setWalletState({ ...walletState, pendingRequest: true });

            // send transaction
            const result = await connector.sendTransaction(tx);
            console.log(result);

            callback(result);

            // format displayed result
            const formattedResult = {
                method: 'eth_sendTransaction',
                txHash: result,
                from: address,
                to: address,
                value: '0 ETH',
            };

            // display result
            setWalletState({
                ...walletState,
                connector,
                pendingRequest: false,
                result: formattedResult || null,
            });
        } catch (error) {
            console.error(error);
            setWalletState({
                ...walletState,
                connector,
                pendingRequest: false,
                result: null,
            });
        }
    };
    useEffect(() => {});

    return [
        walletState,
        walletConnectInit,
        signTransaction,
        killSession,
        connectorRef,
    ];
};

useWalletConnect.defaultProps = {
    login: () => {},
    cancel: () => {},
};

useWalletConnect.propTypes = {
    login: PropTypes.func,
    cancel: PropTypes.func,
    loading: PropTypes.func.isRequired,
};

export default useWalletConnect;
