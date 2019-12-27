import App from 'next/app';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import { Subject, of } from 'rxjs';
import { StateObservable } from 'redux-observable';

import createStore from '../src/store/configureStore';
import Layout from '../src/components/layout';
import UnauthLayout from '../src/components/unauthLayout';
import { appWithTranslation } from '../i18n';
import { bgColor } from '../src/widgets/styleGuid';
import { fetchProfile$ } from '../src/actions/user';
import agent from '../src/utils/wrapRequest';
import rootEpic from '../src/store/epics';

const GlobalStyle = createGlobalStyle`
    body {
        box-sizing: border-box;
        position: relative;
        margin: 0;
		background-color: ${bgColor};

        * {
            font-family:  'Noto Sans TC', 'Roboto', sans-serif;
            font-weight: 300;
			box-sizing: border-box;
        }
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
		cursor: pointer;
    }

	p {
		margin: 0;
	}

	input {
		border: none;
		outline: none;
		background-color: transparent;
	}

	button {
		outline: none;
		border: none;
		cursor: pointer;
	}
`;

class Wrapper extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        if (ctx.isServer) {
            const { store } = ctx;

            const state$ = new StateObservable(new Subject(), store.getState());

            const cookie = new Cookies(ctx.req.headers.cookie);
            const token = cookie.get('boltToken');

            agent.setHeaders({
                token
            });

            const resultAction = await rootEpic(of(fetchProfile$()), state$).toPromise();

            store.dispatch(resultAction);
        }

        return { pageProps };
    }

    renderLayout() {
        const { pageProps, Component } = this.props;
        const { user } = pageProps;

        if (user && !user.isAuth) {
            const { page } = pageProps;
            return (
                <UnauthLayout type={page}>
                    <Component {...pageProps} />
                </UnauthLayout>
            );
        } else {
            return (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            );
        }
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <GlobalStyle />

                {this.renderLayout()}
            </Provider>
        );
    }
}

export default withRedux(createStore)(appWithTranslation(Wrapper));
