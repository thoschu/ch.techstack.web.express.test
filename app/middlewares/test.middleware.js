const testMiddleware = (req, res, next) => {
    console.log('Servername:', req.headers.host);
    console.log('HTTP-Version:', req.httpVersion);
    console.log('HTTP-Version:', req.spdyVersion);
    console.dir(req.body);

    req.requestTime = Date.now();

    res.append('Set-Cookie', 'foo=bar');

    next();
};

module.exports = testMiddleware;
