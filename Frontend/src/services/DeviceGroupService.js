export default class DeviceGroupService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new DeviceGroupService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get list group device to dropdown
    * @author long.pham 2021-01-11
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getListDropdown(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE_GROUP.LIST_DROPDOWN, objE, function (status, rs) {
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
