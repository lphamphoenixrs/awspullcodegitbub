import AdminBaseComponent from '../../../AdminBaseComponent';
import AddMangeSitePopupJsx from './AddManageSitePopup.jsx';
import SiteService from '../../../../services/SiteService';
import cloneDeep from 'lodash-es/cloneDeep';
import Libs from '../../../../utils/Libs';

class AddManageSitePopup extends AdminBaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            curItem: cloneDeep(this.props.curItem),
            dataList: [],
            formSearch: false,
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
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 2021-01-06
     */
    componentDidMount() {
        this.getList();
    }

    /**
   * get Employee list
   * @author Long.Pham 2021-01-06
   */
    getList() {
        let self = this;
        var { curItem, searchParam } = this.state;
        searchParam.id_customer = curItem.id;

        SiteService.instance.getListAllSite(searchParam, (data, total_row) => {
            console.log(data);
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
    * @description is manage change event
    * @author long.pham 2021-01-07
    */
    onManageChange = (index) => {
        let curItem = this.state.curItem;
        if (!Libs.isArrayData(this.state.dataList)) return;
        var self = this;
        var item = this.state.dataList[index];
        var isActiveUpdate = item.is_manage;
        if (isActiveUpdate * 1 == 1) {
            isActiveUpdate = 0;
        }
        else {
            isActiveUpdate = 1;
        }
        var param = {
            id_employee: curItem.id,
            id_site: item.id,
            is_manage: isActiveUpdate
        };

        SiteService.instance.addEmployeeManageSite(param, function (status, msg) {
            if (status) {
                self.getList();
            }
        });
    }    

}
export default AddManageSitePopup;