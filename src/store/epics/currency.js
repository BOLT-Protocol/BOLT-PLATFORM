import { from, of, combineLatest } from 'rxjs';
import { mergeMap, map, catchError, takeUntil, concatMap } from 'rxjs/operators';
import { ofType } from "redux-observable";

import * as types from '../../constants/actionTypes/currency';
import * as actions from '../../actions/currency';
import { getCurrencyList, getSymbol } from '../../utils/api';

const currrncyListEpic = action$ =>
    action$.pipe(
        ofType(types.CURRENCY_LIST_FETCH),
        mergeMap(() => from(getCurrencyList()).pipe(
            concatMap(({ data }) => {
                const { symbols } = data;
                return combineLatest(
                    of(symbols),
                    from(Promise.all(symbols.map(s => getSymbol(s))))
                );
            }),
            map(([symbolsList, resList]) => {
                const result = resList.map((res, i) => ({
                    ...res.data,
                    symbol: symbolsList[i],
                    totalSupply: parseFloat(res.data.totalSupply, 10),
                    balance: parseFloat(res.data.balance, 10)
                }));
                return actions.getCurrencyListSuccess(result);
            }),
            catchError(error => of(actions.getCurrencyListFail(error))),
            takeUntil(action$.pipe(ofType(types.CURRENCY_LIST_CANCEL)))
        ))
    );

export default [
    currrncyListEpic
];
