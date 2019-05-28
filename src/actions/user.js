import * as types from '../constants/actionTypes/user';

export const registerUser$ = payload => {
    return {
        type: types.USER_REGISTER,
        data: payload
    };
};

export const createToken = keys => ({
    type: types.USER_CREATE_TOKEN,
    data: keys
});

// maybe not use
export const authUser = token => ({
    type: types.USER_VERIFY_TOKEN,
    token
});

export const loginUser$ = ({ email, password }) => ({
    type: types.USER_LOGIN,
    data: {
        email,
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
