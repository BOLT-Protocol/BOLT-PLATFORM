import * as types from '../constants/actionTypes/nasa';

export const startFetchData = () => ({
    type: types.START_FETCH_DATA
});

export const cancelFetchData = () => ({
    type: types.CANCEL_FETCH_DATA
});

export const fetchData = () => ({
    type: types.FETCH_DATA
});

export const fetchDataSuccess = response => ({
    type: types.FETCH_DATA_SUCCESS,
    payload: { response }
});

export const fetchDataFailure = error => ({
    type: types.FETCH_DATA_FAILURE,
    payload: { error }
});
