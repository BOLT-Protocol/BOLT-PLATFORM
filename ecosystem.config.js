module.exports = {
    /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [
        {
            name: 'app',
            script: 'yarn',
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
            'user': 'SERVER_USER',
            'key': `${process.env.HOME}/KEY_PATH`,
            'host': 'SERVER_IP',
            'ref': 'GIT_BRANCH',
            'repo': 'git@bitbucket.org:tidenet/nextjs_tide_startkit.git',
            'path': 'PATH_ON_SERVER',
            'post-deploy': '. ~/.profile && yarn && yarn build & pm2 startOrRestart ecosystem.js --env dev'
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
