import * as types from '../constants/actionTypes/currency';

export const getCurrencyList = () => ({
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