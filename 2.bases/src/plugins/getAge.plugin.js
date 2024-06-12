const getAgeO = require('get-age');

const getAge = function(date){
    if(!date)
        throw new Error("not valid date")

    return getAgeO(date);
}

module.exports = {
    getAge
}