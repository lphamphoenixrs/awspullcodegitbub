import RolesJsx from './Roles.jsx';
import AdminBaseComponent from '../../../AdminBaseComponent';
import RoleService from '../../../../services/RoleService';

export default class Roles extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = RolesJsx;
    this.state = {
      curItem: {},
      dataList: [],
      searchParam: {
        limit: Constants.COMMON.LIMIT,
        offset: 0,
        index: 1,
      },

      paging: {
        total: 0,
        current: 1
      },
      total_row: 0,
      showAddRolePopup: false,
      showDeleteRolePopup : false
    };
  }
  componentDidMount() {
    super.componentDidMount();
    this.getList();
  }

  /**^M
    * @description Status change event
    * @author long.pham 2020-12-30
    */
  onStatusChange = (index) => {
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
        status: isActiveUpdate
    };
    RoleService.instance.updateStatus(param, function (status, msg) {
        if (status) {
            item.status = isActiveUpdate;
            self.setState({
                dataList: self.state.dataList
            });
        }
    });
  }

  /**
   * get role list
   * @author Long.Pham 2020-12-30
   */
  getList() {
    let self = this;
    RoleService.instance.getList(self.state.searchParam, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.state.dataList = data;
        var total = parseInt(total_row / self.state.searchParam.limit);
        if (total_row % self.state.searchParam.limit > 0) {
          total = total + 1;
        }
        self.state.paging.total = total;
        self.state.paging.current = self.state.searchParam.index;
        self.state.total_row = total_row;
        self.forceUpdate()
      }
    })
  }

  /**
   * Select page in pagging
   * @author Long.Pham 2020-12-20
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
   * @description Show user popup
   * @author Long.Pham 2020-12-30
  */
  onAddRolePopup() {
    this.setState({
      curItem: { screen_mode: Constants.SCREEN_MODE.ADD },
      showAddRolePopup: true
    });
  }

  /**
   * @description Close user popup
   * @author Long.Pham 2020-12-30
   */
  onCloseAddRolePopup = (status, item) => {
    let self = this;
    if(status && item)
    {
      var {searchParam, paging} = self.state;
      searchParam.limit = Constants.COMMON.LIMIT;
      searchParam.offset = 0;
      searchParam.index = 1;

      paging.total = 0;
      paging.current = 1;

      self.setState({
        searchParam: searchParam,
        paging: paging
      }, () => {
        self.getList();
      })
      
    }
    this.setState({
      showAddRolePopup: false
    });
  }

  onCloseDeleteRolePopup = (status, item) => {
    let self = this;
    if(status && item){
      self.getList();
    }
    
    this.setState({
      showDeleteRolePopup: false
    });
  }
  /**
     * @description Item click event
     * @author Long.Pham 2020-12-30
     * @param index element in the list
     */
    onItemClick = (index) => {
      if (!Libs.isArrayData(this.state.dataList)) return;
      var item = this.state.dataList[index];
      item.screen_mode = Constants.SCREEN_MODE.EDIT;
      this.setState({
          curItem: item,
          showAddRolePopup: true
      });
  }

  /**
   * @description Item click event delete
   * @author Long.Pham 2020-12-30
   * @param index Order element in the list
   */
  onItemClickDelete = (index) => {
      if (!Libs.isArrayData(this.state.dataList)) return;
      var item = this.state.dataList[index];
      this.setState({
          curItem: item,
          showDeleteRolePopup: true
      });
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

