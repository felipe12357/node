const { getAge } = require('./getAge.plugin');
const { getId } = require('./getId.plugin');
const { httpClient } = require('./http-client.plugin');
const { buildlogger } = require('./logger.plugin');

module.exports = {
    getId,
    getAge,
    httpClient,
    buildlogger,
}