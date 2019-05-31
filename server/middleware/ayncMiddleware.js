const asyncModduleware = fn => (...args) => {
    // args will be [req, res, next]
    // from express

    Promise.resolve(fn(...args)).catch(args[2]);
};
module.exports = asyncModduleware;
