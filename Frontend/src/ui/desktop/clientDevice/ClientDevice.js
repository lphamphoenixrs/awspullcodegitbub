import ClientDeviceJsx from './ClientDevice.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientDevice.scss';
import Libs from '../../../utils/Libs';
import moment from 'moment';
import SiteService from '../../../services/SiteService';
import DeviceService from '../../../services/DeviceService';


export default class ClientDevice extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientDeviceJsx;
    var params = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {},
      queryParams: {
        id_site: !Libs.isObjectEmpty(params) ? params.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
      },

      dataListDevice: [],
      dataListReportType: [
        { id: 1, 'text': "Daily report" }, { id: 2, 'text': "Monthly report" }
      ],
      dataChartYear: [],
      dataChartDay: [],
      headersExportYear: [
        {label: 'Id site', key: "id"},
        {label: 'Date', key: "local_time"},
        {label: 'Energy kWh', key: "energy_month_kw"}
      ],

      headersExportDay: [
        {label: 'Id site', key: "id"},
        {label: 'Date', key: "convert_time"},
        {label: 'Energy kWh', key: "hour_kwh_total"},
        {label: 'AC Power', key: "ac_power"},
      ],

      headersExportMonth: [],
      chartDayOption: {},
      chartMonthOption: {},
    };


    this.handleDateInputChange = this.handleDateInputChange.bind(this);

  }
  componentDidMount() {
    super.componentDidMount();
    this.getDetailSite();
  }


  /**
 * Get detail site
 * @author long.pham 2020-11-12
 * @param id_site, id_customer
 * @return Object
 */
  getDetailSite() {
    let self = this, curItem = this.state.curItem, queryParams = this.state.queryParams;

    var params = {
      id: !Libs.isObjectEmpty(queryParams) ? queryParams.id_site : null,
      id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
    }

    SiteService.instance.getDashboardDetailSite(params, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();
        curItem.date_sum = Libs.getCurrentMMDDYYYYHI();
        curItem.date_from = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -12)).format('MM/DD/YYYY HH:mm:ss');
        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        curItem.device = {};
        self.setState({
          curItem: curItem
        }, () => {
          self.getListDeviceByGroupId();
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }


  /**
  * Get list device by device group
  * @author long.pham 2020-11-12
  * @param id_site, id_customer, id_device_group
  * @return array
  */

  getListDeviceByGroupId() {
    let self = this, queryParams = this.state.queryParams;
    var params = {
      id_site: parseInt(queryParams.id_site),
      id_customer: parseInt(queryParams.id_customer),
      id_device_group: 3
    }
    DeviceService.instance.getListDeviceByGroupId(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        data[0].active = 1;
        self.setState({
          dataListDevice: data
        }, () => {
          self.getReportVisualizationDevice();
          self.getReportVisualizationDeviceDay();
        });
      } else {
        self.setState({
          dataListDevice: []
        }, () => {
          self.getReportVisualizationDevice();
          self.getReportVisualizationDeviceDay();
        });
      }
    })
  }

  /**
    * Get list visualization device by month
    * @author long.pham 2020-11-11
    * @param id_site, id_customer, start_date, end_date, id_device
    * @return array
    */

  getReportVisualizationDevice() {
    let self = this, {curItem, dataListDevice, queryParams} = this.state;
    var startDate = Libs.dateFormat(curItem.date_from, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00", endDate = '';
    if (Libs.dateFormat(curItem.date_to, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      endDate = Libs.dateFormat(curItem.date_to, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
    } else {
      endDate = curItem.date_to;
    }
    var findItem = Libs.find(dataListDevice, 'active', 1);
    if (!Libs.isBlank(endDate) && !Libs.isBlank(startDate) && !Libs.isObjectEmpty(findItem)) {
      var params = {
        id_site: queryParams.id_site,
        id_customer: queryParams.id_customer,
        id_device: findItem.id,
        offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
        start_date: Libs.convertAllFormatDate(startDate), // '2020-11-10 00:00:00', 
        end_date: Libs.convertAllFormatDate(endDate), // '2020-11-10 23:59:59',
        format_sql_long: curItem.format_sql_long,
        format_sql_short: curItem.format_sql_short,
        format_sql_string_long: curItem.format_sql_string_long,
        format_sql_string_short: curItem.format_sql_string_short,
        format_sql_string_mdy: curItem.format_sql_string_mdy
      }

      SiteService.instance.getReportVisualizationDevice(params, (data, total_row) => {
        if (Libs.isArrayData(data)) {
          self.setState({
            dataChartYear: data
          }, () => {
            self.loadChartMonthOption();
          });
        } else {
          self.setState({
            dataChartYear: []
          }, () => {
            self.loadChartMonthOption();
          });
        }
      });
    }
  }


  
  /**
    * Get list visualization device by month
    * @author long.pham 2020-11-11
    * @param id_site, id_customer, start_date, end_date, id_device
    * @return array
    */

   getReportVisualizationDeviceDay() {
    let self = this, {curItem, dataListDevice, queryParams} = this.state;
    var startDate = Libs.dateFormat(curItem.date_sum, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00", endDate = '';
    if (Libs.dateFormat(curItem.date_sum, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      endDate = Libs.dateFormat(curItem.date_sum, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
    } else {
      endDate = curItem.date_sum;
    }

    var findItem = Libs.find(dataListDevice, 'active', 1);
    if (!Libs.isBlank(endDate) && !Libs.isBlank(startDate) && !Libs.isObjectEmpty(findItem)) {
      var params = {
        id_site: queryParams.id_site,
        id_customer: queryParams.id_customer,
        id_device: findItem.id,
        offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
        start_date: Libs.convertAllFormatDate(startDate), // '2020-11-10 00:00:00', 
        end_date: Libs.convertAllFormatDate(endDate), // '2020-11-10 23:59:59',
        format_sql_long: curItem.format_sql_long,
        format_sql_short: curItem.format_sql_short,
        format_sql_string_long: curItem.format_sql_string_long,
        format_sql_string_short: curItem.format_sql_string_short,
        format_sql_string_mdy: curItem.format_sql_string_mdy
      }

      SiteService.instance.getReportVisualizationDeviceDay(params, (data, total_row) => {
        if (Libs.isArrayData(data)) {
          self.setState({
            dataChartDay: data
          }, () => {
            self.loadChartDayOption();
          });
        } else {
          self.setState({
            dataChartDay: []
          }, () => {
            self.loadChartDayOption();
          });
        }
      });
    }
  }


  /**
  * handle check element
  * @param {*} content 
  * @param {*} props 
  */
  handleDeviceChange = (index) => {
    let self = this;
    var dataListDevice = this.state.dataListDevice, curItem = this.state.curItem;
    if (!Libs.isArrayData(dataListDevice)) return;
    var item = dataListDevice[index];
    if (Libs.isObjectEmpty(item)) return;

    curItem.device = item;
    dataListDevice.map((rowItem, i) => {
      if (i == index) {
        dataListDevice[i].active = 1;
      } else {
        dataListDevice[i].active = 0;
      }
    });

    this.setState({
      dataListDevice: dataListDevice,
      curItem: curItem
    }, () => {
      self.getReportVisualizationDevice();
    });
  }



  handleDateInputChange(event) {
    let self = this;
    let target = event.target;
    let name = target.name;
    let value = target.value
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.curItem;
      if (name == 'date_from') {
        item.date_to = moment(Libs.addMonths(value, +12)).format('MM/DD/YYYY HH:mm:ss');
      }

      if (name == 'date_to') {
        item.date_from = moment(Libs.addMonths(value, -12)).format('MM/DD/YYYY HH:mm:ss');
      }

      item[name] = value;
      this.setState({
        curItem: item
      }, () => {
        if (name == 'date_from' || name == 'date_to') {
          self.getReportVisualizationDevice();
        } else if (name == 'date_sum') {
          self.getReportVisualizationDeviceDay();
        }
      });
    }
  }

  loadChartDayOption() {
    var {curItem, dataChartDay} = this.state;
    var categories = [], dataSeries = [], xAxisTitle = '', dataSeriesPower = [];
    if (Libs.isArrayData(dataChartDay)) {
      dataChartDay.map((item, index) => {
        if (index == 0) {
          xAxisTitle = item.xAxisTitle;
        }
        categories.push(item.hour_time);
        dataSeries.push([item.tooltip_date, item.hour_kwh_total]);
        dataSeriesPower.push([item.tooltip_date, item.ac_power]);
      });
    }

    var chartDayOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
      chart: {
        height: 300
      },
      title: {
        text: xAxisTitle,
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
          tickInterval: 1,
          categories: categories,
        },
      ],

      yAxis: [{
        title: { text: '[kWh] Merter change', enabled: true },
        lineWidth: 1,
        gridLineWidth: 1,
        labels: {
          enabled: true
        },
      },
      {
        title: { text: '[kW] mean values', enabled: true },
        opposite: true,
        lineWidth: 1,
        gridLineWidth: 1,
        min: 0,
        labels: {
          enabled: true
        },
      }
      ],


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
          name: 'Total yield',
          type: 'column',
          tooltip: {
            valueSuffix: ' [kWh]'
          },
          data: dataSeries,
          zIndex: -1
        },

        {
          name: 'Power',
          type: 'line',
          yAxis: 1,
          tooltip: {
            valueSuffix: ' [kW]'
          },
          data: dataSeriesPower,
          zIndex: -1
        },

      ]
    };
    this.setState({ chartDayOption: chartDayOption, curItem: curItem })
  }



  loadChartMonthOption() {
    var { dataChartYear } = this.state;
    var categories = [], dataSeries = [], xAxisTitle = '';
    if (Libs.isArrayData(dataChartYear)) {
      dataChartYear.map((item, index) => {
        if (index == 0) {
          xAxisTitle = item.xAxisTitle;
        }
        categories.push(item.convert_time);
        dataSeries.push([item.full_time, item.energy_month_kw]);
      });
    }


    var chartMonthOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
      chart: {
        height: 300
      },
      title: {
        text: xAxisTitle,
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
          title: { text: '', enabled: false },
          lineWidth: 1,
          gridLineWidth: 1,
          alignTicks: true,
          tickInterval: 1,
          categories: categories
        },
      ],

      yAxis: [{
        title: { text: '[kWh] Meter change', enabled: true },
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
          name: 'Total yield',
          type: 'column',
          tooltip: {
            valueSuffix: ' [kWh]'
          },
          data: dataSeries,
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

