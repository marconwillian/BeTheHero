const knex = require('knex');
const configuration = require('../config/knexfile');

const config = configuration[process.env.NODE_ENV || 'development'];

const connection = knex(config);

module.exports = connection;