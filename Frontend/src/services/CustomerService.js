export default class CustomerService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new CustomerService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * Get customer list
     * @author Long.pham 2020-12-30
     * @param {RoleEntiry} objE 
     * @param {function (data,total_row,msg)} callBack 
     * @param {boolean} isShowProgress 
     */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.CUSTOMER.LIST, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = [];
                    var total_row = 0;
                    if (rs.status && Array.isArray(rs.data)) {
                        data = rs.data;
                        total_row = rs.total_row;
                    }
                    callBack(data, total_row, "");
                }
            });
        } catch (error) {
            callBack(false, 0, error);
        }
    }

    /**
     * API call for save data
     * @author Long.pham 2021-01-05
     * @param {CustomerEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    save(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.CUSTOMER.SAVE, objE, function (status, rs) {
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
     * API call for save data
     * @author Long.pham 2021-01-05
     * @param {CustomerEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    delete(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.CUSTOMER.DELETE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = null;
                    var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }

                    callBack(rs.status, data, msg);
                }
            });
        } catch (error) {
            callBack(false, 0, error);
        }
    }

    /**
      * API call for update customer status
      * @author long.pham 2021-01-05
      * @param @param {CustomerEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    updateStatus(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.CUSTOMER.UPDATE_STATUS, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }

    /**
    * Get list customer to dropdown
    * @author long.pham 2021-01-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
   getAll(objE, callBack, isShowProgress = false) {
    try {
        var http = new flHttp(isShowProgress);
        http.post(Constants.URL.CUSTOMER.ALL, objE, function (status, rs) {
            if (typeof callBack === 'function') {
                if (!status || !rs) {
                    return;
                }
                var data = [];
                var total_row = 0;
                if (rs.status && Array.isArray(rs.data)) {
                    data = rs.data;
                    total_row = rs.total_row;
                }
                callBack(data, total_row, "");
            }
        });
    } catch (error) {
        var msg = error;
        callBack(false, 0, msg);
    }
}
}
