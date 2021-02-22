export default class SiteTypeService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new SiteTypeService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get list site type to dropdown
    * @author long.pham 2021-01-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getAll(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE_TYPE.ALL, objE, function (status, rs) {
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
