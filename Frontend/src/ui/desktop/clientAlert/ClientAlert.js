import ClientAlertJsx from './ClientAlert.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientAlert.scss';
import Libs from '../../../utils/Libs';
import SiteService from '../../../services/SiteService';
import AlertService from '../../../services/AlertService';
import moment from 'moment';

export default class ClientAlert extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientAlertJsx;
    var queryParams = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {},
      searchParam: {
        id_site: !Libs.isObjectEmpty(queryParams) ? queryParams.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null,
        offset_timezone: Libs.getOffsetTimeZone(Libs.getCurrentMMDDYYYYHI()),
        limit: Constants.COMMON.LIMIT,
        offset: 0,
        index: 1,
      },
      dataList: [],
      paging: {
        total: 0,
        current: 1
      }
    };

    this.handleDateInputChange = this.handleDateInputChange.bind(this);

  }
  componentDidMount() {
    super.componentDidMount();
    this.getDetailSite();
  }

  /**
  * @description Get list alert
  * @author long.pham 2020-11-16
  * @param id_site, id_customer, end_date, start_date,  offset_timezone
  * @returns array
  */
  getListAlert() {
    let self = this, curItem = this.state.curItem, searchParam = this.state.searchParam;
    var startDate = Libs.dateFormat(curItem.date_from, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00";
    var endDate = '';

    if (Libs.dateFormat(curItem.date_to, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      endDate = Libs.dateFormat(curItem.date_to, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
    } else {
      endDate = curItem.date_to;
    }

    searchParam.start_date = Libs.convertAllFormatDate(startDate);
    searchParam.end_date = Libs.convertAllFormatDate(endDate);
    searchParam.format_sql_long = curItem.format_sql_long;
    searchParam.format_sql_short = curItem.format_sql_short;
    searchParam.format_sql_string_long = curItem.format_sql_string_long;
    searchParam.format_sql_string_short = curItem.format_sql_string_short;
    searchParam.format_sql_string_mdy = curItem.format_sql_string_mdy;

    AlertService.instance.getList(searchParam, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataList: data
        });
        var total = parseInt(total_row / searchParam.limit);

        if (total_row % searchParam.limit > 0) {
          total = total + 1;
        }

        self.setState({
          paging: {
            total: total,
            current: searchParam.index
          }
        })

      } else {
        self.setState({
          dataList: [],
          paging: {
            total: 0,
            current: 1
          }
        });
      }
    });
  }

  /**
 * Get detail site
 * @author long.pham 2020-11-16
 * @param id_site, id_customer
 * @return Object
 */
  getDetailSite() {
    let self = this;
    let { curItem, searchParam } = this.state;

    var params = {
      id: searchParam.id_site,
      id_customer: searchParam.id_customer
    }

    SiteService.instance.getDashboardDetailSite(params, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();
        curItem.viewActive = "year";
        curItem.date_from = moment(Libs.addYears(Libs.getCurrentMMDDYYYYHI(), -1)).format('MM/DD/YYYY HH:mm:ss');
        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        self.setState({
          curItem: curItem
        }, () => {
          self.getListAlert();
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }



  /**
  * handle change view 
  * @param {*} content 
  * @param {*} props 
  */
  onChangeView(index) {
    var curItem = this.state.curItem, self = this;
    switch (index) {
      case "day":
        curItem.date_from = Libs.getCurrentMMDDYYYYHI();
        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        curItem.viewActive = "day";
        break;
      case "week":
        curItem.date_from = moment(Libs.addDays(Libs.getCurrentMMDDYYYYHI(), -7)).format('MM/DD/YYYY HH:mm:ss');

        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        curItem.viewActive = "week";
        break;
      case "month":
        curItem.date_from = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -1)).format('MM/DD/YYYY HH:mm:ss');

        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        curItem.viewActive = "month";
        break;
      case "year":
        curItem.date_from = moment(Libs.addYears(Libs.getCurrentMMDDYYYYHI(), -1)).format('MM/DD/YYYY HH:mm:ss');
        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        curItem.viewActive = "year";
        break;
    }
    this.setState({
      curItem: curItem
    }, () => {
      self.getListAlert();
    });
  }

  /**
    * @description Select page in pagging
    * @author Long.Pham 09/22/2020
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
    self.getListAlert();
  }

  /**
    * Func filter table
    * @author long.pham 09/22/2020
    * @param  {Object} e
    */

  onSort(event, sortKey) {
    this.state.searchParam.sortColumn = sortKey;
    this.state.searchParam.sortOrder = (this.state.searchParam.sortOrder == '' || this.state.searchParam.sortOrder == 'asc') ? 'desc' : 'asc';
    this.getListAlert();
  }



  handleDateInputChange(event) {
    let target = event.target, self = this;
    let name = target.name;
    let value = target.value
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.curItem;
      if (name == 'date_from') {
        if (Libs.compareDate(value, 'MM/DD/YYYY', item.date_to) == 1) {
          item.date_to = value;
        }
      }

      if (name == 'date_to') {
        if (Libs.compareDate(value, 'MM/DD/YYYY', item.date_from) < 0) {
          item.date_from = value;
        }
      }

      item[name] = value;
      this.setState({
        curItem: item
      }, () => {
        self.getListAlert();
      });
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

