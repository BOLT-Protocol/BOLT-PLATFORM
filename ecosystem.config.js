module.exports = {
    /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [
        {
            name: 'app',
            script: 'npm',
            args: 'start',
            watch: true,
            ignore_watch: ['/node_moudles'],
            env: {
                NODE_ENV: 'production'
            }
        }
    ],
    deploy: {
        stage: {
            'user': 'ubuntu',
            'key': `${process.env.HOME}/Documents/ssh/BOLTCHAIN.pem`,
            'host': '35.174.53.23',
            'repo': 'git@github.com:BOLT-Protocol/BOLT-PLATFORM.git',
            'ref': 'origin/develop',
            'path': '/home/ubuntu/BOLT_PLATFORM',
            'post-deploy': 'npm i && npm run build & pm2 startOrRestart ecosystem.config.js --env dev'
        },
        production: {
            'user': 'SERVER_USER',
            'key': `${process.env.HOME}/KEY_PATH`,
            'host': 'SERVER_IP',
            'ref': 'GIT_BRANCH',
            'repo': 'git@bitbucket.org:tidenet/nextjs_tide_startkit.git',
            'path': 'PATH_ON_SERVER',
            'post-deploy': '. ~/.profile && yarn && yarn build & pm2 startOrRestart ecosystem.js --env production'
        }
    }
};
