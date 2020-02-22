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
    phone: '',
    BoltCoin: '',
    avatar: '',
    loading: false
};

const user = (state = initialState, action = {}) => {
    return produce(state, draft => {
        switch (action.type) {
            case types.USER_REGISTER_EMAIL:
            case types.USER_REGISTER_PHONE:
            case types.USER_LOGIN_EMAIL:
            case types.USER_LOGIN_PHONE:
                draft.loading = true;
                break;
            case types.USER_AUTH_SUCCESS:
                draft.token = action.token;
                draft.isAuth = true;
                draft.error = null;
                draft.loading = false;
                break;
            case types.USER_AUTH_FAIL:
                draft.token = '';
                draft.isAuth = false;
                draft.error = action.error;
                draft.loading = false;
                break;
            case types.USER_VERIFY_SUCCESS:
                draft.userID = action.data.userID;
                draft.address = action.data.address;
                draft.isAuth = true;
                draft.error = null;
                draft.loading = false;
                break;
            case types.USER_VERIFY_FAIL:
                draft.token = '';
                draft.isAuth = false;
                draft.error = action.error;
                draft.loading = false;
                break;
            case types.USER_BANNER_INFO_FETCH_SUCCESS:
                const { id, userName, BoltCoin, avatar } = action.data;
                draft.userID = id;
                draft.userName = userName;
                draft.BoltCoin = BoltCoin;
                draft.avatar = avatar;
                draft.isAuth = true;
                break;
            case types.LOGOUT:
                draft.token = '';
                draft.isAuth = false;
                draft.userID = '';
                draft.address = '';
                draft.language = '';
                draft.email = '';
                draft.userName = '';
                draft.phone = '';
                break;
            default:
                return state;
        }
    });
};

export default user;
