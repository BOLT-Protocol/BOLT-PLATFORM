import { from, of } from 'rxjs';
import { switchMap, debounceTime, concatMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Cookies from 'universal-cookie';

import * as actions from '../../actions/user';
import * as types from '../../constants/actionTypes/user';
import { register, createToken, verifyToken, login } from '../../utils/keystone';

const cookie = new Cookies();

const registerEpic = action$ =>
    action$.pipe(
        ofType(types.USER_REGISTER),
        debounceTime(1000),
        switchMap(action => from(register(action.data))),
        concatMap(res => {
            const { data } = res;
            return from(
                createToken({
                    apiKey: data.profile.apiKey,
                    apiSecret: data.profile.apiSecret
                })
            );
        }),
        map(res => {
            if (!res.data.token) return actions.authUserFail();
            cookie.set('boltToken', res.data.token, { path: '/' });
            return actions.authUserSuccess(res.data.token);
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

export default [registerEpic, loginEpic];
