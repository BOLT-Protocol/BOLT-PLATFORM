import axios from 'axios';
import { serverUrl } from '../constants/config';

class WrapRequest {
    defaultHeaders = {
        'Accept': 'application/json;charset=UTF-8'
    }

    setHeaders = headers => {
        this.defaultHeaders = {
            ...this.defaultHeaders,
            ...headers
        };

        return this;
    }

    request = (url, method = 'GET', customHeaders = {}) => (body = {}) => {
        const axiosInstance = axios.create({
            headers: {
                ...this.defaultHeaders,
                ...customHeaders
            }
        });

        return new Promise(resolve => {
            return axiosInstance
                [method.toLowerCase()](`${serverUrl}${url}`, body)
                .then(({ data }) => resolve(data))
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