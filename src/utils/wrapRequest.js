import axios from 'axios';
import Cookies from 'universal-cookie';
import Router from 'next/router';

import { serverUrl } from '../constants/config';

class WrapRequest {
    defaultHeaders = {
        'Accept': 'application/json;charset=UTF-8'
    }

    constructor() {
        const cookie = new Cookies();
        const token = cookie.get('boltToken');
        this.tokenSecret = cookie.get('boltSecret');

        this.setHeaders({
            token
        });
    }

    setHeaders = headers => {
        this.defaultHeaders = {
            ...this.defaultHeaders,
            ...headers
        };

        return this;
    }

    renewToken = () => this.request('/renewToken', 'POST')({ tokenSecret: this.tokenSecret });

    request = (url, method = 'GET', customHeaders = {}) => (body = {}) => {
        const axiosInstance = axios.create({
            headers: {
                ...this.defaultHeaders,
                ...customHeaders
            }
        });

        return new Promise(resolve => {
            const call = axiosInstance[method.toLowerCase()](`${serverUrl}${url}`, body);

            return call
                .then(({ data }) => {
                    if (data.code === '00116') {
                        const cookie = new Cookies();

                        this.renewToken()
                            .then(({ success, data: tokenData }) => {
                                if (success) {
                                    const { token, tokenSecret } = tokenData;
                                    cookie.set('boltToken', token, { path: '/' });
                                    cookie.set('boltSecret', tokenSecret, { path: '/' });

                                    this.setHeaders({
                                        token
                                    });
                                    return call.then(({ data: newData }) => resolve(newData));
                                } else {
                                    cookie.remove('boltToken');
                                    cookie.remove('boltSecret');

                                    Router.replace('/signin');
                                }
                            })
                            // eslint-disable-next-line no-console
                            .catch(error => console.error(error));
                    }
                    resolve(data);
                })
                .catch(e => {
                    resolve({
                        data: {
                            message: e.message
                        }
                    });
                });
        });
    }
}

const wrapRequest = new WrapRequest();

export default wrapRequest;