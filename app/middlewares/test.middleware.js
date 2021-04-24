const testMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    console.log('ip:', req.url);

    console.log(Object.keys(res));
    console.log(res._header);

    next();
};

module.exports = testMiddleware;
