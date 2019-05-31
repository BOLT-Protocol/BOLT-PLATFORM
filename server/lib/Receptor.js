const express = require('express');
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');
const path = require('path');
const http = require('http');
const pem = require('pem');
const spdy = require('spdy');

const nextI18NextMiddleware = require('next-i18next/middleware');
const Bot = require('./Bot');
const asyncM = require('../middleware/ayncMiddleware');
const nextI18next = require('../../i18n');

class Receptor extends Bot {
    constructor() {
        super();
        this.app = express();
        this.router = express.Router();
    }

    init({ config }) {
        const middleware = [bodyParser.urlencoded({ extended: true }), bodyParser.json(), nextI18NextMiddleware(nextI18next), cookiesMiddleware()];
        return super
            .init({ config })
            .then(() => this.setMiddleware(middleware))
            .then(() => this.registerRouter())
            .then(() => this);
    }

    createPem() {
        return new Promise((resolve, reject) => {
            pem.createCertificate({ days: 365, selfSigned: true }, (err, keys) => {
                if (err) reject(err);
                resolve({
                    key: keys.serviceKey,
                    cert: keys.certificate
                });
            });
        });
    }

    listen(app) {
        const { port, httpsPort, httpsServer } = this.config.common;

        if (httpsServer) {
            return this.createPem().then(options => Promise.all([this.listenHttp({ port, app }), this.listenHttps({ port: httpsPort, options, app })]));
        } else {
            return this.listenHttp({ port, app });
        }
    }

    listenHttp({ port, app }) {
        const httpServer = http.createServer(app);

        httpServer.listen(port, () => {
            console.log('\x1b[1m\x1b[32mHTTP \x1b[0m\x1b[21m ', `> Ready on http://localhost:${port} at ${new Date()}`);
            return Promise.resolve(true);
        });
    }

    listenHttps({ port, options, app }) {
        const httpsServer = spdy.createServer(options, app);

        httpsServer.listen(port, () => {
            console.log('\x1b[1m\x1b[32mHTTPS \x1b[0m\x1b[21m ', `> Ready on https://localhost:${port} at ${new Date()}`);
            return Promise.resolve(true);
        });
    }

    registerRouter() {
        const { api } = this.config;

        return Promise.all(
            api.pathname.map(name => {
                const args = name.split('|').map(v => v.trim());

                const method = args[0].toLowerCase();
                // router path
                const pathname = args[1].split(',').map(v => v.trim());

                // operation
                // operationParams[0] Bot or other
                // operationParams[1] operation class
                // operationParams[2] operation function
                const operationParams = args[2].split('.');
                let operation;

                // if opration belong Bot
                if (/Bot/i.test(operationParams[0])) {
                    return this.getBot(operationParams[1]).then(bot => {
                        operation = input => {
                            return bot[operationParams[2]](input);
                        };
                        return this.setRouter({ method, pathname, operation });
                    });
                } else {
                    const lib = require(path.resolve(__dirname, `${operationParams[1]}.js`));
                    operation = input => {
                        return lib[operationParams[2]](input);
                    };
                    return this.setRouter({ method, pathname, operation });
                }
            })
        );
    }

    setMiddleware(arr) {
        arr.forEach(mdl => {
            this.app.use(mdl);
        });

        if (!this.config.dev) {
            this.app.use(require('compression')());
            this.app.use(require('helmet')());
        }
        return Promise.resolve(true);
    }

    setRouter({ method, pathname, operation }) {
        this.router[method](
            pathname,
            asyncM(async (...ctx) => {
                const { body, files, params, method, query, originalUrl, headers, connection } = ctx[0];
                return operation({
                    body,
                    files,
                    params,
                    method,
                    query,
                    originalUrl,
                    headers,
                    connection
                }).then(res => {
                    console.log(res);
                    ctx[1].body = res;
                    // add something on res

                    ctx[2]();
                });
            })
        );
        console.log('set API', method, pathname);
        return Promise.resolve(true);
    }

    start(handler) {
        // server.get('*', (req, res) => {
        //     return hander(req, res);
        // });
        const { app, router } = this;

        app.use('/api', router);

        // for test error
        router.get(
            '/error',
            asyncM(async () => {
                console.log('enter ayncMiddleware Error');
                throw new Error('err');
            })
        );

        // response
        router.use('/*', (...ctx) => {
            const res = ctx[1];
            res.send(res.body);
        });
        // // catch error
        router.use((err, req, res, next) => {
            console.error('Error:', err);
            res.status(500).send('Service Error');
        });

        app.use(handler);

        return this.listen(app);
    }
}

module.exports = Receptor;
