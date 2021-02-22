const roundTo = require('round-to');
const moment = require("moment");
var formatNum = require('format-number');
import { toast } from 'react-toastify';
var Libs = {};

/**
 * @description trim string
 * @author Long.Pham 2020-10-26
 * @param str
 * @returns
 */
Libs.safeTrim = (str) => {
	try {
		return (typeof str === 'string') ? str.trim() : str.toString();
	} catch (e) {
		return "";
	}
};

/**
 * @description check event enter
 * @author Long.Pham 2020-10-26
 * @param event
 * @param str
 */

Libs.rEnter = (event) => {
	var _this = $(event.target);
	if (event.which === 13) {
		var sign = event.shiftKey ? -1 : 1;
		event.preventDefault();
		var fields = _this.parents('form:eq(0),body').find('input,textarea');
		var index = fields.index(_this);
		if (index > -1 && (index + 1 * sign) < fields.length)
			fields.eq(index + 1 * sign).focus();
	}
}

/**
 * @description check blank object or string
 * @author Long.Pham 2020-10-26
 * @param str
 * @returns {Boolean}
 */
Libs.isBlank = (str) => {
	if (typeof str === undefined || str == null || Libs.safeTrim(str) === "") {
		return true;
	}

	return false;
};

/**
 * check input on/off 111111111 : nByte _________ 000000100 : bitIndex:2
 * =>pow(2,2){base 10}= 000000100{base 2} =========== 000000100=>input 3 la
 * on.
 *
 * @param nByte
 * @param bitIndex
 * @return boolean
 */
Libs.checkBitOnOff = (nByte, bitIndex) => {
	let result = nByte & parseInt(Math.pow(2, bitIndex));
	return result != 0 ? true : false;
}

/**
 * @description return json result
 * @author Long.Pham 2020-10-26
 * @param unknown $status
 * @param unknown $mess
 * @param unknown $data
 * @returns obj
 */
Libs.returnJsonResult = (status, mess, data, total_row) => {
	var result = {};
	result.status = status;
	result.mess = mess ? mess : "";
	result.data = data ? data : "";
	result.total_row = total_row ? total_row : 0;
	return result;
}


/**
 * @description validate obj null
 * @author Long.Pham 2020-10-26
 * @return boolean
 */

Libs.isObjectEmpty = (obj) => {
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	if (obj == null) return true;
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;
	if (typeof obj !== "object") return true;
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}

/**
 * @description get current date
 * @author Long.Pham 2020-10-26
 * @return string date
 */
Libs.getCurrentMMDDYYYYHI = function () {
	let date = new Date();
	let year = date.getFullYear().toString();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	let hour = date.getHours().toString().padStart(2, "0");
	let mi = date.getMinutes().toString().padStart(2, "0");
	return month + "/" + day + "/" + year + " " + hour + ":" + mi;
}


/**
 * @description encrypt text to md5
 * @author Long.Pham 2020-10-26
 * @param plaintext 
 * @return string
 */

