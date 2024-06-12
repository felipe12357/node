const { getAge } = require('./getAge.plugin');
const { getId } = require('./getId.plugin');
const { httpClient } = require('./http-client.plugin');

module.exports = {
    getId,
    getAge,
    httpClient
}