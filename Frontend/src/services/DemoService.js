export default class DemoService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new DemoService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
    * Get all Demo
    * @author long.pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.DEMO.LIST, objE, function (status, rs) {
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
            // console.log('DemoService.getAll:', error);
            var msg = error;
            callBack(false, 0, msg);
        }
    }
}
