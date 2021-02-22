
import AdminBaseComponent from '../../../AdminBaseComponent';
import DeleteEmployeePopupJsx from './DeleteEmployeePopup.jsx';
import EmployeeService from '../../../../services/EmployeeService';
import cloneDeep from 'lodash-es/cloneDeep';

class DeleteEmployeePopup extends AdminBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
        }
        this.jsxTemplate = DeleteEmployeePopupJsx;
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 2021-01-06
     */
    componentDidMount() {
    }

    /**
     * @description close popup
     * @author long.pham 2021-01-06
     */
    onCloseDeleteEmployeePopup() {
        if (!this.props.onCloseDeleteEmployeePopup || typeof this.props.onCloseDeleteEmployeePopup !== 'function') return;
        this.props.onCloseDeleteEmployeePopup(false, null);
    }


    /** 
     * @description delete Employee
     * @author long.pham 2021-01-06
    */
    async onDeleteAction() {
        let params = this.state.curItem, self = this;
        params.is_delete = (params.is_delete == 1? 0 : 1);
        EmployeeService.instance.delete(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseDeleteEmployeePopup(true, data);
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
export default DeleteEmployeePopup;