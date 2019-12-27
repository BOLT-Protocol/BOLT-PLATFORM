import produce from 'immer';

import * as types from '../../constants/actionTypes/currency';

const initialState = {
    currencyList: [],
    walletAddress: '',
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
            default:
                return state;
        }
    });
};

export default currency;