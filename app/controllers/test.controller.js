const model = require('../models');

function testAction(req, res) {
    console.log(req.method);
    console.log(req.get('cache-control'));
    res.cookie('foo', 'bar');
    res.status('200');
    console.dir(model.testData.getNameByValue('Thomas'));
    res.send(model.testData.getAll());
}

module.exports = testAction
