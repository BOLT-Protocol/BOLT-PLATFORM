import Router from 'next/router';
import Cookies from 'universal-cookie';

export const authGuard = async ctx => {
    const cookie = new Cookies(ctx.req ? ctx.req.headers.cookie : null);

    const token = cookie.get('boltToken');

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/signin' });
        ctx.res.end();
        return;
    }

    if (!token) {
        Router.replace('/signin');
    }

    return token;
};

export const authCheck = async (req, res) => {
    const cookie = new Cookies(req ? req.headers.cookie : null);

    const token = cookie.get('boltToken');

    if (req && token) {
        res.writeHead(302, { Location: '/' });
        res.end();
        return;
    }

    if (token) {
        Router.replace('/');
    }
};
