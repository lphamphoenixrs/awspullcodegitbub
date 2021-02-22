export default class EmployeeService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new EmployeeService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * Get Employee list
     * @author Long.pham 2021-01-06
     * @param {RoleEntiry} objE 
     * @param {function (data,total_row,msg)} callBack 
     * @param {boolean} isShowProgress 
     */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.EMPLOYEE.LIST, objE, function (status, rs) {
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
     * @author Long.pham 2021-01-06
     * @param {EmployeeEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    save(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.EMPLOYEE.SAVE, objE, function (status, rs) {
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
     * @author Long.pham 2021-01-06
     * @param {EmployeeEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    delete(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.EMPLOYEE.DELETE, objE, function (status, rs) {
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
      * API call for update Employee status
      * @author long.pham 2021-01-06
      * @param @param {EmployeeEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    updateStatus(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.EMPLOYEE.UPDATE_STATUS, objE, function (status, rs) {
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
}
