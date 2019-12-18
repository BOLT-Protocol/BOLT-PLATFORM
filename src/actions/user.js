import * as types from '../constants/actionTypes/user';

export const registerEmail$ = payload => {
    return {
        type: types.USER_REGISTER_EMAIL,
        data: payload
    };
};

export const registerPhone$ = payload => {
    return {
        type: types.USER_REGISTER_PHONE,
        data: payload
    };
};

export const createToken = keys => ({
    type: types.USER_CREATE_TOKEN,
    data: keys
});

export const verifyUser$ = data => ({
    type: types.USER_VERIFY_TOKEN,
    data
});

export const loginUserEmail$ = ({ email, password }) => ({
    type: types.USER_LOGIN_EMAIL,
    data: {
        email,
        password
    }
});

export const loginUserPhone$ = ({ phone, countryCode, password }) => ({
    type: types.USER_LOGIN_EMAIL,
    data: {
        phone,
        countryCode,
        password
    }
});
export const authUserSuccess = data => ({
    type: types.USER_AUTH_SUCCESS,
    data
});

export const authUserFail = error => ({
    type: types.USER_AUTH_FAIL,
    error
});

export const verifyUserSuccess = payload => ({
    type: types.USER_VERIFY_SUCCESS,
    data: payload
});

export const verifyUserFail = error => ({
    type: types.USER_VERIFY_FAIL,
    error
});

export const cancelVerify = () => ({
    type: types.USER_VERIFY_CANCEL
});

export const renewToken = data => ({
    type: types.USER_RENEW_TOKEN,
    data
});