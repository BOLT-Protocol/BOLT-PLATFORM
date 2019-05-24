import { combineEpics } from 'redux-observable';
import { fetchDataEpic } from './nasa';

const rootEpic = combineEpics(
    fetchDataEpic
);

export default rootEpic;
