import { from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from "redux-observable";

import * as types from '../../constants/actionTypes/currency';
import * as actions from '../../actions/currency';
import { getCurrencyList } from '../../utils/api';

const currrncyListEpic = action$ =>
    action$.pipe(
        ofType(types.CURRENCY_LIST_FETCH),
        mergeMap(() => from(getCurrencyList()).pipe(
            map(res => {
                console.log(res);
                return actions.getCurrencyListSuccess(res);
            })
        ))
    );

export default [
    currrncyListEpic
];
