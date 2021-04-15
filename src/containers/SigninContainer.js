/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { WGerrorP } from '../widgets/p';
import { WGloginField } from '../widgets/div';

import { loginUserWC$, userLoading, authUserFail } from '../actions/user';
import { authCheck } from '../utils/auth';
import WalletConnect from '../components/walletConnect';

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    onLoginWC$: (payload) => dispatch(loginUserWC$(payload)),
    onLoading: () => dispatch(userLoading()),
    onCancelWC: () => dispatch(authUserFail()),
});
class Signin extends Component {
    static getInitialProps({ store, req, res }) {
        const { user } = store.getState();
        authCheck(req, res);

        return {
            namespacesRequired: [],
            user,
            page: 'Signin',
        };
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        onLoginWC$: PropTypes.func.isRequired,
        onLoading: PropTypes.func.isRequired,
        onCancelWC: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.count = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props;

        if (!prevProps.user.isAuth && user.isAuth) {
            this.timmer = setTimeout(() => {
                Router.push('/');
            }, 1000);
        }
    }

    componentWillUnmount() {}

    render() {
        const { user, onLoginWC$, onLoading, onCancelWC } = this.props;

        return (
            <>
                <WGloginField>
                    {/* {this.renderHeader()}

                    <form>{this.renderInput()}</form> */}
                    <WalletConnect
                        login={onLoginWC$}
                        user={user}
                        loading={onLoading}
                        cancel={onCancelWC}
                    />

                    {user.error && this.count && (
                        <WGerrorP>{user.error}</WGerrorP>
                    )}
                </WGloginField>

                {/* <Loading show={user.loading} /> */}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
