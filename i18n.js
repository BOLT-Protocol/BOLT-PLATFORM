// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const NextI18Next = require('next-i18next/dist/commonjs');
// const config = require('next/config').default();
const defaultLanguage = 'tw';
const otherLanguages = ['en'];

module.exports = new NextI18Next({
    defaultLanguage,
    otherLanguages
});
