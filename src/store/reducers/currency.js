import produce from 'immer';

const initialState = {
    currencyList: [],
    walletAddress: ''
};

const currency = (state = initialState, action = {}) => {
    return produce(state, draft => {
        console.log(draft);
        switch (action.type) {
            default:
                return state;
        }
    });
};

export default currency;