Libs.md5 = function (plainText) {
	if (typeof plainText === 'undefined') {
		return plainText;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.md5(plainText);
}

/**
 * @description encrypt text to sha256
 * @author Long.Pham 2020-10-26
 * @param plaintext 
 * @return string
 */

Libs.sha256 = function (plainText) {
	if (typeof plainText === 'undefined') {
		return plainText;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.sha256(plainText);
}


/**
 * @description encrypt text to base64
 * @author Long.Pham 2020-10-26
 * @param plaintext 
 * @return string
 */
Libs.base64Encrypt = function (plaintext) {
	if (Libs.isBlank(plaintext)) {
		return plaintext;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.base64Encrypt(plaintext);
}

/**
 * @description decrypt to plain text from base64
 * @author Long.Pham 2020-10-26
 * @param {*} ciph 
 * @return string
 */
Libs.base64Decrypt = function (ciph) {
	if (Libs.isBlank(ciph)) {
		return ciph;
	}
	var CryptoLib = require('./Crypto.js');
	return CryptoLib.base64Decrypt(ciph);
}


/**
 * @description find obj by value and field
 * @author Long.Pham 2020-10-26
 * @param items
 * @param field
 * @param obj
 */

Libs.find = function (items, field, value) {
	if (!items)
		return null;
	for (var i = 0; i < items.length; i++) {
		if (value == items[i][field]) {
			return items[i];
		}
	}
	return null;
};

/**
 * @description Rounds numbers after commas
 * @author Long.Pham 2020-10-26
 * @param  {string | float | int} value
 * @param  {int} fixed=1 : Rounds to n numbers based on fixed
 */
Libs.fixNumber = function (value, fixed = 1) {
	if (typeof value === 'undefined' || value == null) return null;
	return parseFloat(Number.parseFloat(value).toFixed(fixed));
}

/**
* @description Check type file upload
* @author Long.Pham 2020-10-26
* @param  String file_name
* @param  {int} ext_type: undefined: all, 1: only image, 2: only file, 3: video
* @returns boolean
*/
Libs.checkExtensionFile = function (file_name, ext_type) {
	if (file_name === 'undefined' || file_name == null) return;
	var extImg = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'];
	var extFile = ['xlsx', 'xls', 'XLSX', 'XLS', 'doc', 'DOC', 'docs', 'DOCS', 'pdf', 'PDF'];
	var extAll = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF', 'doc', 'DOC', 'docs', 'DOCS', 'docx', 'DOCX', 'pdf', 'PDF', 'mp4', 'MP4', 'avi', 'AVI'];
	var extVideo = ['mp4', 'MP4', 'avi', 'AVI'];
	var ext = file_name.substr((file_name.lastIndexOf('.') + 1));
	if (ext_type === 'undefined' || ext_type == null) {
		for (var i = 0; i < extAll.length; i++) {
			if (ext === extAll[i]) {
				return true;
			}
		}
	}
	else if (ext_type == 1) {
		for (var i = 0; i < extImg.length; i++) {
			if (ext === extImg[i]) {
				return true;
			}
		}
	}
	else if (ext_type == 2) {
		for (var i = 0; i < extFile.length; i++) {
			if (ext === extFile[i]) {
				return true;
			}
		}
	}
	else if (ext_type == 3) {
		for (var i = 0; i < extVideo.length; i++) {
			if (ext === extVideo[i]) {
				return true;
			}
		}
	}
	return false;
}

/**
 * get day in month
 * @author Long.Pham 2020-10-26
 * @param {int} year, month
 * @returns {int} day
 */
Libs.getDaysOfMonth = (year, month) => {
	var d = new Date(year, month, 0);
	return d.getDate();
}

/**
 * @description Convert string date to format YYYY-MM-DD, Maybe save to DB SQL
 * @author Long.Pham 2020-10-26
 * @param {String} date 
 * @param {String} format 
 * @param {String} _delimiter
 * @return {String} date 
 */
Libs.convertStr2DateV01 = (date, format, _delimiter) => {
	if (null == date || typeof date === 'undefined' || date == '') {
		return null;
	}
	var formatLowerCase = format.toLowerCase();
	var formatItems = formatLowerCase.split(_delimiter);
	var dateItems = date.split(_delimiter);
	var monthIndex = formatItems.indexOf("mm");
	var dayIndex = formatItems.indexOf("dd");
	var yearIndex = formatItems.indexOf("yyyy");
	var month = dateItems[monthIndex];
	return dateItems[yearIndex] + '-' + (month) + '-' + dateItems[dayIndex];
}


/**
 * @description Generate random string
 * @author Long.Pham 2020-10-26
 * @param {string} charSet
 * @param {int} len
 * @return str
 */

Libs.generateStrRandomLength = function (len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?';
	var randomString = '';
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
}

/**
 * @description check is array data
 * @author Long.Pham 2020-10-26
 * @param Array arr
 * @return boolean
 */
Libs.isArrayData = function (arr) {
	if (Libs.isBlank(arr)) return false;
	if (!Array.isArray(arr) || arr.length <= 0) return false;
	return true;
}


/**
 * @description show notification message
 * @author Long.Pham 2020-10-26
 * @param {String} message 
 * @param {String} type, "error": background red, "success": background green
 * @param {String} position
 * @returns {*}
 */

Libs.toast = function (message, type, pos = "top-right") {
	let posistion = "top-right";
	if (typeof pos != 'undefined') {
		posistion = pos;
	}
	switch (type) {
		case "info":
			toast.info(message, {
				position: posistion,
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
		case "error":
			toast.error(message, {
				position: posistion,
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
		case "warn":
			toast.warn(message, {
				position: posistion,
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 10
			});
			break;
	}

}


/**
 * @description Convert Data to DB
 * @author Long.Pham 2020-10-26
 * @param {String} _date 
 * @param {String} format 
 * @param {String} from_format
 */
Libs.convertAllFormatDate = (_date, from_format = "MM/DD/YYYY HH:mm:ss", to_format = "YYYY-MM-DD HH:mm:ss") => {
	if (null == _date || typeof _date === 'undefined' || _date == '') {
		return '';
	}
	let date = moment(_date, from_format);
	if (!date._isValid) {
		return _date;
	}
	return date.format(to_format);
}


/**
  * @description format date to another format
  * @author Long.Pham 2020-10-26
  * @param {String} _date 
  * @param {String} format 
  * @param {String} from_format 
  */
Libs.dateFormat = (_date, format = "DD/MM/YYYY HH:mm:ss", from_format) => {
	if (null == _date || typeof _date === 'undefined' || _date == '') {
		return '';
	}
	let date = _date;
	if (typeof from_format == "undefined" || Libs.isBlank(from_format)) {
		let arrFormat = ["MM/DD/YYYY", "YYYY/MM/DD", "YYYY/MM/DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss", "DD-MM-YYYY HH:mm:ss", "MM/DD/YYYY HH:mm:ss", "MM-DD-YYYY HH:mm:ss"]
		for (let i = 0; i < arrFormat.length; i++) {
			date = moment(_date, arrFormat[i]);
			if (date._isValid) {
				return date.format(format);
			}
		}
	} else {
		if (from_format.toLowerCase() == 'utc') {
			date = moment(_date);
		} else date = moment(_date, from_format);
		if (!date._isValid) {
			return _date;
		}
		return date.format(format);
	}
	return _date;
}

/**
 * @description Convert string to day
 * @author Long.Pham 2020-10-26
 * @param _date 
 * @param format 
 * @returns date
 */

Libs.convertStrtoDate = (_date, format) => {
	if (null == _date || typeof _date === 'undefined' || _date == '') {
		return '';
	}
	let date = _date;
	if (typeof format == "undefined" || Libs.isBlank(format)) {
		let arrFormat = ["YYYY/MM/DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss", "MM/DD/YYYY HH:mm:ss", "DD-MM-YYYY HH:mm:ss", "MM/DD/YYYY HH:mm:ss", "MM-DD-YYYY HH:mm:ss"]
		for (let i = 0; i < arrFormat.length; i++) {
			date = moment(_date, arrFormat[i]);
			if (date._isValid) {
				return date._d;
			}
		}
	} else {
		if (format.toLowerCase() == 'utc') {
			date = moment(_date);
		} else date = moment(_date, format);
		if (!date._isValid) {
			return _date;
		}
		return date._d;
	}
	return _date;
}

/**
 * @description Round number
 * (0.55 -> 0.6, 0.54 -> 0.5)
 * @author Long.Pham 2020-10-26
 * @param number 
 * @param decimals
 * @returns Round number
 */
Libs.round = function (number, decimals) {
	if (decimals == null)
		decimals = 0;
	return Number((Math.round(number + "e" + decimals) + "e-" + decimals));
};

/**
 * Get current date
 * @author Long.Pham 2020-10-26
 * @param Date format 
 * @returns date
 */

Libs.getCurrentDate = function (format) {
	format = (!format || typeof format !== 'string') ? 'MM/DD/YYYY' : format;
	return moment().format(format);
}

/**
 * Add Days
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param days
 * @returns date
 */
Libs.addDays = function (date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * Add Months
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param months
 * @returns date
 */
Libs.addMonths = function (date, months) {
	var result = new Date(date);
	result.setMonth(result.getMonth() + months);
	return result;
}

/**
 * Add Years
 * @author Long.Pham 2020-10-26
 * @param date 
 * @param years
 * @returns date
 */
Libs.addYears = function (date, years) {
	var result = new Date(date);
	result.setFullYear(result.getFullYear() + years);
	return result;
}

/**
 * Compare date
 * @author Long.Pham 2020-10-26
 * @param from_date 
 * @param format
 * @param to_date 
 * @returns -1: less than, 0: equal, 1: greater
 */
Libs.compareDate = function (from_date, format, to_date = null) {
	from_date = moment(from_date, format.toUpperCase());
	if (to_date == null) {
		to_date = moment(new Date()).startOf('day');
	} else {
		to_date = moment(to_date, format);
	}
	if (from_date.isAfter(to_date)) {
		return 1;
	}
	if (from_date.isBefore(to_date)) {
		return -1;
	}
	return 0;
}
/**
 * validate date
 * @author Long.Pham 2019-02-19
 * @param from_date  
 * @param format 
 * @returns bool
 */
Libs.isValidDate = function (from_date, format) {
	from_date = moment(from_date, format.toUpperCase());
	return from_date.isValid();

}

/**
* @description Round number
* @author Long.Pham 2020-10-26
* @param number 
* @param decimal 
* @type: -1 down, 0 default, 1: up
 */
Libs.roundNumber = function (number, decimals = 0, type = 0) {
	if (decimals == null)
		decimals = 0;
	type = type * 1;
	switch (type) {
		case -1:
			return roundTo.down(number, decimals);
		case 1:
			return roundTo.up(number, decimals);
		default:
			return roundTo(number, decimals);
	}
};

/**
 * Format kWh electrical power unit 
 * @author Long.Pham 2020-10-26
 * @param {double} power: power
 * @return {string}: format power
 */

Libs.formatElectricalPowerUnit = function (power, prefix = '') {
	if (Libs.isBlank(power) || power <= 0) return "0 kW";

	if (power >= 1000000) {
		return Number.parseFloat(power / 1000000).toFixed(3) + " GW"+ prefix;
	} else if (power >= 1000 && power < 1000000) {
		return Number.parseFloat(power / 1000).toFixed(3) + " MW"+ prefix;
	} else {
		return Number.parseFloat(power).toFixed(2) + " kW"+ prefix;
	}

}


/**
 * Get offset time_zone
 * @author Long.Pham 2020-10-24
 * @param time
 * @returns {String} offset time zone
 */

Libs.getOffsetTimeZone = function (time) {
	if (Libs.isBlank(time)) return '+00:00';

	var offset = (new Date(time)).getTimezoneOffset();
	var offsetTimeZone = {
		'-12': '-12:00',
		'-11': '-11:00',
		'-10': '-10:00',
		'-9': '-09:00',
		'-8': '-08:00',
		'-7': '-07:00',
		'-6': '-06:00',
		'-5': '-05:00',
		'-4': '-04:00',
		'-3.5': '-03:30',
		'-3': '-03:00',
		'-2': '-02:00',
		'-1': '-01:00',
		'0': '+00:00',
		'1': '+01:00',
		'2': '+02:00',
		'3': '+03:00',
		'3.5': '+03:30',
		'4': '+04:00',
		'4.5': '+04:30',
		'5': '+05:00',
		'5.5': '+05:30',
		'6': '+06:00',
		'7': '+07:00',
		'8': '+08:00',
		'9': '+09:00',
		'9.5': '+09:30',
		'10': '+10:00',
		'11': '+11:00',
		'12': '+12:00'
	};

	return offsetTimeZone[-offset / 60];
}

/**
 * Generate list hour
 * @author Long.Pham 2020-10-24
 * @param _date
 * @param _format
 * @param _delimiter
 * @returns {Array} 
 */

Libs.generateListHour = function (_date, _format, _delimiter) {
	if (null == _date || typeof _date === 'undefined' || _date == '') {
		return [];
	}

	let date = new Date();
	let year = date.getFullYear().toString();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	let hour = date.getHours().toString().padStart(2, "0");
	var now = month + "/" + day + "/" + year;
	var dataList = [];
	if (now == Libs.dateFormat(_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
		for (var i = 0; i <= hour; i++) {
			if (i < 12) {
				var item = { id: i, text: (i == 0) ? "12:00 AM" : i + ":00 AM" };
				dataList.push(item);
			} else {
				var itemP = { id: i, text: i + ":00 PM" };
				dataList.push(itemP);
			}
		}
	} else {
		for (var j = 0; j < 24; j++) {
			if (j < 12) {
				var itemF = { id: j, text: (j == 0) ? "12:00 AM" : j + ":00 AM" };
				dataList.push(itemF);
			} else {
				var itemK = { id: j, text: j + ":00 PM" };
				dataList.push(itemK);
			}
		}
	}
	return dataList;
}


/**
* Format number according to the format option in formatNum format of the library
* By default #, ###. ## separated by commas, spread after decimal 2 digits
*
* @param {String} val
* @param {String} pattern default #,###.##
* @param {int} round default 0: Default rounding -1: rounding down, 1: rounding up
* @author:  MinhPham 2018-11-18 11:16:34 
*/
Libs.formatNum = function (val, pattern = "#,###.##", round = 0) {
	if(Libs.isBlank(val) || isNaN(val)){
		return "";
	}
	val = val * 1;
	let comma = ','
	let decimal = '.'
	let afterDecimalNum = 0;//After the decimal point take some numbers
	if (Libs.isBlank(pattern)) {
		pattern = "#,###.##";
	}
	const regex = new RegExp("[,.]+", "ig");
	let myArray;
	let index = 0;
	let afterDecimal = "";
	while ((myArray = regex.exec(pattern)) !== null) {
		//The first time is the comma
		if (index == 0) {
			comma = myArray[0];
		} else if (comma != myArray[0]) {
			//The last time is the decimal separator
			afterDecimal = myArray[0];
		}
		index++;
	}
	if (afterDecimal != "") {
		decimal = afterDecimal;
		afterDecimalNum = pattern.length - (pattern.lastIndexOf(decimal) + 1)
	}

	var opts = {
		"negativeType": 'left',
		"prefix": '',
		"suffix": '',
		"integerSeparator": comma,
		"decimalsSeparator": '',
		"decimal": decimal,
		"padLeft": -1,
		"round": afterDecimalNum
	};
    if (round == 1) {
		val =  Number(Math.ceil(val+'e'+afterDecimalNum)+'e-'+afterDecimalNum);	
	} else if (round == 0) {
		val =  Number(Math.round(val+'e'+afterDecimalNum)+'e-'+afterDecimalNum);	
	}else{
		val =  Number(Math.floor(val+'e'+afterDecimalNum)+'e-'+afterDecimalNum);	
	} 
	return formatNum(opts)(val);
}

/**
 * string format
 * vd: let a = Libs.stringAssign("hello $<0> $<1>", ["world","rrr"])
 * @param {string template} str 
 * @param {Array} data 
 * @param {regex} REG_ASSIGN_VARIBLE 
 */
Libs.stringAssign = function (str, data, REG_ASSIGN_VARIBLE) {
	if (Libs.isBlank(REG_ASSIGN_VARIBLE)) {
		REG_ASSIGN_VARIBLE = /\$\<([^{}]*?)\>/g;
	}
	return str.replace(REG_ASSIGN_VARIBLE, function ($0, $1) {
		return String(data[$1]);
	});
};

/**
 * @description Generate random string capital letters, lower case letters, numbers, special characters
 * @author: Long.Pham 2021-01-05
 * @return str
 */

Libs.generateStrRandomV1 = function (lenUpper, lenLower, lenSpec, lenNumber) {
	var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var lowercase = 'abcdefghijklmnopqrstuvwxyz';
	var specialChar = '!@#$%^&*(){}<>?';
	var charNumber = '0123456789';
    var randomString = '';
    for (var i = 0; i < lenUpper; i++) {
		var randomUppercase = Math.floor(Math.random() * uppercase.length);
		randomString += uppercase.substring(randomUppercase,randomUppercase+1);
	}
	for (var i = 0; i < lenLower; i++) {
		var randomLowercase = Math.floor(Math.random() * lowercase.length);
		randomString += lowercase.substring(randomLowercase,randomLowercase+1);
	}
	for (var i = 0; i < lenSpec; i++) {
		var randomSpecialChar = Math.floor(Math.random() * specialChar.length);
		randomString += specialChar.substring(randomSpecialChar,randomSpecialChar+1);
	}
	for (var i = 0; i < lenNumber; i++) {
		var randomCharNumber = Math.floor(Math.random() * charNumber.length);
		randomString += charNumber.substring(randomCharNumber,randomCharNumber+1);
	}
	var str = randomString.split("");
	return str.sort(function(){return 0.5 - Math.random()}).join("");
}
export default Libs;
