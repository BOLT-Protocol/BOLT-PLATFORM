import Router from 'next/router';
import Cookies from 'universal-cookie';
import { Subject, of } from 'rxjs';
import { StateObservable } from 'redux-observable';
import rootEpic from '../store/epics';
import * as userActions from '../actions/user';

const authGuard = async ctx => {
    const cookie = new Cookies(ctx.req ? ctx.req.headers.cookie : null);

    const token = cookie.get('boltToken');
    const secret = cookie.get('boltSecret') || '';

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/signin' });
        ctx.res.end();
        return;
    }

    if (!token) {
        Router.push('/signin');
    }

    const state = ctx.store.getState();

    if (!state.user.address) {
        const state$ = new StateObservable(new Subject(), state);
        const resultAction = await rootEpic(of(userActions.verifyUser$({ token, secret })), state$).toPromise();

        ctx.store.dispatch(resultAction);
    }

    return token;
};

export default authGuard;
