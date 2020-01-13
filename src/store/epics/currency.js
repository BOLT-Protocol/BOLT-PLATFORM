import { from, of, combineLatest } from 'rxjs';
import { mergeMap, map, catchError, takeUntil, concatMap } from 'rxjs/operators';
import { ofType } from "redux-observable";

import * as types from '../../constants/actionTypes/currency';
import * as actions from '../../actions/currency';
import { getCurrencyList, getSymbol, getUserBalance } from '../../utils/api';

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

const updateBySymbolEpic = action$ =>
    action$.pipe(
        ofType(types.CURRENCY_LIST_UPDATE),
        mergeMap(
            action => from(getSymbol(action.payload))
                .pipe(
                    map(({ data }) => actions.updateListSuccess({
                        ...data,
                        symbol: action.payload,
                        totalSupply: parseFloat(data.totalSupply, 10),
                        balance: parseFloat(data.balance, 10)
                    }))
                )
        ),
        catchError(error => of(actions.getCurrencyListFail(error))),
    );

const getBalanceEpic = action$ =>
    action$.pipe(
        ofType(types.USER_BALANCE_FETCH),
        mergeMap(
            action => from(getUserBalance(action.payload))
                .pipe(
                    map(({ data }) => actions.getUserBalanceSuccess(data))
                )
        ),
        catchError(() => of(actions.getCurrencyListFail())),
    );

export default [
    currrncyListEpic,
    updateBySymbolEpic,
    getBalanceEpic
];
