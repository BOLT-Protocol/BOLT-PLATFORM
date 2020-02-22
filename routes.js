const nextRoute = require('next-routes');

const routes = nextRoute();

const APP_ROUTES = [
    {
        page: 'index',
        pattern: '/'
    },
    {
        page: 'signup',
        pattern: '/signup'
    },
    {
        page: 'signin',
        pattern: '/signin'
    },
    {
        page: 'forgetPassword',
        pattern: '/forgetpassword'
    },
    {
        page: 'evidence',
        pattern: '/evidence'
    }
];

APP_ROUTES.forEach(route => routes.add(route));

module.exports = routes;
