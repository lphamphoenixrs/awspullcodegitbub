
import AdminBaseComponent from '../../../AdminBaseComponent';
import DeleteCustomerPopupJsx from './DeleteCustomerPopup.jsx';
import CustomerService from '../../../../services/CustomerService';
import cloneDeep from 'lodash-es/cloneDeep';

class DeleteCustomerPopup extends AdminBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
        }
        this.jsxTemplate = DeleteCustomerPopupJsx;
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author long.pham 2021-01-05
     */
    componentDidMount() {
    }

    /**
     * @description close popup
     * @author long.pham 2021-01-05
     */
    onCloseDeleteCustomerPopup() {
        if (!this.props.onCloseDeleteCustomerPopup || typeof this.props.onCloseDeleteCustomerPopup !== 'function') return;
        this.props.onCloseDeleteCustomerPopup(false, null);
    }


    /** 
     * @description delete Customer
     * @author long.pham 2021-01-05
    */
    async onDeleteAction() {
        let params = this.state.curItem, self = this;
        params.is_delete = (params.is_delete == 1? 0 : 1);
        CustomerService.instance.delete(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseDeleteCustomerPopup(true, data);
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
export default DeleteCustomerPopup;