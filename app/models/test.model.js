const R = require('ramda');
const nano = require('nano');

const testData = [
    {
        name: "Thomas",
        surname: "Schulte"
    }, {
        name: "Tom",
        surname: "S."
    }
];

module.exports = {
    getAll() {
        return R.clone(testData);
    },
    getNameByValue(value) {
        return R.find(R.propEq('name', value))(R.clone(testData));
    },
    getSurnameByValue(value) {
        return R.find(R.propEq('surname', value))(R.clone(testData));
    },
    delete(value) {

    }
};
