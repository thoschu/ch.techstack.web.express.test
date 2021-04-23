const {valassisData} = require('../models');
const {valassisView} = require('../views');

function valassisAction(req, res) {
    res.send(valassisView(valassisData));
}

module.exports = valassisAction;
