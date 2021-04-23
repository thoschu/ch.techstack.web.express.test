const {tomData} = require('../models');
const {tomView} = require('../views');

function tomAction(req, res) {
    res.send(tomView(tomData));
}

module.exports = tomAction;
