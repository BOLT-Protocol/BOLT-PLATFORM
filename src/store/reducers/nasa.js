import * as types from '../../constants/actionTypes/nasa';

const initialState = {
    data: {},
    error: null
};

const nasa = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.FETCH_DATA_SUCCESS:
            return {
                ...state,
                error: null,
                data: action.payload.response
            };
        case types.FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                data: {}
            };
        default:
            return state;
    }
};

export default nasa;
