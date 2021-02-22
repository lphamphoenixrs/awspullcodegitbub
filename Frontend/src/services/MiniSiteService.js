import Libs from '../utils/Libs';
export default class MiniSiteService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new MiniSiteService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * API get mini site information
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_customer, id
     */
    getMiniSiteInfo(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.MINI_SITE.INFO, objE, function (status, rs) {
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
    getChartInverterPerformance(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.MINI_SITE.CHART_INVERTER_PERFORMANCE, objE, function (status, rs) {
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
