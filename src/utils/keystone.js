import axios from 'axios';
import { url } from '../constants/config';

export const register = ({ email, password, profile }) => {
    return axios
        .post(`${url}/register`, {
            userID: email,
            password,
            profile
        })
        .catch(e => e);
};

export const createToken = ({ apiKey, apiSecret }) => {
    return axios.post(`${url}/createToken`, {
        apiKey,
        apiSecret
    });
};

export const verifyToken = token => {
    const axiosInstance = axios.create({
        headers: {
            token
        }
    });
    return axiosInstance.post(`${url}/verifyToken`, {});
};

export const login = ({ email, password }) => {
    return new Promise(resolve => {
        axios
            .post(`${url}/tenant/login`, {
                userID: email,
                password
            })
            .then(res => resolve(res))
            .catch(e => {
                resolve({
                    data: {
                        message: e
                    }
                });
            });
    });
};
