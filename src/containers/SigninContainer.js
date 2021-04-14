/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import produce from 'immer';
import Router from 'next/router';

import Cookies from 'universal-cookie';
import InputField from '../components/inputField';
import Loading from '../components/loading';
import { WGH1 } from '../widgets/h';
import { WGmainP, WGerrorP } from '../widgets/p';
import { WGmainA } from '../widgets/a';
import { WGloginField, WGbuttonField } from '../widgets/div';
import { WGmainButton } from '../widgets/button';
import { WGmainSelect } from '../widgets/select';
import { setInput } from '../utils/loginService';
import { validateEmail } from '../utils/validation';
import { loginUserWC$ } from '../actions/user';
import CountryCode from '../constants/countryCode.json';
import { authCheck } from '../utils/auth';
import WalletConnect from '../components/walletConnect';

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    onLoginWC$: (payload) => dispatch(loginUserWC$(payload)),
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
        const { user, onLoginWC$ } = this.props;

        return (
            <>
                <WGloginField>
                    {/* {this.renderHeader()}

                    <form>{this.renderInput()}</form> */}
                    <WalletConnect login={onLoginWC$} />

                    {user.error && this.count && (
                        <WGerrorP>{user.error}</WGerrorP>
                    )}
                </WGloginField>

                <Loading show={user.loading} />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
