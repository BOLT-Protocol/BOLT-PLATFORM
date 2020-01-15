import * as types from '../constants/actionTypes/currency';

export const getCurrencyList$ = () => ({
    type: types.CURRENCY_LIST_FETCH
});

export const getCurrencyListSuccess = payload => ({
    type: types.CURRENCY_LIST_SUCCESS,
    payload
});

export const getCurrencyListFail = error => ({
    type: types.CURRENCY_LIST_FAIL,
    payload: error
});

export const cancelCurrencyList$ = () => ({
    type: types.CURRENCY_LIST_CANCEL
});

export const updateListBySymbol$ = payload => ({
    type: types.CURRENCY_LIST_UPDATE,
    payload
});

export const updateListSuccess = payload => ({
    type: types.CURRENCY_LIST_UPDATE_SUCCESS,
    payload
});

export const withDraw$ = payload => ({
    type: types.WITHDRAW_FETCH,
    payload
});

export const getUserBalance$ = payload => ({
    type: types.USER_BALANCE_FETCH,
    payload
});

export const getUserBalanceSuccess = payload => ({
    type: types.USER_BALANCE_SUCCESS,
    payload
});

export const getUserBalanceFail = () => ({
    type: types.USER_BALANCE_FAIL,
});


export const selectToken = payload => ({
    type: types.SET_SELECTED_TOKEN,
    payload
});