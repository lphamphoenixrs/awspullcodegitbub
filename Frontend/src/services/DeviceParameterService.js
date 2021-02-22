export default class DeviceParameterService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new DeviceParameterService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get list parameter by device
    * @author long.pham 2020-11-06
    * @param {function (data,total_row,msg)} callBack 
    * @param {array} id_device
    * @param {boolean} isShowProgress 
    */
    getListParameterByDevice(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEVICE_PARAMETER.LIST_BY_DEVICE, objE, function (status, rs) {
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
