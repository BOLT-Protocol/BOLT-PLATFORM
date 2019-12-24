import produce from 'immer';

const initialState = {
    currencyList: [],
    walletAddress: ''
};

const currency = (state = initialState, action = {}) => {
    return produce(state, (

    ) => {
        switch (action.type) {
            default:
                return state;
        }
    });
};

export default currency;