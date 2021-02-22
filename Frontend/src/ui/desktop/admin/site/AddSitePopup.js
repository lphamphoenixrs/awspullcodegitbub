/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import AdminBaseComponent from '../../../AdminBaseComponent';
import AddSitePopupJsx from './AddSitePopup.jsx';
import AddSitePopupValidate from './AddSitePopupValidate';
import SiteService from '../../../../services/SiteService';
import SiteTypeService from '../../../../services/SiteTypeService';
import TimeZoneService from '../../../../services/TimeZoneService';
import CountryService from '../../../../services/CountryService';
import CustomerService from '../../../../services/CustomerService';
import cloneDeep from 'lodash-es/cloneDeep';
import Libs from '../../../../utils/Libs';

class AddSitePopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
            dataListCountry: [],
            dataListTimeZone: [],
            msgError: ""
        }
        this.jsxTemplate = AddSitePopupJsx;
        this.handleDateInputChange = this.handleDateInputChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        let curItem = this.state.curItem;
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();

        this.setState({
            curItem: curItem
        });
        this.getListTimeZone();
        this.getListCountry();
        this.getListSiteType();
        this.getListCustomer();
        
    }

    /**
     * Get list customer
     * @author long.pham 2021-01-08
     * @return array
     */

    getListCustomer() {
        let self = this;
        CustomerService.instance.getAll({}, (data, total_row) => {
        if (Libs.isArrayData(data)) {
            self.setState({
                listCustomer: data
            });
        } else {
            self.setState({
                listCustomer: []
            });
        }
        })
    }

    /**
     * Get list site type
     * @author long.pham 2021-01-08
     * @return array
     */

    getListSiteType() {
        let self = this;
        SiteTypeService.instance.getAll({}, (data, total_row) => {
        if (Libs.isArrayData(data)) {
            self.setState({
                listSiteType: data
            });
        } else {
            self.setState({
                listSiteType: []
            });
        }
        })
    }

    /**
     * Get list time zone
     * @author long.pham 2021-01-08
     * @return array
     */

    getListTimeZone() {
        let self = this;
        TimeZoneService.instance.getList({}, (data, total_row) => {
        if (Libs.isArrayData(data)) {
            self.setState({
            dataListTimeZone: data
            });
        } else {
            self.setState({
            dataListTimeZone: []
            });
        }
        })
    }


    /**
     * Get list country
     * @author long.pham 2021-01-08
     * @return array
     */

    getListCountry() {
        let self = this;
        CountryService.instance.getList({}, (data, total_row) => {
        if (Libs.isArrayData(data)) {
            self.setState({
            dataListCountry: data
            });
        } else {
            self.setState({
            dataListCountry: []
            });
        }
        })
    }






    handleDateInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
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

   
    /**
    * @description Update site gallery
    * @author Long.Pham 2021-01-06
    */
    onFileChange = (event) => {
        var target = event.target;
        var self = this, { curItem, msgError } = this.state;
        var file = target.files[0];
        if (file.length <= 0) return;
        if (file.length > Constants.COMMON.LIMIT_IMG) {
            self.toast(trans.translate('message.msg_err_limit_image'), "error");
            return;
        } else {
            var fileName = file.name, fileSize = file.size;
            var checkExtFile = Libs.checkExtensionFile(fileName, 1);
            if (!checkExtFile) {
                msgError = trans.translate('message.msg_err_ext_image_file')
            }
            else if (fileSize <= 0) {
                msgError = trans.translate('message.msg_err_file_size');
            }
            else if (fileSize > Constants.COMMON.MAX_FILE_SIZE) {
                msgError = trans.translate('message.msg_err_max_size_upload');
            }
            if (!Libs.isBlank(msgError)) {
                curItem.file_upload = '';
                this.setState({
                    msgError,
                    curItem
                });
                return;
            }
            else {
                this.setState({
                    msgError: null
                });
            }
            //Read file upload
            var reader = new FileReader();
            reader.onload = function (e) {
                curItem.file_upload = e.target.result;
                curItem.gallery = fileName;
                self.setState({
                    curItem
                });
            };
            reader.readAsDataURL(file);

        }
    }

    /**
     * @description close popup
     * @author Long.Pham 2021-01-06
     */
    onCloseAddSitePopup() {
        if (!this.props.onCloseAddSitePopup || typeof this.props.onCloseAddSitePopup !== 'function') return;
        this.props.onCloseAddSitePopup(false, null);
    }

    /**
     * @description Get object select change
     * @author Long.Pham 2021-01-06
     */
    onSelectChange = (event, data) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var { curItem } = this.state;
        curItem[name] = value;
        this.setState({
            curItem
        });
        this.validateOne(event);
    }

    /** 
     * @description Save Site
     * @author Long.Pham 2021-01-06
    */
    async onSaveAction() {
        let params = cloneDeep(this.state.curItem), self = this;
        var screenMode = (!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD;
        let v = new AddSitePopupValidate(screenMode);
        let errors = await v.FLValidationAll(params);
        if (errors) {
            setValidateMessage(errors);
            return;
        }

        if (!Libs.isBlank(params.built_since)) {
            params.built_since = Libs.convertAllFormatDate(params.built_since);
        }
        if (!Libs.isBlank(params.commissioning)) {
            params.commissioning = Libs.convertAllFormatDate(params.commissioning);
        }
        //remove message va lidation
        removeAllValidateMessage();
        params.screen_mode = screenMode;
        if(!Libs.isBlank(params.is_delete)){
            params.is_delete = parseInt(params.is_delete);
        }
        if(!Libs.isBlank(params.status)){
            params.status = parseInt(params.status);
        }

        SiteService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseAddSitePopup(true, data);
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
            let v = new AddSitePopupValidate(null);
            let error = await v.validateOne(param, name);
            if (error != null) {
                setValidateMessage(error, true);
            }
        }
    }
}
export default AddSitePopup;