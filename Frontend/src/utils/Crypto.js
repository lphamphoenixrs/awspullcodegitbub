var crypto = require('crypto');
var CryptoJS = require('crypto-js');
var CryptoLib = function () { };
module.exports = CryptoLib;

// -----------------------------
// class methods
CryptoLib.generateSalt = function (nChar) {
    return crypto.randomBytes(nChar).toString('hex');
};

/**
 * Encrypt plain string to md5 string
 * @param {*} str 
 * @return string
 */
CryptoLib.sha256 = function sha256(str) {
    var sha256 = crypto.createHash("sha256");
    sha256.update(str);
    var str = sha256.digest('hex');
    return str;
}


/**
 * encrypt text to base64
 * @param plaintext 
 * @return string
 */
CryptoLib.base64Encrypt = function (plaintext) {
    var base64Txt = Buffer.from(plaintext).toString('base64');
    return base64Txt;
}
/**
 * decrypt to plain text from base64
 * @param {*} ciph 
 * @return string
 */
CryptoLib.base64Decrypt = function (ciph) {
    var txt = Buffer.from(ciph, 'base64').toString('utf-8');
    return txt;
}
/**
 * Encrypt plain string to md5 string
 * @param {*} str 
 * @return string
 */
CryptoLib.md5 = function md5(str) {
    var md5 = crypto.createHash("md5");
    md5.update(str);
    var str = md5.digest('hex');
    return str.toUpperCase();  //32 ký tự viết hoa  
}

/**
 * AES Encrypt plain string to AES string
 * @param {*} str 
 * @return string
 */
CryptoLib.AESEncrypt = function AESEncrypt(str, salt) {

    var string = CryptoJS.AES.encrypt(str, salt, { iv: Buffer.alloc(16,0), asBytes: true, });
    //  console.log(string.toString(CryptoJS.enc.Hex) ,string.ciphertext.toString(), string.iv.toString(), string.key.toString()); return;
    return string.toString();
}

/**
 * AES Decrypt plain string to AES string
 * @param {*} str 
 * @return string
 */
CryptoLib.AESDecrypt = function AESDecrypt(str, secretKey) {
    var bytes = CryptoJS.AES.decrypt(str.toString('hex'), secretKey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}
