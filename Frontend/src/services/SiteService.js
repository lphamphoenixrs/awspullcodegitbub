import Libs from '../utils/Libs';
export default class SiteService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new SiteService();
        }
        return this._instance;
    }
    constructor() {
    }

    /**
     * Get all site page employee manage site
     * @author Long.pham 2021-01-07
     * @param {RoleEntiry} objE 
     * @param {function (data,total_row,msg)} callBack 
     * @param {boolean} isShowProgress 
     */
    getListAllSite(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.LIST_ALL_SITE, objE, function (status, rs) {
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
            callBack(false, 0, error);
        }
    }


    /**
      * API call for 
      * @author long.pham 2021-01-06
      * @param @param {EmployeeEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    addEmployeeManageSite(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.ADD_MANAGE_SITE, objE, function (status, rs) {
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
     * API call for save data
     * @author Long.pham 2021-01-08
     * @param {CustomerEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    save(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.SAVE, objE, function (status, rs) {
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

    /**
    * @author long.pham 2021-01-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getList(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.LIST, objE, function (status, rs) {
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
      * API call for update Employee status
      * @author long.pham 2021-01-06
      * @param @param {EmployeeEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateStatus(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.UPDATE_STATUS, objE, function (status, rs) {
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
     * API call for save data
     * @author Long.pham 2021-01-06
     * @param {EmployeeEntiry} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    delete(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.DELETE, objE, function (status, rs) {
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
    * Get all site by id_customer
    * @author long.pham 2020-10-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
   getAllSiteByEmployee(objE, callBack, isShowProgress = true) {
    try {
        var http = new flHttp(isShowProgress);
        http.post(Constants.URL.SITE.ALL_BY_EMPLOYEE, objE, function (status, rs) {
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
    * Get all site by id_customer
    * @author long.pham 2020-10-08
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getAll(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.ALL, objE, function (status, rs) {
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
     * API get summary site by customer id
     * @author long.pham 2020-10-21
     * @param {function(data)} callBack
     * @param {int} id_customer 
     */
    getSummarySiteByCustomerId(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.SITE_SUMMARY, objE, function (status, rs) {
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
     * API get detail site by customer id and site id
     * @author long.pham 2020-10-22
     * @param {function(data)} callBack
     * @param {int} id_customer, id_site 
     * @return Object
     */
    getDashboardDetailSite(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.SITE_DASHBOARD_DETAIL, objE, function (status, rs) {
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
     * API get chart KPI by day
     * @author long.pham 2020-10-22
     * @param {function(data)} callBack
     * @param {int} id_customer, id_site 
     * @return Object
     */
    getChartKPIDay(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.CHART_KPI_DAY, objE, function (status, rs) {
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
     * API call for save data
     * @author long.pham 2020-10-30
     * @param {SiteEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
    // save(objE, callBack, isShowProgress = true) {
    //     try {
    //         var http = new flHttp(isShowProgress);
    //         http.post(Constants.URL.SITE.UPDATE, objE, function (status, rs) {
    //             if (typeof callBack === 'function') {
    //                 if (!status || !rs) {
    //                     return;
    //                 }
    //                 var data = null;
    //                 var msg = Libs.isBlank(rs.mess) ? trans.translate('message.msg_err_unknown') : rs.mess;
    //                 if (!Libs.isObjectEmpty(rs.data)) {
    //                     data = rs.data;
    //                 }
    //                 callBack(rs.status, data, msg);
    //             }
    //         })
    //     } catch (error) {
    //         callBack(false, null, error);
    //     }
    // }

    /**
    * @author long.pham 2020-11-09
    * @param {function (data,total_row,msg)} callBack 
    * @param id_site, id_customer, id_device, device_type
    * @param {boolean} isShowProgress 
    */
    getListReportQuickQuery(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.QUICK_QUERY, objE, function (status, rs) {
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
    * Get list specific yield year
    * @author long.pham 2020-11-06
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getSpecificYieldMonth(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.SPECIFIC_YIELD_MONTH, objE, function (status, rs) {
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
    * Get list specific yield year
    * @author long.pham 2020-11-06
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getSpecificYieldYear(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.SPECIFIC_YIELD_YEAR, objE, function (status, rs) {
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
     * API get daily report
     * @author long.pham 2020-11-11
     * @param {function(data)} callBack
     * @param {int} id_customer, id_site 
     * @return Object
     */
    getDailyReportSum(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.DAILY_REPORT, objE, function (status, rs) {
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
    * Get list daily report chart
    * @author long.pham 2020-11-11
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getDailyReportChart(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.DAILY_REPORT_CHART, objE, function (status, rs) {
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
    * Get list visualization device by month
    * @author long.pham 2020-11-11
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getReportVisualizationDevice(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.REPORT_VISUALIZATION_DEVICE, objE, function (status, rs) {
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
    * Get list visualization device by day
    * @author long.pham 2020-11-11
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getReportVisualizationDeviceDay(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.REPORT_VISUALIZATION_DEVICE_DAY, objE, function (status, rs) {
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
   * Get list annual comparison
   * @author long.pham 2020-11-13
   * @param {function (data,total_row,msg)} callBack 
   * @param {boolean} isShowProgress 
   */
    getAnnualComparison(objE, callBack, isShowProgress = false) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SITE.ANNUAL_COMPARISON, objE, function (status, rs) {
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
