/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import AdminBaseComponent from '../../../AdminBaseComponent';
import AddMangeSitePopupJsx from './AddManageSitePopup.jsx';
import DeviceService from '../../../../services/DeviceService';
import VendorService from '../../../../services/VendorService';
import DeviceTypeService from '../../../../services/DeviceTypeService';
import DeviceGroupService from '../../../../services/DeviceGroupService';
import cloneDeep from 'lodash-es/cloneDeep';
import AddDevicePopupValidate from './AddDevicePopupValidate';
import Libs from '../../../../utils/Libs';

class AddManageSitePopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            siteCurItem: cloneDeep(this.props.curItem),
            curItem: {},
            dataList: [],
            listVendor: [],
            listGroup: [],
            showAdd: false,
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
            paging: {
                total: 0,
                current: 1
            },
            total_row: 0
        }
        this.jsxTemplate = AddMangeSitePopupJsx;
        this.handleDateInputChange = this.handleDateInputChange.bind(this);
        this.handleDropdownInputChange = this.handleDropdownInputChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        this.getList();
        this.getListDropdown();
        this.getListDeviceType();
        this.getListGroupDevice();
    }

    handleDateInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let item = this.state.curItem;
            item[name] = value;
            this.setState({
                curItem: item
            });
        }
    }

    
    handleDropdownInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let item = this.state.curItem;
            item[name] = value;
            if(name == 'id_device_group'){
                var listGroup = this.state.listGroup;
                var findItem = Libs.find(listGroup, 'id', value);
                if(!Libs.isObjectEmpty(findItem)){
                    item.datatablename = findItem.table_name;
                }
            }

            this.setState({
                curItem: item
            });
        }
    }

    onAddDevicePopup () {
        this.setState({
            showAdd: this.state.showAdd ? false: true
        })
    }

    onClickReset (){
        this.setState({
            curItem: {}
        });
    }

    async onSaveAction(){
        let params = cloneDeep(this.state.curItem), self = this, siteCurItem = this.state.siteCurItem;
        var screenMode = (!Libs.isBlank(this.state.curItem.screen_mode)) ? this.state.curItem.screen_mode : Constants.SCREEN_MODE.ADD;
        let v = new AddDevicePopupValidate();
        let errors = await v.FLValidationAll(params);
        if (errors) {
            setValidateMessage(errors);
            return;
        }

        if (!Libs.isBlank(params.configurationchangetime)) {
            params.configurationchangetime = Libs.convertAllFormatDate(params.configurationchangetime);
        }

        //remove message va lidation
        removeAllValidateMessage();
        params.screen_mode = screenMode;
        params.id_site = siteCurItem.id;

        if(!Libs.isBlank(params.is_delete)){
            params.is_delete = parseInt(params.is_delete);
        }
        if(!Libs.isBlank(params.status)){
            params.status = parseInt(params.status);
        }

        DeviceService.instance.saveDevice(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.getList();
                self.setState({
                    curItem: {}
                })
            }
            else if (data) {
                setValidateMessage(data);
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }
    /**
     * Get list vendor
     * @author long.pham 2021-01-08
     * @return array
     */

    getListDropdown() {
        let self = this;
        VendorService.instance.getListDropdown({}, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    listVendor: data
                });
            } else {
                self.setState({
                    listVendor: []
                });
            }
        })
    }

    /**
     * Get list device type
     * @author long.pham 2021-01-08
     * @return array
     */

    getListDeviceType() {
        let self = this;
        DeviceTypeService.instance.getListDropdown({}, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    listDeviceType: data
                });
            } else {
                self.setState({
                    listDeviceType: []
                });
            }
        })
    }

    /**
     * Get list group device
     * @author long.pham 2021-01-08
     * @return array
     */

    getListGroupDevice() {
        let self = this;
        DeviceGroupService.instance.getListDropdown({}, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    listGroup: data
                });
            } else {
                self.setState({
                    listGroup: []
                });
            }
        })
    }

    /**
   * get Employee list
   * @author Long.Pham 2021-01-06
   */
    getList() {
        let self = this;
        var { siteCurItem, searchParam } = this.state;
        searchParam.id_site = siteCurItem.id;

        DeviceService.instance.getListDeviceBySite(searchParam, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.state.dataList = data;
                var total = parseInt(total_row / self.state.searchParam.limit);
                if (total_row % self.state.searchParam.limit > 0) {
                    total = total + 1;
                }
                self.state.paging.total = total;
                self.state.paging.current = self.state.searchParam.index;
                self.state.total_row = total_row;

            } else {
                self.setState({
                    dataList: [],
                    total_row: 0,
                    paging: {
                        total: 0,
                        current: 1
                    }
                });
            }
            self.forceUpdate()
        })
    }


    onSort(event, sortKey) {
        this.state.searchParam.sort_column = sortKey;
        this.state.searchParam.order_by = (this.state.searchParam.order_by == '' || this.state.searchParam.order_by == 'asc') ? 'desc' : 'asc';
        this.forceUpdate();
        this.getList();
    }


    /**
       * Select page in pagging
       * @author Long.Pham 2021-01-07
       * @param {int} index
       */
    onSelectPage(index) {
        let self = this;
        self.state.searchParam.index = index;
        if (index > 0) {
            self.state.searchParam.offset = (index - 1) * self.state.searchParam.limit
        } else {
            self.state.searchParam.offset = 0
        }
        self.getList()
    }


    /**
    * @description change status device event
    * @author long.pham 2021-01-12
    */
    onDeviceStatusChange = (index) => {
        let siteCurItem = this.state.siteCurItem;
        if (!Libs.isArrayData(this.state.dataList)) return;
        var self = this;
        var item = this.state.dataList[index];
        var isActiveUpdate = item.status;
        if (isActiveUpdate * 1 == 1) {
            isActiveUpdate = 0;
        }
        else {
            isActiveUpdate = 1;
        }
        var param = {
            id: item.id,
            id_site: siteCurItem.id,
            status: isActiveUpdate
        };

        DeviceService.instance.updateStatus(param, function (status, msg) {
            if (status) {
                self.getList();
            }
        });
    }


    /**
     * @description validate a field input
     * @author Long.Pham 2021-01-06
     * @param {*} event 
     */
    async validateOne(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let param = {
                [name]: value
            }
            let v = new AddDevicePopupValidate(null);
            let error = await v.validateOne(param, name);
            if (error != null) {
                setValidateMessage(error, true);
            }
        }
    }


    /**
     * @description Item click event
     * @author Long.Pham 2021-01-12
     * @param index element in the list
     */
    onItemClick = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        if(Libs.isObjectEmpty(item)) return;
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
        //remove message va lidation
        removeAllValidateMessage();
  
        this.setState({
            curItem: cloneDeep(item)
        });
    }
  
  
    /**
     * @description Item click event delete
     * @author Long.Pham 2021-01-12
     * @param index Order element in the list
     */
    onItemClickDelete = (index) => {
        var self = this;
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        if(Libs.isObjectEmpty(item)) return; 
        if(!Libs.isBlank(item.status)){
            item.status = parseInt(item.status);
        }

        item.is_delete = (item.is_delete == 1? 0 : 1);
        DeviceService.instance.delete(item, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.getList();
            }
            else if (data) {
                setValidateMessage(data);
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }


}
export default AddManageSitePopup;