import AdminBaseComponent from '../../../AdminBaseComponent';
import AddRolePopupJsx from './AddRolePopup.jsx';
import AddRolePopupValidate from './AddRolePopupValidate';
import RoleService from '../../../../services/RoleService';
import cloneDeep from 'lodash-es/cloneDeep';

class AddRolePopup extends AdminBaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
            curItem: {},
            isGeneratePass: false
        }
        this.jsxTemplate = AddRolePopupJsx;
	}

	/**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2020-12-30
     */
    componentDidMount() {
        this.setState({
            curItem: cloneDeep(this.props.curItem)
        });
    }

    /**
     * @description close popup
     * @author Long.Pham 2020-12-30
     */
    onCloseAddRolePopup() {
        if (!this.props.onCloseAddRolePopup || typeof this.props.onCloseAddRolePopup !== 'function') return;
        this.props.onCloseAddRolePopup(false, null);
    }

    /**
     * @description Open the input field to get a random password
     * @author Long.Pham 2020-12-30
     */
    onGeneratePassword = () => {
        var { curItem } = this.state;
        curItem.password = Libs.generateStrRandom(10);
        this.setState({
            curItem,
            isGeneratePass: true
        });
    }

    /**
     * @description Get object select change
     * @author Long.Pham 2020-12-30
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
     * @description Save info main settings
     * @author Long.Pham 2020-12-30
    */
    async onSaveAction() {
        let params = this.state.curItem, self = this;
        var screenMode = (!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD;
        let v = new AddRolePopupValidate(screenMode);
        let errors = await v.FLValidationAll(params);
        if (errors) {
            setValidateMessage(errors);
            return;
        }

        //remove message va lidation
        removeAllValidateMessage();
        params.screen_mode =screenMode;
    
        RoleService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseAddRolePopup(true, data);
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
     * @author Long.Pham 2020-12-30
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
            let v = new AddRolePopupValidate(null);
            let error = await v.validateOne(param, name);
            if (error != null) {
                setValidateMessage(error, true);
            }
        }
    }
}
export default AddRolePopup;