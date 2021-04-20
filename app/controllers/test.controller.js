const model = require('../models');

function testAction(req, res) {
    console.log(req.method);
    console.log(req.get('cache-control'));
    res.cookie('foo', 'bar');
    res.status('200');
    res.send(model);
}

module.exports = testAction
