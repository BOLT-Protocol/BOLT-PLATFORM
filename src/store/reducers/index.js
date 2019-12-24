import { combineReducers } from 'redux';
import nasa from './nasa';
import user from './user';
import currency from './currency';

const rootReducer = combineReducers({
    nasa,
    user,
    currency
});

export default rootReducer;
