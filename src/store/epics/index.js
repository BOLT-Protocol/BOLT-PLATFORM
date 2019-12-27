import { combineEpics } from 'redux-observable';
import fetchDataEpic from './nasa';
import userEpic from './user';
import currencyEpic from './currency';

const rootEpic = combineEpics(...fetchDataEpic, ...userEpic, ...currencyEpic);

export default rootEpic;
