import axios from 'axios';

import { serverUrl } from '../constants/config';
import agent from "./wrapRequest";

// TODO refactor axios to wrapRequest

// GetCountryCodes
export const getCountryCodes = () => {
    return new Promise(resolve => {
        return axios.get(`${serverUrl}/countryCodes`).then(res => resolve(res));
    });
};

// Register
export const registerEmail = ({ email, password, code }) => {
    // console.log(email, password, code);
    return new Promise(resolve => {
        return axios
            .post(`${serverUrl}/user/register/email`, {
                email,
                password,
                code
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

export const registerPhone = ({ phone, password, countryCode, code }) => {
    // console.log(phone, password, countryCode,code);
    return new Promise(resolve => {
        return axios
            .post(`${serverUrl}/user/register/phone`, {
                phone,
                countryCode,
                password,
                code
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

// Login
// -- loginIP & clientInfo ??
export const loginEmail = ({ email, password }) => {
    return new Promise(resolve => {
        axios
            .post(`${serverUrl}/user/login/email`, {
                email,
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

export const loginPhone = ({ phone, countryCode, password }) => {
    return new Promise(resolve => {
        axios
            .post(`${serverUrl}/user/login/phone`, {
                phone,
                countryCode,
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

// ForgetPassword
export const getResetPasswordCode = ({ email }) => {
    return new Promise(resolve => {
        axios
            .get(`${serverUrl}/user/resetPassword/${email}`)
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

// -- API bug: 重設密碼
export const resetPassword = ({ email }) => {
    return new Promise(resolve => {
        axios
            .put(`${serverUrl}/user/resetPassword/${email}`)
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

// GetVerifyCode
export const getVerifyCodeEmail = ({ email }) => {
    return axios.get(`${serverUrl}/verification/email/${email}`);
};

// export const getVerifyCodeEmail = ({ email }) => {
//     return new Promise(resolve => {
//         axios
//             .get(`${serverUrl}/verification/email/${email}`)
//             .then(res => resolve(res))
//             .catch(e => {
//                 resolve({
//                     data: {
//                         message: e.message
//                     }
//                 });
//             });
//     });
// };

// -- API 路徑可能有誤
export const getVerifyCodePhone = ({ phone, phoneCode }) => {
    return axios.get(
        `${serverUrl}/verification/phone/${phone}?countryCode=${phoneCode}`
    );
};

// CheckRegister
export const checkRegisteredEmail = email => {
    return new Promise(resolve => {
        return axios
            .get(`${serverUrl}/check/email/${email}`)
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

export const checkRegisteredPhone = (phone, string) => {
    return new Promise(resolve => {
        return axios
            .get(`${serverUrl}/check/phone/${phone}?countryCode=${string}`)
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

// CheckVerifyCode
// --Api missing: no need?
// export const checkVerifyCodeEmail = ({ code, email }) => {
//     return axios.post(`${serverUrl}/api/codeVerify`, {
//         email,
//         code
//     });
// };

// export const checkVerifyCodePhone = ({ phone, phoneCode, code }) => {
//     return axios.post(`${serverUrl}/api/codeVerify`, {
//         phone,
//         phoneCode,
//         code
//     });
// };
// // --API missing: 沒有createToken(不需要)
export const createToken = ({ apiKey, apiSecret }) => {
    return new Promise(resolve => {
        return axios
            .post(`${serverUrl}/createToken`, {
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

// // --API missing: 沒有verifyToken
export const verifyToken = token => {
    const axiosInstance = axios.create({
        headers: {
            token
        }
    });
    return new Promise(resolve => {
        return axiosInstance
            .post(`${serverUrl}/verifyToken`, {})
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

export const destroyToken = ({ token, tokenSecret }) => {
    const axiosInstance = axios.create({
        headers: {
            token
        }
    });
    return new Promise(resolve => {
        return axiosInstance
            .post(`${serverUrl}/destroyToken`, {
                tokenSecret
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

export const createFund = agent.request('/fund/create', 'POST');

export const escrowFund = agent.request('/fund/escrow', 'POST');

export const checkAddress = address => agent.request(`/check/contractAddress/${address}`)();

export const getUserCard = agent.request('/user/card');

export const getBalance = address => agent.request(`/user/address?currencyAddress${address}`);

export const getPaymentToken = agent.request('/payment/token');

export const payment = agent.request('/payment', 'POST');

export const getCost = totalSupply => agent.request(`/payment/cost?totalSupply=${totalSupply}`)();

export const getCurrencyList = agent.request('/user/symbols');

export const getSymbol = symbol => agent.request(`/user/token/${symbol}`)();

export const checkCurrencyName = name => agent.request(`/check/name/${name}`)();

export const checkCurrencySymbol = symbol => agent.request(`/check/symbol/${symbol}`)();