import produce from 'immer';
import * as types from '../../constants/actionTypes/user';

const initialState = {
    token: '',
    isAuth: false,
    error: null,
    userID: '',
    address: '',
    language: '',
    email: '',
    userName: '',
    phone: ''
};

const user = (state = initialState, action = {}) => {
    return produce(state, draft => {
        switch (action.type) {
            case types.USER_AUTH_SUCCESS:
                draft.token = action.token;
                draft.isAuth = true;
                draft.error = null;
                break;
            case types.USER_AUTH_FAIL:
                draft.token = '';
                draft.isAuth = false;
                draft.error = action.error;
                break;
            case types.USER_VERIFY_SUCCESS:
                draft.userID = action.data.userID;
                draft.address = action.data.address;
                draft.isAuth = true;
                draft.error = null;
                break;
            case types.USER_VERIFY_FAIL:
                draft.token = '';
                draft.isAuth = false;
                draft.error = action.error;
                break;
            case types.USER_PROFILE_SUCCESS:
                const { email, language, phone, userName, address } = action.payload;
                draft.email = email;
                draft.language = language;
                draft.phone = phone;
                draft.userName = userName;
                draft.address = address;
                break;
            default:
                return state;
        }
    });
};

export default user;
