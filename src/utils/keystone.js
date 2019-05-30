import axios from 'axios';
import { keystoneUrl } from '../constants/config';

export const register = ({ email, password, profile }) => {
    return new Promise(resolve => {
        return axios
            .post(`${keystoneUrl}/register`, {
                userID: email,
                password,
                profile
            })
            .then(res => resolve(res))
            .catch(e => {
                resolve({
                    data: {
                        message: e.message
                    }
                });
            });
    });
};

export const checkRegistered = email => {
    return new Promise(resolve => {
        return axios
            .get(`${keystoneUrl}/isRegister/${email}`)
            .then(res => resolve(res))
            .catch(e => {
                resolve({
                    data: {
                        message: e.message
                    }
                });
            });
    });
};

export const createToken = ({ apiKey, apiSecret }) => {
    return new Promise(resolve => {
        return axios
            .post(`${keystoneUrl}/createToken`, {
                apiKey,
                apiSecret
            })
            .then(res => resolve(res))
            .catch(e => {
                resolve({
                    data: {
                        message: e.message
                    }
                });
            });
    });
};

export const verifyToken = token => {
    const axiosInstance = axios.create({
        headers: {
            token
        }
    });
    return new Promise(resolve => {
        return axiosInstance
            .post(`${keystoneUrl}/verifyToken`, {})
            .then(res => resolve(res))
            .catch(e => {
                resolve({
                    data: {
                        message: e.message
                    }
                });
            });
    });
};

export const login = ({ email, password }) => {
    return new Promise(resolve => {
        axios
            .post(`${keystoneUrl}/tenant/login`, {
                userID: email,
                password
            })
            .then(res => resolve(res))
            .catch(e => {
                resolve({
                    data: {
                        message: e.message
                    }
                });
            });
    });
};
