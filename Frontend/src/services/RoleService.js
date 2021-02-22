export default class RoleService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new RoleService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * Get role list
     * @author Long.pham 2020-12-30
     * @param {RoleEntiry} objE 
     * @param {function (data,total_row,msg)} callBack 
     * @param {boolean} isShowProgress 
     */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.LIST, objE, function (status, rs) {
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
     * @author Long.pham 2020-12-30
     * @param {RoleEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    save(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.SAVE, objE, function (status, rs) {
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
     * @author Long.pham 2020-12-30
     * @param {RoleEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    delete(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.DELETE, objE, function (status, rs) {
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
      * API call for update Roles status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    updateStatus(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.UPDATE_STATUS, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            console.log('RolesService.updateStatus:', error);
            callBack(false, error);
        }
    }

    /**
    * Get list screen permission
    * @author long.pham 2020-12-31
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getListScreenPermissions(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.LIST_SCREEN, objE, function (status, rs) {
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
     * API call update permission for role
     * @author long.pham 2020-12-31
     * @param {RoleEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    updateRolePermissions(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.UPDATE_PERMISSIONS, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if(!status || !rs){
                       return;
                    }
                    var msg = Libs.isBlank(rs.mess)?trans.translate('message.msg_err_unknown'):rs.mess;
                    callBack(rs.status,msg);
                }
            })
        } catch (error) {
            callBack(false,error);
        }

    }

    /**
     * Get all role
     * @author Long.pham 2021-01-06
     * @param {RoleEntiry} objE 
     * @param {function (data,total_row,msg)} callBack 
     * @param {boolean} isShowProgress 
     */
    getAllRole(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.ALL, objE, function (status, rs) {
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
      * API call for update permission for all role
      * @author long.pham
      * @param @param {} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      * 
      */
     updateAllPermission(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ROLE.UPDATE_ALL_PERMISSION, objE, function (status, rs) {
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
