import ClientAlertDetailJsx from './ClientAlertDetail.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientAlertDetail.scss';
import Libs from '../../../utils/Libs';
import SiteService from '../../../services/SiteService';
import AlertService from '../../../services/AlertService';

export default class ClientAlertDetail extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientAlertDetailJsx;
    var queryParams = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {},
      curDetail: {},
      queryParams: {
        id_site: !Libs.isObjectEmpty(queryParams) ? queryParams.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null,
        id_alert: !Libs.isObjectEmpty(queryParams) ? queryParams.id_alert : null
      }
    };
  }
  componentDidMount() {
    super.componentDidMount();
    this.getDetailSite();
  }



   /**
 * Get detail alert
 * @author long.pham 2020-11-24
 * @param id_site, id_customer, id_alert, current_time
 * @return Object
 */
getDetailAlert() {
  let self = this;
  let { curItem, queryParams } = this.state;

  var params = {
    id_site: parseInt(queryParams.id_site),
    id_customer: parseInt(curItem.id_customer),
    id: parseInt(queryParams.id_alert),
    current_time: Libs.convertAllFormatDate(Libs.getCurrentMMDDYYYYHI()),
    offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
    format_sql_long: curItem.format_sql_long,
    format_sql_short: curItem.format_sql_short,
    format_sql_string_long: curItem.format_sql_string_long,
    format_sql_string_short: curItem.format_sql_string_short,
    format_sql_string_mdy: curItem.format_sql_string_mdy
  }

  AlertService.instance.getDetailAlert(params, (data) => {
    if (data) {
      self.setState({
        curDetail: data
      });
    } else {
      self.props.baseParam.history.push('/');
    }
  });
}

  /**
 * Get detail site
 * @author long.pham 2020-11-24
 * @param id_site, id_customer
 * @return Object
 */
  getDetailSite() {
    let self = this;
    let { curItem, queryParams } = this.state;

    var params = {
      id: queryParams.id_site,
      id_customer: queryParams.id_customer
    }

    SiteService.instance.getDashboardDetailSite(params, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        self.setState({
          curItem: curItem
        }, () => {
          self.getDetailAlert();
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

