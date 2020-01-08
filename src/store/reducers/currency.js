import produce from 'immer';

import * as types from '../../constants/actionTypes/currency';

const initialState = {
    currencyList: [],
    loading: false,
    error: null
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
            default:
                return state;
        }
    });
};

export default currency;