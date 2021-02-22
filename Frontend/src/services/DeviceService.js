export default class DeviceService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new DeviceService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get list device by device type
    * @author long.pham 2020-11-06
    * @param id_site, id_customer, id_type_device
    * @data {function (data,total_row,msg)} callBack 
    */
    getListByDeviceType(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE.LIST_BY_DEVICE_TYPE, objE, function (status, rs) {
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


    /**
    * Get list device by device group
    * @author long.pham 2020-11-12
    * @param id_site, id_customer, id_device_group = 3
    * @data {function (data,total_row,msg)} callBack 
    */
    getListDeviceByGroupId(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE.LIST_DEVICE_BY_GROUP_ID, objE, function (status, rs) {
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


    /**
    * @author long.pham 2021-01-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getListDeviceBySite(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE.LIST_DEVICE_BY_SITE, objE, function (status, rs) {
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

    /**
      * API call for update device status
      * @author long.pham 2021-01-12
      * @param @param {DeviceEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateStatus(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE.UPDATE_STATUS, objE, function (status, rs) {
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
     * API call for delete item
     * @author Long.pham 2021-01-12
     * @param {DeviceEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    delete(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE.DELETE, objE, function (status, rs) {
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
     * API call for save data
     * @author Long.pham 2021-01-08
     * @param {CustomerEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    saveDevice(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE.SAVE, objE, function (status, rs) {
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
