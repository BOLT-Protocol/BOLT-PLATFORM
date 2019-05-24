import { from, of } from 'rxjs';
import { mergeMap, map, takeUntil, catchError, tap } from 'rxjs/operators';
import axios from 'axios';
import { ofType } from 'redux-observable';

import * as actions from '../../actions/nasa';
import * as types from '../../constants/actionTypes/nasa';
const url = 'https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo';

export const fetchDataEpic = action$ =>
	action$
		// export const fetchDataEpic = (action$, state$) => action$
		.pipe(
			ofType(types.START_FETCH_DATA),
			mergeMap(() => from(axios.get(url))),
			tap(console.log),
			map(res => actions.fetchDataSuccess(res.data)),
			catchError(error => of(actions.fetchDataFailure(error))),
			takeUntil(action$.pipe(ofType(types.CANCEL_FETCH_DATA)))
		);
