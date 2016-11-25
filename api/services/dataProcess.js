 var CryptoJS = require('crypto-js');
 module.exports = {

	encryptPassword: function(password) {
		return CryptoJS.SHA256(password + "j29sn0^/;d9").toString(CryptoJS.enc.Base64);
	}
	
};