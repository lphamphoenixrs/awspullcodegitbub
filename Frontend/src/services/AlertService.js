import Libs from '../utils/Libs';
export default class AlertService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new AlertService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * call API get list alert by site
     * @author Long.Pham 2020-11-16
     * @param  {JsonEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ALERT.LIST, objE, function (status, rs) {
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
     * call API get list site by id_sites
     * @author Long.Pham 2021-02-03
     * @param  {JsonEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getListIdSites(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ALERT.LIST_ID_SITES, objE, function (status, rs) {
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
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_customer, id_site, id_alert, current_time
     */
    getDetailAlert(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.ALERT.DETAIL, objE, function (status, rs) {
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
