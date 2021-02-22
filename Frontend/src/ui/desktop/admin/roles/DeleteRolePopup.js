
import AdminBaseComponent from '../../../AdminBaseComponent';
import DeleteRolePopupJsx from './DeleteRolePopup.jsx';
import RoleService from '../../../../services/RoleService';
import cloneDeep from 'lodash-es/cloneDeep';

class DeleteRolePopup extends AdminBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
        }
        this.jsxTemplate = DeleteRolePopupJsx;
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 2020-12-30
     */
    componentDidMount() {
    }

    /**
     * @description close popup
     * @author long.pham 2020-12-30
     */
    onCloseDeleteRolePopup() {
        if (!this.props.onCloseDeleteRolePopup || typeof this.props.onCloseDeleteRolePopup !== 'function') return;
        this.props.onCloseDeleteRolePopup(false, null);
    }


    /** 
     * @description delete Role
     * @author long.pham 2020-12-30
    */
    async onDeleteAction() {
        let params = this.state.curItem, self = this;
        params.is_delete = (params.is_delete == 1? 0 : 1);
        RoleService.instance.delete(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseDeleteRolePopup(true, data);
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
export default DeleteRolePopup;