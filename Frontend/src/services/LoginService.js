import Constants from "../utils/Constants";
import Libs from "../utils/Libs";

export default class LoginService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new LoginService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * API customer login
     * @author long.pham 2020-09-03
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */
    getLoginCustomer(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.USER.LOGIN, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (error) {
            callBack({});
        }
    }

    /**
     * API check user exists by hash
     * @author Long.Pham 2020-09-03
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    checkUserByHash(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.USER.CHECK_USER_BY_HASH, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    var msg = Libs.isBlank(rs.mess)?trans.translate('message.msg_err_unknown'):rs.mess;
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack({});
        }
    }

    /**
     * API call for change password
     * @author long.pham 2020-09-03
     * @param {CustomerEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    resetPassword(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.USER.RESET_PASSWORD, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, null, error);
        }
    }


    /**
     * API call for change password
     * @author long.pham 2020-09-03
     * @param {CustomerEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    ChangePassword(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.USER.CHANGE_PASSWORD, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, null, error);
        }
    }

    /**
     * API call for change password
     * @author long.pham 2021-01-25
     * @param {UserEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    AdminChangePassword(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.USER.ADMIN_CHANGE_PASSWORD, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, null, error);
        }
    }
}
