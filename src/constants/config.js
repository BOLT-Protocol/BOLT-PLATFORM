const env = process.env.NODE_ENV;

const prefix = 'http://';
const keystone = '54.197.7.252:5999';

export const serverUrl = env === 'development' ? 'http://127.0.0.1:3000' : 'https://DOMAIN';

export const keystoneUrl = prefix + keystone;
