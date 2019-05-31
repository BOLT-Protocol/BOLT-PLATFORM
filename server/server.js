const next = require('next');
const path = require('path');
// const { parse } = require('url');

const nextRoutes = require('../routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = nextRoutes.getRequestHandler(app);

const Utils = require('./lib/Utils');

app.prepare().then(() => {
    const configPath = path.resolve(__dirname, './config.toml');
    Utils.readFile(configPath)
        .then(file => Utils.readToml(file))
        .then(config => Utils.initialBots({ folder: path.resolve(__dirname, './lib'), config: { ...config, dev } }))
        .then(bots => Utils.starBots({ Bots: bots, nextApp: handler }))
        .then(() => {
            console.log('\x1b[33m%s\x1b[0m', 'Service start');
        });
});
