import DashboardJsx from './Dashboard.jsx';
import BaseComponent from '../../BaseComponent';
import './Dashboard.scss';
import SiteService from '../../../services/SiteService';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants.js';


export default class Dashboard extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = DashboardJsx;
    this.state = {
      curItem: {},
      dataList: [],
      chart_filter: "today",
      dataFilter: [
        { id: "name", text: "Name" },
        { id: "alert", text: "Alerts" },
        { id: "dc_capacity", text: "DC Capacity" },
        { id: "Watts_3Ph_total", text: "Power" },
        { id: "Sensor1_Data", text: "Irradiance" },
        { id: "Energy_today", text: "Energy Today" },
        { id: "w_hours_received", text: "Energy Lifetime" },
        { id: "eer_last_month", text: "EER Last Month" },
        { id: "eer_this_month", text: "EER This Month" }

      ],
      searchParam: {
        sort_by: "DESC",
        order_by: "",
        index: 1,
        offset: 0,
        limit: Constants.COMMON.LIMIT
      },
    };

    this.pagging = {
      total: 0,
      current: 1
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.getList();
    this.getSummarySiteByCustomerId();
  }

  onChangeChart (index){
    this.setState({
      chart_filter: index
    });
  }
  /**
 * Get list summary site by customer id
 * @author long.pham 2020-10-21
 * @param id_customer
 * @return Object
 */
  getSummarySiteByCustomerId() {
    let self = this;
    let params = {
      id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
    }
    let curItem = this.state.curItem;
    SiteService.instance.getSummarySiteByCustomerId(params, (data) => {
      if (data) {
        curItem = Object.assign({}, curItem, data);
        self.setState({
          curItem: curItem
        }, () => {
          
        });
      }
    });

  }

  handleInputChange(event) {
    let target = event.target, self = this;
    let name = target.name;
    let value = target.value
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.searchParam;
      item[name] = value;
      this.setState({ searchParam: item }, () => { self.getList(); });
    }
  }

  /**
   * Get list site by id_customer
   * @author long.pham 2020-10-08
   * @param id_customer
   * @return array
   */

  getList() {
    let self = this;
    let params = self.state.searchParam;
    params.id_customer = this.user.id_user;
    params.current_time = Libs.convertAllFormatDate(Libs.getCurrentMMDDYYYYHI());
    params.offset_timezone = Libs.getOffsetTimeZone(Libs.getCurrentMMDDYYYYHI());
    params.offset_from =  Constants.DATE_FORMAT.offset_from;

    SiteService.instance.getList(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataList: data
        }, () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        var total = parseInt(total_row / self.state.searchParam.limit);
        if (total_row % self.state.searchParam.limit > 0) {
          total = total + 1;
        }
        self.pagging.total = total;
        self.pagging.current = self.state.searchParam.index;
      } else {
        self.setState({
          dataList: []
        });
        self.pagging.total = 0;
        self.pagging.current = 1;
      }

      this.forceUpdate();
    })
  }


  /**
   * @description Select page in pagging
   * @author Long.Pham 2010-10-09
   * @param {int} index
   */
  onSelectPage(index) {
    let self = this;
    self.state.searchParam.index = index;
    if (index > 0) {
      self.state.searchParam.offset = (index - 1) * self.state.searchParam.limit;
    } else {
      self.state.searchParam.offset = 0;
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

