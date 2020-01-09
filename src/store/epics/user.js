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
    loginPhone,
    loginEmail,
    getUserProfile
} from '../../utils/api';
import agent from '../../utils/wrapRequest';

const cookie = new Cookies();

const registerEmailEpic = action$ =>
    action$.pipe(
        ofType(types.USER_REGISTER_EMAIL),
        debounceTime(1000),
        switchMap(action =>
            from(registerEmail(action.data)).pipe(
                concatMap((res) => of(actions.authCheck(res)))
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
                concatMap(res => actions.authCheck(res))
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
        map(res => actions.authCheck(res)),
        catchError((err, obs) => {
            console.error('Epic', err);
            return obs;
        })
    );

const loginPhoneEpic = action$ =>
    action$.pipe(
        ofType(types.USER_LOGIN_PHONE),
        switchMap(action => from(loginPhone(action.data))),
        map(res => actions.authCheck(res)),
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

const authCheckEpic = action$ =>
    action$.pipe(
        ofType(types.AUTH_CHECK),
        switchMap((action) => {
            const { message, data } = action.payload;
            const { token, tokenSecret } = data;
            if (token) {
                cookie.set('boltToken', token, { path: '/' });
                cookie.set('boltSecret', tokenSecret, { path: '/' });
                agent.setHeaders({
                    token
                });

                return of(
                    actions.authUserSuccess(token),
                    actions.fetchProfile$()
                );
            } else {
                return actions.authUserFail(message);
            }
        })
    );

export default [
    registerEmailEpic,
    registerPhoneEpic,
    loginEmailEpic,
    loginPhoneEpic,
    profileEpic,
    authCheckEpic
];
