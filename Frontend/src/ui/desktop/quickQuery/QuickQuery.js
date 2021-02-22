import QuickQueryJsx from './QuickQuery.jsx';
import BaseComponent from '../../BaseComponent';
import './QuickQuery.scss';
import Libs from '../../../utils/Libs';
import DeviceTypeService from '../../../services/DeviceTypeService';
import DeviceService from '../../../services/DeviceService';
import DeviceParameterService from '../../../services/DeviceParameterService';
import SiteService from '../../../services/SiteService';

export default class QuickQuery extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = QuickQueryJsx;
    var params = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      queryParams: {
        id_site: !Libs.isObjectEmpty(params) ? params.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
      },
      curItem: {},
      mode: true,
      dataHourFilter: [],
      showFilter: false,
      searchParam: {
        limit: Constants.COMMON.LIMIT,
        offset: 0,
        index: 1,
      },
      chartOption: {},
      showMap: false,
      dataListDeviceType: [],
      dataListDevice: [],
      dataListParameter: [],
      dataChart: []
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
        var d = new Date();
        curItem.max_date = Libs.getCurrentMMDDYYYYHI();
        curItem.timeActive = "hour";
        curItem.viewActive = "chart";
        curItem.time_filter = d.getHours();
        curItem.start_date = Libs.getCurrentMMDDYYYYHI();
        curItem.end_date = Libs.getCurrentMMDDYYYYHI();
        curItem.id_device_list = [];

        self.setState({
          curItem: curItem,
          dataHourFilter: Libs.generateListHour(curItem.end_date, 'MM/DD/YYYY', '/')
        }, () => {
          self.getListDeviceType();
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }

  /**
  * handle click change element type
  * @param {*} content 
  * @param {*} props 
  */
  handleDateInputChange(event) {
    let target = event.target, self = this;
    let name = target.name;
    let value = target.value
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.curItem;
      var dataHourFilter = this.state.dataHourFilter;
      if (name == 'end_date') {
        dataHourFilter = Libs.generateListHour(value, 'MM/dd/yyyy', '/')
      }

      item[name] = value;
      this.setState({
        curItem: item,
        dataHourFilter: dataHourFilter,
        dataListParameter: name == 'id_device_type' ? []: this.state.dataListParameter
      }, () => {
        if (name == 'id_device_type') {
          self.getListByDeviceType();
        }
        if (name == 'end_date' || name == 'time_filter') {
          self.loadDataChartQuickQuery();
        }
      });
    }
  }



  /**
  * Get list device type
  * @author long.pham 2020-11-06
  * @return array
  */

  getListByDeviceType() {
    let self = this, {curItem, queryParams} = this.state;
    var params = {
      id_site: parseInt(queryParams.id_site),
      id_customer: parseInt(queryParams.id_customer),
      id_device_type: parseInt(curItem.id_device_type)
    }
    DeviceService.instance.getListByDeviceType(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataListDevice: data
        });
      } else {
        self.setState({
          dataListDevice: []
        });
      }
    })
  }


  /**
  * Get list parameter by device
  * @author long.pham 2020-11-06
  * @return array
  */

  getListParameterByDevice() {
    let self = this, curItem = this.state.curItem;
    if (!Libs.isBlank(curItem.id_device)) {
      var params = {
        id_device: curItem.id_device
      }
      DeviceParameterService.instance.getListParameterByDevice(params, (data, total_row) => {
        if (Libs.isArrayData(data)) {
          self.setState({
            dataListParameter: data
          });
        } else {
          self.setState({
            dataListParameter: []
          });
        }
      });
    } else {
      self.setState({
        dataListParameter: []
      });
    }

  }


  /**
  * Get list device type
  * @author long.pham 2020-11-06
  * @return array
  */

  getListDeviceType() {
    let self = this;
    DeviceTypeService.instance.getList({}, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataListDeviceType: data,
          showFilter: true
        });
      } else {
        self.setState({
          dataListDeviceType: []
        });
      }
    })
  }


  /**
  * handle check element
  * @param {*} content 
  * @param {*} props 
  */
  handleElementChange = (index) => {
    let self = this;
    var data = self.state.dataListDevice, curItem = this.state.curItem;
    var item = data[index];
    if (Libs.isObjectEmpty(item)) return;
    curItem.id_device = item.id;
    this.setState({
      curItem: curItem
    }, () => {
      self.getListParameterByDevice();
    });
  }


  /**
  * handle check parameter
  * @param {*} content 
  * @param {*} props 
  */
  handleParameterChange = (index) => {
    let self = this;
    var data = self.state.dataListParameter;
    var item = data[index];
    if (Libs.isObjectEmpty(item)) return;
    var listParameterActive = data.filter((v) => v.active == 1);
    if (listParameterActive.length >= 5) {
      if (data[index].active == 0) {
        self.toast('Maximum 5 parameter', 'error'); return;
      }
    }

    data[index].active = data[index].active == 1 ? 0 : 1;

    this.setState({
      dataListParameter: data
    });
  }


  /**
  * handle production hquivalences change date
  * @param {*} content 
  * @param {*} props 
  */
  onClickShowFilter() {
    let chartOption = this.state.chartOption;
    let dataElementType = this.state.dataElementType;
    this.setState({
      showFilter: this.state.showFilter ? false : true,
      chartOption: chartOption,
      dataElementType: dataElementType,
      dataListParameter: this.state.dataListParameter
    });

  }



  /**
  * handle on click btn search
  * @param {*} content 
  * @param {*} props 
  */
  onSearch() {
    var dataListParameter = this.state.dataListParameter;
    var find = Libs.find(dataListParameter, 'active', 1);
    if (Libs.isObjectEmpty(find)) return;

    // Call api get data
    this.loadDataChartQuickQuery();
  }

  /**
  * @description Load data chart quick query
  * @author Long.Pham 2020-1-09
  * @param {*} content 
  * @param {*} props 
  */
  loadDataChartQuickQuery() {
    var self = this, {curItem, queryParams, dataListParameter } = this.state, endDate = '', startDate = '';
    var find = Libs.find(dataListParameter, 'active', 1);
    if (Libs.isObjectEmpty(find)) return;

    // Call api get data
    var dataHourFilter = this.state.dataHourFilter;
    var findItem = Libs.find(dataHourFilter, 'id', curItem.time_filter);
    var timeActive = curItem.timeActive;
    if (timeActive == 'allDate') {
      startDate = Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00";

      if (Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
        endDate = Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
      } else {
        endDate = curItem.end_date;
      }
    } else if (timeActive == 'hour' && !Libs.isObjectEmpty(findItem)) {
      if (findItem.id == 0) {
        startDate = Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00";
        endDate = Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:59";
      } else {
        startDate = Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " " + findItem.text;
        endDate = Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " " + findItem.id + ":59";
      }
    }

    var params = {
      device_type: curItem.id_device_type,
      id: queryParams.id_site,
      id_customer: queryParams.id_customer,
      id_device: curItem.id_device,
      start_date: Libs.convertAllFormatDate(startDate),
      end_date: Libs.convertAllFormatDate(endDate),
      offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
      format_sql_long: curItem.format_sql_long,
      format_sql_short: curItem.format_sql_short,
      format_sql_string_long: curItem.format_sql_string_long,
      format_sql_string_short: curItem.format_sql_string_short,
      format_sql_string_mdy: curItem.format_sql_string_mdy
    };

    SiteService.instance.getListReportQuickQuery(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          dataChart: data
        }, () => {
          self.loadChartOption();
        });
      } else {
        self.setState({
          dataChart: []
        }, () => {
          self.loadChartOption();
        });
      }
    });
  }


  /**
  * handle production hquivalences change date
  * @param {*} content 
  * @param {*} props 
  */
  onChangeHour(index) {
    var curItem = this.state.curItem, self = this;
    switch (index) {
      case "hour":
        curItem.timeActive = "hour";
        break;
      case "allDate":
        curItem.timeActive = "allDate";
        break;
    }
    this.setState({
      curItem: curItem
    }, () => {
      self.loadDataChartQuickQuery();
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
      case "table":
        curItem.viewActive = "table";
        break;
      case "chart":
        curItem.viewActive = "chart";
        break;
    }
    this.setState({
      curItem: curItem
    }, () => {
      self.loadChartOption();
    });
  }


  loadChartOption() {
    var dataChart = this.state.dataChart, dataListParameter = this.state.dataListParameter, curItem = this.state.curItem, timeActive = curItem.timeActive;
    var dataListParameterActive = dataListParameter.filter((item) => item.active == 1);
    var series = [], categories = [], yAxis = [];

    if (Libs.isArrayData(dataChart) && Libs.isArrayData(dataListParameterActive)) {
      dataListParameterActive.map((item, index) => {
        // Generate yAxis 
        var yAxisItem = {
          title: { text: item.devicename, enabled: false },
          lineWidth: 1,
          gridLineWidth: 1,
          labels: {
            enabled: true,
            formatter: function () {
              return !Libs.isBlank(item.unit) ? (this.value + " " + item.unit) : this.value
            }
          },
        };
        yAxis.push(yAxisItem);

        // Generate categories 
        var dataItem = [];
        dataChart.map((v, k) => {
          dataItem.push([v.local_hour, v[item.slug]]);
          categories.push(v.local_hour);
        });

        // Push data to chart
        if (Libs.isArrayData(dataItem)) {
          var itemSeries = {
            name: item.devicename + ' - ' + item.name,
            type: Libs.isBlank(item.chart_type) ? item.chart_type : "spline",
            tooltip: {
              valueSuffix: ' ' + !Libs.isBlank(item.unit) ? item.unit : ''
            },
            data: dataItem,
            yAxis: index,
            zIndex: -1,
            marker: {
              radius: 1.5
            }
          };

          series.push(itemSeries);
        }

      });
    }

    var chartOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
      title: {
        text: null
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 0,
        showInLegend: false
      },

      colors: ['#ca5952', '#2491d8', '#f2bb46', '#FFFF00', '#0000FF', '#04B404'],
      xAxis: [
        {
          title: { text: 'Data', enabled: false },
          alignTicks: true,
          tickInterval: timeActive == 'hour' ? 1 : 24,
          categories: categories
        },
      ],
      yAxis: yAxis,
      plotOptions: {
        plotOptions: {
          series: {
            marker: {
              enabled: true
            }
          }
        }
      },
      series: series
    };
    this.setState({ chartOption: chartOption })
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

