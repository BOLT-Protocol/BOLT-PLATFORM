import { combineReducers } from 'redux';
import nasa from './nasa';
import user from './user';

const rootReducer = combineReducers({
    nasa,
    user
});

export default rootReducer;
