import Libs from '../utils/Libs';

export default class PermissionsService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new PermissionsService();
        }
        return this._instance;
    }
    constructor() {
    }
    /**
     * @description get level 1
     * @author long.pham 2020-12-31
     * @param  {PermissionsEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getListScreenPermissions(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SYSTEM_PERMISSIONS.LIST_BY_STAFF_ID, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
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
     * @description get level 2
     * @author long.pham 2020-12-31
     * @param  {PermissionsEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getListSystemPermissionsLevel2ByStaffId(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SYSTEM_PERMISSIONS.LIST_BY_STAFF_ID, objE, function (status, rs) {
                // Set data mockup 
                var status = true;
                rs = {
                    status: true,
                    mess: "true",
                    data: [
                        {
                            id: 10,
                            screen_name: "Hồ sơ nhân viên",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 11,
                            screen_name: "Hợp đồng lao động",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 12,
                            screen_name: "Bảo hiểm",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 13,
                            screen_name: "Số ngày nghỉ phép",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 14,
                            screen_name: "Phân quyền",
                            full: 0,
                            add: 1,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        
                    ],
                    total_row: 5
                }

                // end data mockup

                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
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
            console.log('SystemPermissionsService.getListSalaryBySystemPermissions:', error);
            var msg = error;
            callBack(false, 0, msg);
        }
    }


    /**
     * @description get level 3
     * @author long.pham 2018-07-27
     * @param  {SystemPermissionsEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getListSystemPermissionsLevel3ByStaffId(objE, callBack, isShowProgress = true) {
        try {
            var http = new flHttp(isShowProgress);
            http.post(Constants.URL.SYSTEM_PERMISSIONS.LIST_BY_STAFF_ID, objE, function (status, rs) {
                // Set data mockup 
                var status = true;
                rs = {
                    status: true,
                    mess: "true",
                    data: [
                        {
                            id: 20,
                            screen_name: "Thông tin cơ bản",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 21,
                            screen_name: "Chấm công",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 22,
                            screen_name: "Thời gian làm việc",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            id: 23,
                            screen_name: "Trình độ chuyên môn",
                            full: 0,
                            add: 0,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        {
                            screen_name: "Chứng chỉ chuyên ngành",
                            full: 0,
                            add: 1,
                            edit: 0,
                            delete: 0,
                            view: 0,
                            print: 0,
                            export_pdf: 0,
                            export_excel: 0,
                            import: 0,
                            translate: 0,
                            collapse: 0
                        },
                        
                    ],
                    total_row: 5
                }

                // end data mockup

                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
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
            console.log('SystemPermissionsService.getListSalaryBySystemPermissions:', error);
            var msg = error;
            callBack(false, 0, msg);
        }
    }

}
