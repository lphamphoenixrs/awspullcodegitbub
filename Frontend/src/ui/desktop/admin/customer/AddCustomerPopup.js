import AdminBaseComponent from '../../../AdminBaseComponent';
import AddCustomerPopupJsx from './AddCustomerPopup.jsx';
import AddCustomerPopupValidate from './AddCustomerPopupValidate';
import CustomerService from '../../../../services/CustomerService';
import cloneDeep from 'lodash-es/cloneDeep';
import Libs from '../../../../utils/Libs';

class AddCustomerPopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
            isGeneratePass: false,
            msgError: "",
        }
        this.jsxTemplate = AddCustomerPopupJsx;
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-05
     */
    componentDidMount() {
        let curItem = this.state.curItem;
        if (curItem.screen_mode == Constants.SCREEN_MODE.ADD) {
            curItem.password = Libs.generateStrRandomV1(2, 2, 2, 2);
        }
        this.setState({
            curItem: curItem
        });
    }

    /**
     * setValue method to Input
     * @author Long.Pham 2021-01-05
     */
    handlePasswordInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name) {
            let curItem = this.state.curItem;
            const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
            if (name == 'password') {
                if (value.length < 8 || regexp.exec(value) == null) {
                    setValidateMessage({password: trans.translate('CUSTOMER.password_valid_min_8character')}, true); 
                } else {
                    setValidateMessage({password:''}, true); 
                }
            }
            curItem[name] = value;
            this.setState({
                curItem: curItem
            });
        }
    }

    onClickRadomPassword() {
        let curItem = this.state.curItem;
        curItem.password = Libs.generateStrRandomV1(2, 2, 2, 2);
        this.setState({
            curItem: curItem
        });
    }

    /**
    * @description Update logo
    * @author Long.Pham 2021-01-05
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
                curItem.logo = fileName;
                self.setState({
                    curItem
                });
            };
            reader.readAsDataURL(file);

        }
    }

    /**
     * @description close popup
     * @author Long.Pham 2021-01-05
     */
    onCloseAddCustomerPopup() {
        if (!this.props.onCloseAddCustomerPopup || typeof this.props.onCloseAddCustomerPopup !== 'function') return;
        this.props.onCloseAddCustomerPopup(false, null);
    }

    /**
     * @description Get object select change
     * @author Long.Pham 2021-01-05
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
     * @description Save customer
     * @author Long.Pham 2021-01-05
    */
    async onSaveAction() {
        let params = cloneDeep(this.state.curItem), self = this;
        var screenMode = (!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD;
        let v = new AddCustomerPopupValidate(screenMode);
        let errors = await v.FLValidationAll(params);
        const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        if (errors) {
            setValidateMessage(errors);
            return;
        }

        if(screenMode != Constants.SCREEN_MODE.ADD && !Libs.isBlank(params.password)){
            if (params.password.length < 8 || regexp.exec(params.password) == null) {
                setValidateMessage({password: trans.translate('CUSTOMER.password_valid_min_8character')}, true); return;
            } else {
                setValidateMessage({password: ''}, true);
            }
        }

        if(screenMode == Constants.SCREEN_MODE.ADD && !Libs.isBlank(params.password)){
            if (params.password.length < 8 || regexp.exec(params.password) == null) {
                setValidateMessage({password: trans.translate('CUSTOMER.password_valid_min_8character')}, true); return;
            } else {
                setValidateMessage({password: ''}, true);
            }
        }

        //remove message va lidation
        removeAllValidateMessage();
        params.screen_mode = screenMode;
        if(!Libs.isBlank(params.password)){
            params.password = Libs.md5(params.password);
        }
        
        CustomerService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseAddCustomerPopup(true, data);
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
     * @author Long.Pham 2021-01-05
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
            let v = new AddCustomerPopupValidate(null);
            let error = await v.validateOne(param, name);
            if (error != null) {
                setValidateMessage(error, true);
            }
        }
    }
}
export default AddCustomerPopup;