const {tomData} = require('../models');
const {tomView} = require('../views');

function tomAction(req, res) {
    // console.log(req.requestTime);
    res.send(tomView(tomData));
}

module.exports = tomAction;
