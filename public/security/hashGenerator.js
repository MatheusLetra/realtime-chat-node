const MD5 = require('crypto-js/md5');

const generateHash = (stringKey) => {
    return MD5(stringKey).toString();
}

module.exports = { generateHash };