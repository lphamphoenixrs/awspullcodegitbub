
/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import AdminBaseComponent from '../../../AdminBaseComponent';
import DeleteSitePopupJsx from './DeleteSitePopup.jsx';
import SiteService from '../../../../services/SiteService';
import cloneDeep from 'lodash-es/cloneDeep';
import Libs from '../../../../utils/Libs';

class DeleteSitePopup extends AdminBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
        }
        this.jsxTemplate = DeleteSitePopupJsx;
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
    onCloseDeleteSitePopup() {
        if (!this.props.onCloseDeleteSitePopup || typeof this.props.onCloseDeleteSitePopup !== 'function') return;
        this.props.onCloseDeleteSitePopup(false, null);
    }


    /** 
     * @description delete Site
     * @author long.pham 2021-01-06
    */
    async onDeleteAction() {
        let params = this.state.curItem, self = this;
        params.is_delete = (params.is_delete == 1? 0 : 1);
        if(!Libs.isBlank(params.status)){
            params.status = parseInt(params.status);
        }
        SiteService.instance.delete(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onCloseDeleteSitePopup(true, data);
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
export default DeleteSitePopup;