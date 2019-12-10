/* eslint-disable no-console */
import { from, of } from 'rxjs';
import {
    switchMap,
    debounceTime,
    concatMap,
    map,
    catchError,
    takeUntil,
    mergeMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Cookies from 'universal-cookie';

import * as actions from '../../actions/user';
import * as types from '../../constants/actionTypes/user';
import {
    registerEmail,
    registerPhone,
    // eslint-disable-next-line no-unused-vars
    createToken,
    verifyToken,
    loginPhone,
    loginEmail,
    renewToken
} from '../../utils/api';

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

const registerEmailEpic = action$ =>
    action$.pipe(
        ofType(types.USER_REGISTER_EMAIL),
        debounceTime(1000),
        switchMap(action =>
            from(registerEmail(action.data)).pipe(
                concatMap(res => {
                    const { data } = res;
                    const { token, tokenSecret, message } = data.data;
                    if (!token) return of(actions.authUserFail(message));
                    cookie.set('boltToken', token, { path: '/' });
                    cookie.set('boltSecret', tokenSecret, {
                        path: '/'
                    });
                    return of(actions.authUserSuccess(token));
                    // if (!data.profile) {
                    //     return of(actions.authUserFail(res.data.message));
                    // }

                    // return from(
                    //     createToken({
                    //         apiKey: data.profile.apiKey,
                    //         apiSecret: data.profile.apiSecret
                    //     })
                    // ).pipe(
                    //     map(response => {
                    //         if (!response.data.token)
                    //             return actions.authUserFail(response.data.message);
                    //         cookie.set('boltToken', response.data.token, { path: '/' });
                    //         cookie.set('boltSecret', response.data.tokenSecret, {
                    //             path: '/'
                    //         });
                    //         return actions.authUserSuccess(response.data.token);
                    //     })
                    // );
                })
            )),
        catchError((err, obs) => {
            console.error(err);
            return obs;
        })
    );

const registerPhoneEpic = action$ =>
    action$.pipe(
        ofType(types.USER_REGISTER_PHONE),
        debounceTime(1000),
        switchMap(action =>
            from(registerPhone(action.data)).pipe(
                concatMap(res => {
                    const { data } = res;
                    const { token, tokenSecret, message } = data.data;
                    if (!token) return of(actions.authUserFail(message));
                    cookie.set('boltToken', token, { path: '/' });
                    cookie.set('boltSecret', tokenSecret, {
                        path: '/'
                    });
                    return of(actions.authUserSuccess(token));
                    // if (!data.profile) {
                    //     return of(actions.authUserFail(res.data.message));
                    // }

                    // return from(
                    //     createToken({
                    //         apiKey: data.profile.apiKey,
                    //         apiSecret: data.profile.apiSecret
                    //     })
                    // ).pipe(
                    //     map(response => {
                    //         if (!response.data.token)
                    //             return actions.authUserFail(
                    //                 response.data.message
                    //             );
                    //         cookie.set('boltToken', response.data.token, {
                    //             path: '/'
                    //         });
                    //         cookie.set(
                    //             'boltSecret',
                    //             response.data.tokenSecret,
                    //             {
                    //                 path: '/'
                    //             }
                    //         );
                    //         return actions.authUserSuccess(response.data.token);
                    //     })
                    // );
                })
            )),
        catchError((err, obs) => {
            console.error(err);
            return obs;
        })
    );

const loginEmailEpic = action$ =>
    action$.pipe(
        ofType(types.USER_LOGIN_EMAIL),
        switchMap(action => from(loginEmail(action.data))),
        map(res => {
            const { token, tokenSecret, message } = res.data.data;
            if (token) {
                cookie.set('boltToken', token, { path: '/' });
                cookie.set('boltSecret', tokenSecret, { path: '/' });
                return actions.authUserSuccess(token);
            } else {
                return actions.authUserFail(message);
            }
        }),
        catchError((err, obs) => {
            console.error('Epic', err);
            return obs;
        })
    );

const loginPhoneEpic = action$ =>
    action$.pipe(
        ofType(types.USER_LOGIN_PHONE),
        switchMap(action => from(loginPhone(action.data))),
        map(res => {
            const { token, tokenSecret, message } = res.data.data;
            if (token) {
                cookie.set('boltToken', token, { path: '/' });
                cookie.set('boltSecret', tokenSecret, { path: '/' });
                return actions.authUserSuccess(token);
            } else {
                return actions.authUserFail(message);
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

export default [
    registerEmailEpic,
    registerPhoneEpic,
    loginEmailEpic,
    loginPhoneEpic,
    verifyEpic
];
