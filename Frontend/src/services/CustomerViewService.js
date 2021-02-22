import Libs from '../utils/Libs';
export default class CustomerViewService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new CustomerViewService();
        }
        return this._instance;
    }
    constructor() {
    }

     /**
    * Get all site by id_customer
    * @author long.pham 2020-10-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
   getListSiteByCustomer(objE, callBack, isShowProgress = true) {
    try {
        var http = new flHttp(isShowProgress);
        http.post(Constants.URL.CUSTOMER_VIEW.LIST_SITE, objE, function (status, rs) {
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
     * API get mini site information
     * @author long.pham 2020-12-02
     * @param {function(data)} callBack
     * @param {int} id_customer, id_site
     */
    getCustomerViewInfo(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.CUSTOMER_VIEW.INFO, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (error) {
            callBack({});
        }
    }


    /**
     * API get chart mini site inverter performance
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_site 
     * @return Object
     */
    getDataChart(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.CUSTOMER_VIEW.CHART_DATA, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (error) {
            callBack({});
        }
    }

}
