import produce from 'immer';

import * as types from '../../constants/actionTypes/currency';

const initialState = {
    currencyList: [],
    loading: false,
    error: null,
    selectedToken: null
};

const currency = (state = initialState, action = {}) => {
    return produce(state, draft => {
        switch (action.type) {
            case types.CURRENCY_LIST_FETCH:
                draft.loading = true;
                draft.error = null;
                break;
            case types.CURRENCY_LIST_SUCCESS:
                draft.currencyList = action.payload;
                draft.loading = false;
                break;
            case types.CURRENCY_LIST_FAIL:
                draft.currencyList = [];
                draft.loading = false;
                draft.error = action.payload;
                break;
            case types.CURRENCY_LIST_CANCEL:
                draft.loading = false;
                draft.error = null;
                break;
            case types.CURRENCY_LIST_UPDATE_SUCCESS:
                const index = draft.currencyList.findIndex(curr => curr.symbol === action.payload.symbol);
                draft.currencyList[index] = action.payload;
                draft.error = null;
                break;
            case types.USER_BALANCE_SUCCESS:
                const i = draft.currencyList.findIndex(curr => curr.symbol === action.payload.symbol);
                if (draft.currencyList[i]) draft.currencyList[i].balance = parseFloat(action.payload.balance, 10);
                draft.selectedToken = draft.currencyList[i];
                draft.error = null;
                break;
            case types.USER_BALANCE_FAIL:
                draft.error = 'GET BALANCE FAIL';
                break;
            case types.SET_SELECTED_TOKEN:
                draft.selectedToken = action.payload;
                break;
            default:
                return state;
        }
    });
};

export default currency;