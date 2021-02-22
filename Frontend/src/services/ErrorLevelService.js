export default class ErrorLevelService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ErrorLevelService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get list error level to dropdown
    * @author long.pham 2021-01-28
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getList(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ERROR_LEVEL.LIST, objE, function (status, rs) {
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
