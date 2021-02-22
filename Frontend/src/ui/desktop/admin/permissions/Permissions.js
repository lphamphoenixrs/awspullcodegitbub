
import AdminBaseComponent from '../../../AdminBaseComponent';
import PermissionsJsx from './Permissions.jsx';
import './Permissions.scss';
import RoleService from '../../../../services/RoleService';
class Permissions extends AdminBaseComponent {
    constructor(props) {
        super(props);
        this.auth = this.props.auth;
        this.state = {
            curItem: {},
            dataList: [],
            dataListRole: [],
            dataListScreen: [],

            searchParam: {
                index: 1,
                offset: 0,
                limit: Constants.COMMON.PER_PAGE
            },
            total_row: 0
        }
        //pagging info
        this.pagging = {
            total: 1,
            current: 1

        };
        this.jsxTemplate = PermissionsJsx;
        this.handleInputChange = this.handleInputChange.bind(this);
        this._selectFullCheckedChange = this._selectFullCheckedChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 28/07/2019
     */
    componentDidMount() {

        // this.setState({
        //     curItem: cloneDeep(this.props.curItem)
        // });
        this.getListRole();

        // this.getListAllScreen();
    }

    _setPermissions(data) {
        data.view = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.VIEW));
        data.new = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.NEW));
        data.edit = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.EDIT));
        data.excel = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.EXCEL));
        data.pdf = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.PDF));
        data.translate = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.TRANSLATE));
        data.print = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.PRINT));
        data.delete = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.DEL));
        data.approval = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.APPROVAL));
        return data;
    }
    _setAuths(data) {
        data.auths = data.view + data.new + data.edit + data.excel + data.pdf + data.translate + data.print + data.delete + data.approval;
        return data;
    }


    /**
    * Func filter table
    * @author long.pham 28/07/2019
    * @param  {Object} e
    */

    onSort(event, sortKey) {
        this.state.searchParam.sortColumn = sortKey;
        this.state.searchParam.sortOrder = (this.state.searchParam.sortOrder == '' || this.state.searchParam.sortOrder == 'asc') ? 'desc' : 'asc';
        this.forceUpdate();
        this.getList();
    }

    /**
     * @description Select page in pagging
     * @author long.pham 27/07/2019
     * @param {int} index
     */
    onSelectPage(index) {
        let self = this;
        self.state.searchParam.index = index;
        if (index > 0) {
            self.state.searchParam.offset = (index - 1) * self.state.searchParam.limit;
        } else {
            self.state.searchParam.offset = 0;
        }
        self.getListRole();
    }

    inputChangedHandler(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name == 'current') {
            if (value != '') {
                if (!Libs.isNumber(value)) {
                    self.toast(trans.translate('message.page_is_number'), "error");
                    return;
                }
            }

            if (value > this.pagging.total) {
                value = self.pagging.total;
            }

            self.pagging.current = value;
            this.onSelectPage(value);
            self.forceUpdate();


        }
    }

    /**
     * ge list roles
     * @author Long.Pham 2019-06-03
     */
    getListRole() {
        let self = this, curItem = this.state.curItem;
        let params = self.state.searchParam;
        params.type = 'rolePermission';
        RoleService.instance.getList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                curItem = data[0];
                self.setState({
                    dataListRole: data,
                    curItem: curItem
                }, () => {
                    self.getListScreenPermissions();
                });

                var total = parseInt(total_row / self.state.searchParam.limit);
                if (total_row % self.state.searchParam.limit > 0) {
                    total = total + 1;
                }
                self.pagging.total = total;
                self.pagging.current = self.state.searchParam.index;
                self.state.total_row = total_row;
                this.forceUpdate();
            }
        })
    }


    /**
     * set curItem role 
     * @author Long.Pham 2019-06-03
     */
    onItemClick = (index) => {
        let self = this;
        let dataListRole = this.state.dataListRole;
        if (!Libs.isArrayData(dataListRole)) return;
        let item = dataListRole[index];
        if (Libs.isObjectEmpty(item)) return;
        self.setState({
            curItem: item
        }, () => {
            self.getListScreenPermissions();
        });
    }


    /**
     * get list screen
     * @author long.pham 27/07/2019
     */

    getListScreenPermissions() {
        let self = this, curItem = this.state.curItem;
        curItem.id_role = curItem.id;
        // curItem.id = 1;
        curItem.type = 'level0';
        curItem.id_screen = null;
        RoleService.instance.getListScreenPermissions(curItem, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataListScreen: data
                });
            } else {
                self.setState({
                    dataListScreen: []
                });
            }
        })
    }

    /**
    * @description level 1 click 
    * @author long.pham 27/07/2019
    */

    onClickItemLevel1 = (index, id) => {
        let dataListScreen = this.state.dataListScreen;
        if (!Libs.isArrayData(dataListScreen)) return;
        let item = Libs.find(dataListScreen, 'id', id);
        dataListScreen[index].collapse = (item.collapse == 1) ? 0 : 1;

        if (item.collapse == 1) {
            let curItem = this.state.curItem;
            curItem.type = '';
            curItem.id_screen = item.id_screen;
            // get data for level 2
            RoleService.instance.getListScreenPermissions(curItem, (data, total_row) => {
                if (Libs.isArrayData(data)) {
                    dataListScreen[index].dataLevel2 = data;
                }
                this.forceUpdate();
            });
        } else {
            dataListScreen[index].dataLevel2 = [];
        }

        this.setState({
            dataListScreen: dataListScreen
        });
    }


    /**
    * @description level 2 click 
    * @author long.pham 27/07/2019
    */

    onClickItemLevel2 = (index, id, indexRoot) => {
        let dataListScreen = this.state.dataListScreen;
        if (!Libs.isArrayData(dataListScreen)) return;

        let curItemLevel1 = dataListScreen[indexRoot];
        if (Libs.isObjectEmpty(curItemLevel1)) return;

        if (Libs.isBlank(curItemLevel1.dataLevel2) || !Libs.isArrayData(curItemLevel1.dataLevel2)) return;

        let item = Libs.find(curItemLevel1.dataLevel2, 'id', id);
        if (Libs.isObjectEmpty(item)) return;

        curItemLevel1.dataLevel2[index].collapse = (item.collapse == 1) ? 0 : 1;

        if (item.collapse == 1) {
            let curItem = this.state.curItem;
            // get data for level 2
            curItem.type = '';
            curItem.id_screen = item.id_screen;
            RoleService.instance.getListScreenPermissions(curItem, (data, total_row) => {
                if (Libs.isArrayData(data)) {
                    curItemLevel1.dataLevel2[index].dataLevel3 = data;
                }
                this.forceUpdate();
            });
        } else {
            curItemLevel1.dataLevel2[index].dataLevel3 = [];
        }

        dataListScreen[indexRoot] = curItemLevel1;

        this.setState({
            dataListScreen: dataListScreen
        });
    }

    /**
     * Khi checked toàn quyền của màn hình thì tự động checked toàn bộ quyền của màn hình đó
     * @author Long.Pham 2019-09-20
     * @param {Object} data 
     * @param {Object} e 
     */
    _selectFullCheckedChange(event, item, index) {
        let self = this;
        let checked = event.target.checked;
        let mask = 0;
        if (checked) {
            mask = 511;
        }
        item.auths = mask;
        item = this._setPermissions(item);
        let dataListScreen = this.state.dataListScreen;
        if (item.has_child == 1) {
            dataListScreen[index] = item;
            dataListScreen.map((v, k) => {
                if(item.id == v.id){
                    if (!Libs.isBlank(v.dataLevel2) && Libs.isArrayData(v.dataLevel2)) {
                        v.dataLevel2.map((val, key) => {
                            val.auths = mask;
                            val = this._setPermissions(val);
                        })
                    }
                }
                
            });
        } else {
            
            dataListScreen.map((v, k) => {
                
                if (v.id == item.parent) {
                    dataListScreen[k].auths = 511;
                }
            });

            if(!Libs.isBlank(item.parent)){
                var findParent = Libs.find(dataListScreen, 'id', item.parent);
                if(!Libs.isObjectEmpty(findParent)){
                    let maskTemp = 0;
                    findParent.dataLevel2.map((va, ky) => {
                        if(va.auths > 0){
                            maskTemp = maskTemp + 1;
                        }
                    });
                    if(maskTemp == 0){
                        dataListScreen.map((v, k) => {
                            if (v.id == findParent.id) {
                                dataListScreen[k].auths = 0;
                            }
                        });
                    }
                }
            }
        }

        self.setState({
            dataListScreen: dataListScreen
        });

        this._updateData(item);
    }


    handleInputChange(event, item, dataKey, vAuth, index) {
        let self = this;
        let checked = event.target.checked;
        let mask = 0;
        if (checked) {
            for (let k = 0; k < vAuth + 1; k++) {
                mask = 1 << k;
            }
            // add view permission if other permission has been checked
            if (!Libs.isBlank(vAuth) && vAuth !== Constants.AUTH_MODE.VIEW) {
                item[Constants.AUTH_DATA_KEY.VIEW] = 1;
            }
        } else {
            if (!Libs.isBlank(vAuth) && vAuth == Constants.AUTH_MODE.VIEW) {
                item[Constants.AUTH_DATA_KEY.NEW] = 0;
                item[Constants.AUTH_DATA_KEY.EDIT] = 0;
                item[Constants.AUTH_DATA_KEY.DEL] = 0;
                item[Constants.AUTH_DATA_KEY.PRINT] = 0;
                item[Constants.AUTH_DATA_KEY.PDF] = 0;
                item[Constants.AUTH_DATA_KEY.EXCEL] = 0;
                item[Constants.AUTH_DATA_KEY.TRANSLATE] = 0;
                item[Constants.AUTH_DATA_KEY.APPROVAL] = 0;
                item[Constants.AUTH_DATA_KEY.FULL] = 0;
            }
        }

        item[dataKey] = mask;
        let dataListScreen = this.state.dataListScreen;
        if (item.has_child == 1) {
            dataListScreen[index] = item;
            if (!Libs.isBlank(item.dataLevel2) && Libs.isArrayData(item.dataLevel2)) {
                let maskTemp = 0;
                item.dataLevel2.map((value, key) => {
                    if (checked) {
                        for (let k = 0; k < vAuth + 1; k++) {
                            maskTemp = 1 << k;
                        }
                        // add view permission if other permission has been checked
                        if (!Libs.isBlank(vAuth) && vAuth !== Constants.AUTH_MODE.VIEW) {
                            value[Constants.AUTH_DATA_KEY.VIEW] = 1;
                        }
                    } else {
                        if (!Libs.isBlank(vAuth) && vAuth == Constants.AUTH_MODE.VIEW) {
                            value[Constants.AUTH_DATA_KEY.NEW] = 0;
                            value[Constants.AUTH_DATA_KEY.EDIT] = 0;
                            value[Constants.AUTH_DATA_KEY.DEL] = 0;
                            value[Constants.AUTH_DATA_KEY.PRINT] = 0;
                            value[Constants.AUTH_DATA_KEY.PDF] = 0;
                            value[Constants.AUTH_DATA_KEY.EXCEL] = 0;
                            value[Constants.AUTH_DATA_KEY.TRANSLATE] = 0;
                            value[Constants.AUTH_DATA_KEY.APPROVAL] = 0;
                            value[Constants.AUTH_DATA_KEY.FULL] = 0;
                        }
                    }
                    value[dataKey] = maskTemp;
                    value = this._setAuths(value);

                });

            }

        } else {
            dataListScreen.map((v, k) => {
                if (v.id == item.parent) {
                    if (!Libs.isBlank(v.dataLevel2) && Libs.isArrayData(v.dataLevel2)) {
                        var countNew = 0, countEdit = 0, countView = 0, countDelete = 0, countPrint = 0, countApproval = 0, countPdf = 0, countExcel = 0, countTranslate = 0;

                        v.dataLevel2.map((val, key) => {
                            if (val.id == item.id) {
                                v.dataLevel2[key] = item;
                                if (item.new > 0) { countNew++; }
                                if (item.edit > 0) { countEdit++; }
                                if (item.view > 0) { countView++; }
                                if (item.delete > 0) { countDelete++; }
                                if (item.print > 0) { countPrint++; }
                                if (item.pdf > 0) { countPdf++; }
                                if (item.excel > 0) { countExcel++; }
                                if (item.translate > 0) { countTranslate++; }
                                if (item.approval > 0) { countApproval++; }
                            } else {
                                if (val.new > 0) { countNew++; }
                                if (val.edit > 0) { countEdit++; }
                                if (val.view > 0) { countView++; }
                                if (val.delete > 0) { countDelete++; }
                                if (val.print > 0) { countPrint++; }
                                if (val.pdf > 0) { countPdf++; }
                                if (val.excel > 0) { countExcel++; }
                                if (val.translate > 0) { countTranslate++; }
                                if (val.approval > 0) { countApproval++; }
                            }
                        });
                        if (countNew > 0) { v[Constants.AUTH_DATA_KEY.NEW] = 2; } else { v[Constants.AUTH_DATA_KEY.NEW] = 0;  }
                        if (countEdit > 0) { v[Constants.AUTH_DATA_KEY.EDIT] = 8; } else {v[Constants.AUTH_DATA_KEY.EDIT] = 0;}
                        if (countView > 0) { v[Constants.AUTH_DATA_KEY.VIEW] = 1; } else {v[Constants.AUTH_DATA_KEY.VIEW] = 0;}
                        if (countDelete > 0) { v[Constants.AUTH_DATA_KEY.DEL] = 4; } else {v[Constants.AUTH_DATA_KEY.DEL] = 0;}
                        if (countPrint > 0) { v[Constants.AUTH_DATA_KEY.PRINT] = 64; } else {v[Constants.AUTH_DATA_KEY.PRINT] = 0;}
                        if (countPdf > 0) { v[Constants.AUTH_DATA_KEY.PDF] = 32; } else {v[Constants.AUTH_DATA_KEY.PDF] = 0;}
                        if (countExcel > 0) { v[Constants.AUTH_DATA_KEY.EXCEL] = 16; } else {v[Constants.AUTH_DATA_KEY.EXCEL] = 0;}
                        if (countApproval > 0) { v[Constants.AUTH_DATA_KEY.APPROVAL] = 256; } else {v[Constants.AUTH_DATA_KEY.APPROVAL] = 0;}
                        if (countTranslate > 0) { v[Constants.AUTH_DATA_KEY.TRANSLATE] = 128; } else {v[Constants.AUTH_DATA_KEY.TRANSLATE] = 0;}
                        
                        v = this._setAuths(v);
                        dataListScreen[k] = v;

                    }

                }
            });
        }

        item = this._setAuths(item);

        self.setState({
            dataListScreen: dataListScreen
        });
        this._updateData(item);
    }

    /**
     * Update quyền đã chọn
     * @author Long.Pham 2019-09-20
     * @param {Array} data
     */
    async _updateData(data) {

        let self = this, screens = [], params = {};
        let curItem = self.state.curItem;
        if (Libs.isObjectEmpty(data)) {
            this.toast(trans.translate("message.msg_err_unknown"), "error");
            return;
        }
        let dataListScreen = self.state.dataListScreen;

        if (data.has_child == 0) {
            var itemRoleMap = {
                id_role: parseInt(curItem.id_role),
                id_screen: parseInt(data.id_screen),
                auths: parseInt(data.auths)
            }
            screens.push(itemRoleMap);
            if (Libs.isArrayData(dataListScreen)) {
                dataListScreen.map((v, k) => {
                    if(v.id == data.parent){
                        var itemLevelParent = {
                            id_role: parseInt(curItem.id_role),
                            id_screen: parseInt(v.id_screen),
                            auths: parseInt(v.auths)
                        }
                        screens.push(itemLevelParent);
                    }
                })
            }

        } else {
            
            if (!Libs.isArrayData(dataListScreen)) return;
            let item = Libs.find(dataListScreen, 'id', data.id);
            if (Libs.isObjectEmpty(item)) return;
            var itemRoleMap1 = {
                id_role: parseInt(curItem.id_role),
                id_screen: parseInt(data.id_screen),
                auths: parseInt(data.auths)
            }
            screens.push(itemRoleMap1);
            if (!Libs.isBlank(item.dataLevel2) && Libs.isArrayData(item.dataLevel2)) {
                item.dataLevel2.map((value, index) => {
                    var itemLevel2 = {
                        id_role: parseInt(curItem.id_role),
                        id_screen: parseInt(value.id_screen),
                        auths: parseInt(value.auths)
                    }
                    screens.push(itemLevel2);
                })
            } else {
                // Get list screen level 2
                params.auths = parseInt(data.auths);
                params.id_role = parseInt(curItem.id_role);
                params.type = '';
                params.id_screen = parseInt(data.id_screen);
            }
        }

        if (!Libs.isArrayData(screens)) {
            this.toast(trans.translate("message.msg_err_unknown"), "error");
            return;
        }

        params.screens = screens;
        RoleService.instance.updateRolePermissions(params, function (status, msg) {
            if(!status) self.toast(msg, "info");
        });
    }

    async updatePermission (){
        let self = this;
        RoleService.instance.updateAllPermission({}, function (status, msg) {
            if (status) {
                self.toast(msg, "info")
            }
        });
    }
    
}
export default Permissions;