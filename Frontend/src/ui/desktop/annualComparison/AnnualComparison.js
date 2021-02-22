import AnnualComparisonJsx from './AnnualComparison.jsx';
import BaseComponent from '../../BaseComponent';
import './AnnualComparison.scss';
import Libs from '../../../utils/Libs';
import SiteService from '../../../services/SiteService';

export default class AnnualComparison extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = AnnualComparisonJsx;
    var queryParams = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {
        id_site: !Libs.isObjectEmpty(queryParams) ? queryParams.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null,
        current_time: Libs.getCurrentMMDDYYYYHI()
      },
      dataList: [],
      chartOption: {},
    };

  }
  componentDidMount() {
    super.componentDidMount();
    this.getDetailSite();
    this.getAnnualComparison();
  }

  /**
 * Get detail site
 * @author long.pham 2020-11-12
 * @param id_site, id_customer
 * @return Object
 */
  getDetailSite() {
    let self = this;
    let curItem = this.state.curItem;
    var params = {
      id: curItem.id_site,
      id_customer: curItem.id_customer
    }

    SiteService.instance.getDashboardDetailSite(params, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        self.setState({
          curItem: curItem
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }


  /**
   * Get list annual comparison
   * @author long.pham 2020-11-13
   * @param id_site, id_customer, current_time
   * @return array
   */

  getAnnualComparison() {
    let self = this, { curItem } = this.state;
    var params = {
      id_site: curItem.id_site,
      id_customer: curItem.id_customer,
      offset_timezone: Libs.getOffsetTimeZone(curItem.current_time),
      current_time: Libs.convertAllFormatDate(curItem.current_time)
    }

    SiteService.instance.getAnnualComparison(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataList: data
        }, () => {
          self.loadChartOption();
        });
      } else {
        self.setState({
          dataList: []
        }, () => {
          self.loadChartOption();
        });
      }
    });
  }


  loadChartOption() {
    var { dataList } = this.state;
    var dataSeries = [], yearMin = '', yearMax = '', title = 'Annual Comparison';

    if (Libs.isArrayData(dataList)) {
      dataList.map((item, index) => {
        if(index == 0){ yearMin = item.year};
        yearMax = item.year;
        var itemSeries = {
          name: item.year,
          type: 'line',
          tooltip: {
            valueSuffix: ' MWh'
          },
          data: [item.jan_kwh_total, item.feb_kwh_total, item.mar_kwh_total, item.apr_kwh_total, item.may_kwh_total, item.jun_kwh_total, item.jul_kwh_total, item.aug_kwh_total, item.sep_kwh_total, item.oct_kwh_total, item.nov_kwh_total, item.dec_kwh_total],
          zIndex: -1
        }

        dataSeries.push(itemSeries);
      });
    }

    if(yearMin == yearMax){
      title = title + ' ' + yearMax;
    } else {
      title = title + ' ' + yearMin + ' to ' + yearMax;
    }
    if (Libs.isArrayData(dataSeries)) {
      var chartOption = {
        credits: { enabled: false },
        exporting: { enabled: true },
        title: {
          text: title
        },

        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0,
          showInLegend: false
        },

        colors: ['#ff4800', '#2664c1', '#76c82d', '#ecb346', '#46b1c2'],
        xAxis: {
          title: { text: null, enabled: false },
          alignTicks: false,
          gridLineWidth: 1,
          categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },

        yAxis: [{
          title: { text: 'Total yield [MWh]', enabled: true },
          lineWidth: 1,
          gridLineWidth: 1,
          showEmpty: false,
          labels: {
            enabled: true
          },
        }],

        plotOptions: {
          spline: {
            lineWidth: 3,
            states: {
              hover: {
                lineWidth: 4
              }
            },
            marker: {
              enabled: true
            }
          }
        },

        tooltip: {
          shared: false,
          crosshairs: true
        },
        series: dataSeries
      };
      this.setState({ chartOption: chartOption })
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

