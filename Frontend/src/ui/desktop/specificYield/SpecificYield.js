import SpecificYieldJsx from './SpecificYield.jsx';
import BaseComponent from '../../BaseComponent';
import './SpecificYield.scss';
import Libs from '../../../utils/Libs';
import SiteService from '../../../services/SiteService';
import moment from 'moment';

export default class SpecificYield extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = SpecificYieldJsx;
    var params = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {},
      queryParams: {
        id_site: !Libs.isObjectEmpty(params) ? params.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
      },

      dataSpecificYieldMonth: [],
      dataSpecificYieldYear: []
    };


    this.handleDateInputChange = this.handleDateInputChange.bind(this);

  }
  componentDidMount() {
    super.componentDidMount();
    this.getDetailSite();
  }

  /**
   * Get detail site
   * @author long.pham 2020-11-10
   * @param id_site, id_customer
   * @return Object
   */
  getDetailSite() {
    let self = this;
    let {curItem, queryParams} = this.state;
    var params = {
      id: queryParams.id_site,
      id_customer: queryParams.id_customer
    }

    SiteService.instance.getDashboardDetailSite(params, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();
        curItem.date_to_day = Libs.getCurrentMMDDYYYYHI();
        curItem.date_to_month = Libs.getCurrentMMDDYYYYHI();
        curItem.max_date_from_day = Libs.addMonths(curItem.date_to_day, -1);
        curItem.date_from_day = Libs.addMonths(curItem.date_to_day, -1);
        curItem.max_date_from_month = Libs.addMonths(curItem.date_to_month, -12);
        curItem.date_from_month = Libs.addMonths(curItem.date_to_month, -12);
        
        self.setState({
          curItem: curItem
        }, () => {
          self.getSpecificYieldMonth();
          self.getSpecificYieldYear();
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }


  /**
 * Get list specific yield month
 * @author long.pham 2020-11-10
 * @return array
 */

  getSpecificYieldMonth() {
    let self = this, {curItem, queryParams} = this.state;
    var startDate = Libs.dateFormat(curItem.date_from_day, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00";
    var endDate = '';
    if (Libs.dateFormat(curItem.date_to_day, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      endDate = Libs.dateFormat(curItem.date_to_day, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
    } else {
      endDate = curItem.date_to_day;
    }
    if (!Libs.isBlank(endDate) && !Libs.isBlank(startDate)) {
      var params = {
        id: queryParams.id_site,
        id_customer: queryParams.id_customer,
        offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
        start_date: Libs.convertAllFormatDate(startDate),
        end_date: Libs.convertAllFormatDate(endDate),
        format_sql_long: curItem.format_sql_long,
        format_sql_short: curItem.format_sql_short,
        format_sql_string_long: curItem.format_sql_string_long,
        format_sql_string_short: curItem.format_sql_string_short,
        format_sql_string_mdy: curItem.format_sql_string_mdy
      }
      SiteService.instance.getSpecificYieldMonth(params, (data, total_row) => {
        if (Libs.isArrayData(data)) {
          self.setState({
            dataSpecificYieldMonth: data
          }, () => {
            self.loadChartDayOption();
          });
        } else {
          self.setState({
            dataSpecificYieldMonth: []
          }, () => {
            self.loadChartDayOption();
          });
        }
      });
    }

  }

  /**
    * Get list specific yield year
    * @author long.pham 2020-11-10
    * @return array
    */

  getSpecificYieldYear() {
    let self = this, {curItem, queryParams} = this.state;
    var startDate = Libs.dateFormat(curItem.date_from_month, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00";
    var endDate = '';
    if (Libs.dateFormat(curItem.date_to_month, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      endDate = moment(curItem.date_to_month).endOf('month').format('MM/DD/YYYY hh:mm');
    } else {
      endDate = curItem.date_to_month;
      
    }

    if (!Libs.isBlank(endDate) && !Libs.isBlank(startDate)) {
      var params = {
        id: queryParams.id_site,
        id_customer: queryParams.id_customer,
        offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
        start_date: Libs.convertAllFormatDate(startDate),
        end_date: Libs.convertAllFormatDate(endDate),
        format_sql_long: curItem.format_sql_long,
        format_sql_short: curItem.format_sql_short,
        format_sql_string_long: curItem.format_sql_string_long,
        format_sql_string_short: curItem.format_sql_string_short,
        format_sql_string_mdy: curItem.format_sql_string_mdy
      }
      
      SiteService.instance.getSpecificYieldYear(params, (data, total_row) => {
        if (Libs.isArrayData(data)) {
          self.setState({
            dataSpecificYieldYear: data
          }, () => {
            self.loadChartMonthOption();
          });
        } else {
          self.setState({
            dataSpecificYieldYear: []
          }, () => {
            self.loadChartMonthOption();
          });
        }
      });
    }
  }


  handleDateInputChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value, self = this;
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.curItem;
      if (name == 'date_from_day') {
        item.date_to_day = moment(Libs.addMonths(value, +1)).format('MM/DD/YYYY HH:mm:ss');
      }
      if (name == 'date_to_day') {
        item.max_date_from_day = moment(Libs.addMonths(value, -1)).format('MM/DD/YYYY HH:mm:ss');
        item.date_from_day = moment(Libs.addMonths(value, -1)).format('MM/DD/YYYY HH:mm:ss');
      }

      if (name == 'date_from_month') {
        item.date_to_month = moment(Libs.addMonths(value, +12)).format('MM/DD/YYYY HH:mm:ss');
      }
      if (name == 'date_to_month') {
        item.max_date_from_month = moment(Libs.addMonths(value, -12)).format('MM/DD/YYYY HH:mm:ss');
        item.date_from_month = moment(Libs.addMonths(value, -12)).format('MM/DD/YYYY HH:mm:ss');
      }

      item[name] = value;
      this.setState({
        curItem: item
      }, () => {
        if(name == 'date_from_day' || name == 'date_to_day'){
          self.getSpecificYieldMonth();
        }

        if(name == 'date_from_month' || name == 'date_to_month'){
          self.getSpecificYieldYear();
        }
        
      });
    }
  }

  loadChartDayOption() {
    var { dataSpecificYieldMonth } = this.state;

    var categories = [], dataDays = [], title = '';
    if (Libs.isArrayData(dataSpecificYieldMonth)) {
      dataSpecificYieldMonth.map((item, index) => {
        if (index == 0) {
          title = item.xAxisTitle;
        }
        categories.push(item.convert_time);
        dataDays.push([item.convert_time, item.energy_day_kw]);
      });
    }

    var chartDayOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
      title: {
        text: title,
        style: {
          fontSize: "14px"
        }
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 0,
        showInLegend: false
      },

      colors: ['#2491d8', '#ca5952', '#f2bb46'],
      xAxis: [
        {
          title: { text: 'Data', enabled: false },
          lineWidth: 1,
          gridLineWidth: 1,
          alignTicks: true,
          tickInterval: 2,
          categories: categories
        },
      ],

      yAxis: [{
        title: { text: '[kWh/kWp] mean values', enabled: true },
        lineWidth: 1,
        gridLineWidth: 1,
        labels: {
          enabled: true
        },
      }],

      plotOptions: {
        plotOptions: {
          series: {
            marker: {
              enabled: true
            }
          }
        }
      },

      series: [
        {
          name: 'Specific yield PV system',
          type: 'column',
          tooltip: {
            valueSuffix: ' [kWh/kWp]'
          },
          data: dataDays,
          zIndex: -1
        },

      ]
    };
    this.setState({ chartDayOption: chartDayOption })
  }


  loadChartMonthOption() {
    var { dataSpecificYieldYear } = this.state;

    var categories = [], dataMonths = [], title = '';
    if (Libs.isArrayData(dataSpecificYieldYear)) {
      dataSpecificYieldYear.map((item, index) => {
        if (index == 0) {
          title = item.xAxisTitle;
        }
        categories.push(item.convert_time);
        dataMonths.push([item.convert_time, item.energy_month_kw]);
      });
    }
    var chartMonthOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
      title: {
        text: title,
        style: {
          fontSize: "14px"
        }
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 0,
        showInLegend: false
      },

      colors: ['#2491d8', '#ca5952', '#f2bb46'],
      xAxis: [
        {
          title: { text: 'From 09/01/2019 to 08/31/2020', enabled: false },
          lineWidth: 1,
          gridLineWidth: 1,
          alignTicks: true,
          categories: categories
        },
      ],

      yAxis: [{
        title: { text: '[kWh/kWp] mean values', enabled: true },
        lineWidth: 1,
        gridLineWidth: 1,
        labels: {
          enabled: true
        },
      }],

      plotOptions: {
        plotOptions: {
          series: {
            marker: {
              enabled: true
            }
          }
        }
      },

      series: [
        {
          name: 'Specific yield PV system',
          type: 'column',
          tooltip: {
            valueSuffix: ' [kWh/kWp]'
          },
          data: dataMonths,
          zIndex: -1
        },

      ]
    };
    this.setState({ chartMonthOption: chartMonthOption })
  }




  render() {
    return this.jsxTemplate.call(this);
  }
}

