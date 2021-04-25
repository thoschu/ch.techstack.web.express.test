const R = require('ramda');
const model = require('../models');

function deleteAction(req, res) {
    const id = req.params.id;
    let intId;
    if(R.isNil(id)) {
        intId = 0;
    } else {
        intId = Number.parseInt(req.params.id, 10);
    }

    const result = `Result: ${intId}`;
    console.log(model.testData);

    res.status(202).redirect(req.baseUrl);
}

module.exports = deleteAction
