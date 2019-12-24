import axios from 'axios';
import Cookies from 'universal-cookie';

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
                .then(({ data }) => resolve(data))
                .catch(e => {
                    if (e.code === '00003') {
                        this.renewToken()
                            .then(({ success, data }) => {
                                if (success) {
                                    const { token, tokenSecret } = data;
                                    const cookie = new Cookies();
                                    cookie.set('boltToken', token, { path: '/' });
                                    cookie.set('boltSecret', tokenSecret, { path: '/' });

                                    this.setHeaders({
                                        token
                                    });
                                    return call.then(({ data: newData }) => resolve(newData));
                                }
                            })
                            .catch(error => console.error(error));
                    }
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