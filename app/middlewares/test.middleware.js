const testMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    console.log('ip:', req.url);

    req.requestTime = Date.now();

    res.append('Set-Cookie', 'foo=bar');

    next();
};

module.exports = testMiddleware;
