import produce from 'immer';

import * as types from '../../constants/actionTypes/currency';

const initialState = {
    currencyList: [],
    walletAddress: '',
    loading: false
};

const currency = (state = initialState, action = {}) => {
    return produce(state, draft => {
        switch (action.type) {
            case types.CURRENCY_LIST_FETCH:
                draft.loading = true;
                break;
            case types.CURRENCY_LIST_SUCCESS:
                draft.currencyList = action.payload;
                break;
            default:
                return state;
        }
    });
};

export default currency;