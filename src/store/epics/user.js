/* eslint-disable no-console */
import { from, of } from 'rxjs';
import {
    switchMap,
    debounceTime,
    concatMap,
    map,
    catchError,
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
    loginPhone,
    loginEmail,
    getUserProfile
} from '../../utils/api';

const cookie = new Cookies();

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

const profileEpic = action$ =>
    action$.pipe(
        ofType(types.USER_PROFILE_FETCH),
        switchMap(() => from(getUserProfile())),
        map(res => actions.fetchProfileSuccess(res.data)),
        catchError((err, obs) => {
            console.error('Epic', err);
            return obs;
        })
    );

export default [
    registerEmailEpic,
    registerPhoneEpic,
    loginEmailEpic,
    loginPhoneEpic,
    profileEpic
];
