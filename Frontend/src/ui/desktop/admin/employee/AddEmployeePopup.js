import AdminBaseComponent from '../../../AdminBaseComponent';
import AddEmployeePopupJsx from './AddEmployeePopup.jsx';
import AddEmployeePopupValidate from './AddEmployeePopupValidate';
import EmployeeService from '../../../../services/EmployeeService';
import RoleService from '../../../../services/RoleService';
import cloneDeep from 'lodash-es/cloneDeep';
import Libs from '../../../../utils/Libs';

class AddEmployeePopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
            isGeneratePass: false,
            msgError: "",
            roleLists: [],
            msgRole: ""
        }
        this.jsxTemplate = AddEmployeePopupJsx;
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleDateInputChange = this.handleDateInputChange.bind(this);
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        let curItem = this.state.curItem;
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();
        if (curItem.screen_mode == Constants.SCREEN_MODE.ADD) {
            curItem.password = Libs.generateStrRandomV1(2, 2, 2, 2);
        }

        this.setState({
            curItem: curItem
        });
        this.getAllRole();
    }

    /**
     * setValue method to Input
     * @author Long.Pham 2021-01-06
     */
    handleRoleInputChange(event, index) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let curItem = this.state.curItem;
            let roles = curItem.roles;
            let roleLists = this.state.roleLists;
            let curItemRole = roleLists[index];
            if (Libs.isObjectEmpty(curItemRole)) return;
            let itemRole = {
                id: curItemRole.id,
                id_employee: '',
                id_role: curItemRole.id
            };

            if (value == 1) {
                if (Libs.isArrayData(roles)) {
                    var findItemRole = Libs.find(roles, 'id_role', curItemRole.id);
                    if (Libs.isObjectEmpty(findItemRole)) {
                        roles.push(itemRole);
                    }
                } else {
                    roles.push(itemRole);
                }
            } else {
                if (Libs.isArrayData(roles)) {
                    roles.map((item, index) => {
                        if (item.id_role == curItemRole.id) {
                            roles.splice(index, 1);
                        }
                    })
                }

            }

            roleLists[index].is_checked = value;
            curItem.roles = roles;
            curItem[name] = value;

            this.setState({
                curItem: curItem,
                roleLists: roleLists,
                msgRole: Libs.isArrayData(curItem.roles) ? "": this.state.msgRole
            });
        }
    }

    /**
   * get role list
   * @author Long.Pham 2020-12-30
   */
    getAllRole() {
        let self = this;
        RoleService.instance.getAllRole({}, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    roleLists: data
                }, () => {
                    let curItem = self.state.curItem;
                    if (curItem.screen_mode == Constants.SCREEN_MODE.EDIT) {
                        var roleLists = self.state.roleLists;
                        if (Libs.isArrayData(roleLists)) {
                            roleLists.map((v, i) => {
                                var findItem = Libs.find(curItem.roles, 'id_role', v.id);
                                if (!Libs.isObjectEmpty(findItem)) {
                                    roleLists[i].is_checked = 1;
                                }
                            })
                        }
                        self.setState({
                            roleLists: roleLists
                        });
                    }
                })
            } else {
                self.setState({
                    roleLists: []
                })
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
     * setValue method to Input
     * @author Long.Pham 2021-01-06
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
                    setValidateMessage({ password: trans.translate('Employee.password_valid_min_8character') }, true);
                } else {
                    setValidateMessage({ password: '' }, true);
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
                curItem.avatar = fileName;
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
    onCloseAddEmployeePopup() {
        if (!this.props.onCloseAddEmployeePopup || typeof this.props.onCloseAddEmployeePopup !== 'function') return;
        this.props.onCloseAddEmployeePopup(false, null);
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
     * @description Save Employee
     * @author Long.Pham 2021-01-06
    */
    async onSaveAction() {
        let params = cloneDeep(this.state.curItem), self = this;
        var screenMode = (!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD;
        let v = new AddEmployeePopupValidate(screenMode);
        let errors = await v.FLValidationAll(params);
        const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        if (errors) {
            setValidateMessage(errors);
            return;
        }

        if (screenMode != Constants.SCREEN_MODE.ADD && !Libs.isBlank(params.password)) {
            if (params.password.length < 8 || regexp.exec(params.password) == null) {
                setValidateMessage({ password: trans.translate('Employee.password_valid_min_8character') }, true); return;
            } else {
                setValidateMessage({ password: '' }, true);
            }
        }

        if (screenMode == Constants.SCREEN_MODE.ADD && !Libs.isBlank(params.password)) {
            if (params.password.length < 8 || regexp.exec(params.password) == null) {
                setValidateMessage({ password: trans.translate('Employee.password_valid_min_8character') }, true); return;
            } else {
                setValidateMessage({ password: '' }, true);
            }
        }

        if (!Libs.isBlank(params.birthday)) {
            params.birthday = Libs.convertAllFormatDate(params.birthday);
        }
        //remove message va lidation
        removeAllValidateMessage();
        params.screen_mode = screenMode;
        if (!Libs.isBlank(params.password)) {
            params.password = Libs.md5(params.password);
        }
        if (!Libs.isArrayData(params.roles)) {
            this.setState({
                msgRole: trans.translate('EMPLOYEE.role_not_choose')
            });
            return;
        } else {
            this.setState({
                msgRole: ""
            });
        }

        EmployeeService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseAddEmployeePopup(true, data);
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
            let v = new AddEmployeePopupValidate(null);
            let error = await v.validateOne(param, name);
            if (error != null) {
                setValidateMessage(error, true);
            }
        }
    }
}
export default AddEmployeePopup;