import { combineEpics } from 'redux-observable';
import fetchDataEpic from './nasa';
import userEpic from './user';

const rootEpic = combineEpics(...fetchDataEpic, ...userEpic);

export default rootEpic;
