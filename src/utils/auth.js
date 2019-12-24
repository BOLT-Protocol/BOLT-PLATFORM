import Router from 'next/router';
import Cookies from 'universal-cookie';

const authGuard = async ctx => {
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

export default authGuard;
