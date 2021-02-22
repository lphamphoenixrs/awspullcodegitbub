export default class PortfolioService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new PortfolioService();
        }
        return this._instance;
    }
    constructor() {
    }

    

    /**
    * @author long.pham 2021-01-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.PORTFOLIO.LIST, objE, function (status, rs) {
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
