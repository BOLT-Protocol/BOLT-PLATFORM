import { from, of } from 'rxjs';
import { switchMap, debounceTime, concatMap, map, catchError, takeUntil, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Cookies from 'universal-cookie';

import * as actions from '../../actions/user';
import * as types from '../../constants/actionTypes/user';
import { register, createToken, verifyToken, login, renewToken } from '../../utils/keystone';

const cookie = new Cookies();

const newToken$ = ({ token, secret }) =>
    from(
        renewToken({
            token,
            tokenSecret: secret
        })
    ).pipe(
        map(res => {
            if (res.data.token) {
                return of(
                    actions.verifyUser$({
                        token: res.data.token,
                        secret: res.data.tokenSecret
                    })
                );
            }
        })
    );

const verifyToken$ = data => {
    return from(verifyToken(data.token)).pipe(
        mergeMap(res => {
            if (res.data && res.data.code === 0) {
                return of(actions.verifyUserSuccess(res.data));
            } else if (res.data && res.code === 5) {
                // renew
                return newToken$(data);
            } else {
                return of(actions.verifyUserFail(res.data.message));
            }
        })
    );
};

const registerEpic = action$ =>
    action$.pipe(
        ofType(types.USER_REGISTER),
        debounceTime(1000),
        switchMap(action => from(register(action.data))),
        concatMap(res => {
            const { data } = res;

            if (!data.profile) {
                return of(actions.authUserFail(res.data.message));
            }

            return from(
                createToken({
                    apiKey: data.profile.apiKey,
                    apiSecret: data.profile.apiSecret
                })
            ).pipe(
                map(response => {
                    if (!response.data.token) return actions.authUserFail(response.data.message);
                    cookie.set('boltToken', response.data.token, { path: '/' });
                    cookie.set('boltSecret', response.data.tokenSecret, { path: '/' });
                    return actions.authUserSuccess(response.data.token);
                })
            );
        }),
        catchError((err, obs) => {
            console.error(err);
            return obs;
        })
    );

const loginEpic = action$ =>
    action$.pipe(
        ofType(types.USER_LOGIN),
        switchMap(action => from(login(action.data))),
        map(res => {
            if (res.data.token) {
                cookie.set('boltToken', res.data.token, { path: '/' });
                cookie.set('boltSecret', res.data.tokenSecret, { path: '/' });
                return actions.authUserSuccess(res.data.token);
            } else {
                return actions.authUserFail(res.data.message);
            }
        }),
        catchError((err, obs) => {
            console.error('Epic', err);
            return obs;
        })
    );

const verifyEpic = action$ =>
    action$.pipe(
        ofType(types.USER_VERIFY_TOKEN),
        mergeMap(action => verifyToken$(action.data)),
        catchError((err, obs) => {
            console.error('Epic', err);
            return obs;
        }),
        takeUntil(action$.pipe(ofType(types.USER_VERIFY_CANCEL)))
    );

export default [registerEpic, loginEpic, verifyEpic];
