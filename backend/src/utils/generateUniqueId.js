const crypto = require('crypto');

module.exports = function generateUniqueId(number){
    return crypto.randomBytes(number).toString('HEX');
}