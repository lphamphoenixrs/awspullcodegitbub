import React from 'react';
import CustomerViewJsx from './CustomerView.jsx';
import BaseComponent from '../../BaseComponent';
import './CustomerView.scss';
import CustomerViewService from '../../../services/CustomerViewService';
import Libs from '../../../utils/Libs';
import moment from 'moment';
import Constants from '../../../utils/Constants.js';
const axios = require('axios');
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default class CustomerView extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = CustomerViewJsx;
    this.state = {
      curItem: {},
      dataListSite: [],
      dataExport: [],
      weather: {},
      dataFilter: [
        { id: "today", text: "Today" },
        { id: "this_month", text: "This month" },
        { id: "last_month", text: "Last month" },
        { id: "12_month", text: "Last 12 months" },
        { id: "lifetime", text: "Lifetime" }
      ],

      chartParams: {
        id_site: null,
        id_filter: 'today',
        text_filter: 'Today',
        show_filter: false,
        showNextBtn: false,
        current_time: Libs.getCurrentMMDDYYYYHI(),
        end_date: Libs.getCurrentMMDDYYYYHI(),
        start_date: Libs.getCurrentMMDDYYYYHI()
      },
      showListSite: false
    };
    this.wrapperRef = React.createRef()
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.getListSiteByCustomer();
    let self = this;
    console.log("2021-03-14 02:05:00: ", Libs.getOffsetTimeZone('2021-03-14 02:05:00')); 
    console.log("2021-03-14 01:55:00: ", Libs.getOffsetTimeZone('2021-03-14 01:55:00'));

    console.log("2021-03-14 02:00:00: ", Libs.getOffsetTimeZone('2021-03-14 02:00:00')); 
    console.log("2021-03-14 02:05:00: ", Libs.getOffsetTimeZone('2021-03-14 02:05:00'));

    
    document.addEventListener('click', this.handleClickOutside);
    setInterval(function () {
      self.getDataChart();
    }, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  /**
   * @description Open popup list site
   * @author long.pham 2020-12-08
   */
  openListSitePopup = () => {
    this.setState({
      showListSite: true
    });
  }


  /**
   * @description Close popup list site
   * @author long.pham 2020-12-08
   */
  onCloseListSitePopup = (item, index) => {
    let self = this;
    var { curItem, dataListSite } = this.state;
    if (typeof index === "undefined") {
      this.setState({
        showListSite: false
      });
    } else {
      var findItem = dataListSite[index];
      if (Libs.isObjectEmpty(findItem)) return;
      curItem = Object.assign({}, curItem, findItem);
      self.setState({
        curItem: curItem,
        showListSite: false
      }, () => {
        self.getCustomerViewInfo();
        self.getDataChart();
      });
    }
  }

  /**
   * Get all site by customer
   * @author long.pham 2020-12-08
   * @param id_customer
   */
  getListSiteByCustomer() {
    let self = this, curItem = this.state.curItem, params = {
      id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
    };
    CustomerViewService.instance.getListSiteByCustomer(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        var findItem = Libs.find(data, 'site_default', true);
        if (!Libs.isObjectEmpty(findItem)) {
          curItem = Object.assign(curItem, findItem);
        } else {
          if (!Libs.isObjectEmpty(data[0]) && !Libs.isBlank(data[0].id)) {
            curItem = Object.assign(curItem, data[0]);
          } else {
            curItem = {};
          }
        }

        self.setState({ dataListSite: data, curItem: curItem }, () => {
          self.getCustomerViewInfo();
        });
      } else {
        curItem = {};
        self.setState({ dataListSite: [], curItem: curItem });
      }
    })
  }


  /**
   * Get weather by location
   * @author long.pham 2020-12-08
   * @param {city name},{state code}, {API key} 
   * @return Object
   */

  async getLocationWeather(lat, lon) {
    try {
      const URL = (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Constants.WEATHER_API.KEY}&units=imperial`);
      let response = await axios.get(URL);
      if (response.status === 200) {
        return { success: true, data: response.data };
      }

      return { success: false, error: response.statusText };
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }

  handleClickOutside = (event) => {
    const { target } = event;
    var { chartParams } = this.state, self = this;
    if (!this.wrapperRef.current.contains(target)) {
      if (chartParams.show_filter) {
        chartParams.show_filter = false;
        self.setState({
          chartParams: chartParams
        })
      }

    }
  }


  onClickShowFilter = () => {
    var { chartParams } = this.state;
    chartParams.show_filter = true;
    this.setState({
      chartParams: chartParams
    });
  }

  onClickFilter = (value) => {
    var { chartParams, dataFilter, curItem } = this.state;
    var self = this;
    if (!Libs.isArrayData(dataFilter)) return;
    var item = Libs.find(dataFilter, 'id', value);
    if (Libs.isObjectEmpty(item)) return;

    chartParams.id_filter = item.id;
    chartParams.text_filter = item.text;
    chartParams.show_filter = false;
    chartParams.showNextBtn = false;

    switch (value) {
      case 'today':
        chartParams.start_date = Libs.getCurrentMMDDYYYYHI();
        chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
        break;
      case 'lifetime':
        chartParams.start_date = moment(curItem.commissioning).format('MM/DD/YYYY HH:mm:ss');
        chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
        break;
      case 'this_month':
        chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
        var t = new Date(chartParams.end_date);
        var y = t.getFullYear(), m = t.getMonth();
        chartParams.start_date = moment(new Date(y, m, 1)).format('MM/DD/YYYY HH:mm');
        break;
      case 'last_month':
        var tlast = new Date(Libs.getCurrentMMDDYYYYHI());
        var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
        chartParams.end_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
        chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).format('MM/DD/YYYY HH:mm');
        break;

      case '12_month':
        chartParams.start_date = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -12)).format('MM/DD/YYYY HH:mm:ss');
        chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
        break;
    }

    this.setState({
      chartParams: chartParams
    }, () => {
      self.getDataChart();
    });
  }
  /**
   * Get detail site
   * @author long.pham 2020-12-02
   * @param id_site, id_customer
   * @return Object
   */
  async getCustomerViewInfo() {
    let self = this, curItem = this.state.curItem;
    curItem.current_time = Libs.getCurrentMMDDYYYYHI();
    // curItem.current_time = '2021-01-16 14:26:00';
    curItem.generation_total = 0;
    curItem.lastUpdated = null;

    let params = {
      format_sql_long: Constants.DATE_FORMAT.format_sql_long,
      format_sql_short: Constants.DATE_FORMAT.format_sql_short,
      format_sql_string_long: Constants.DATE_FORMAT.format_sql_string_long,
      format_sql_string_short: Constants.DATE_FORMAT.format_sql_string_short,
      format_sql_string_mdy: Constants.DATE_FORMAT.format_sql_string_mdy,
      current_time: Libs.convertAllFormatDate(curItem.current_time),
      offset_timezone: Libs.getOffsetTimeZone(curItem.current_time),
      id_site: curItem.id,
      id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null,
      id_site_type: curItem.id_site_type
    };


    CustomerViewService.instance.getCustomerViewInfo(params, (data) => {
      if (data) {
        curItem = Object.assign({}, curItem, data);
        self.setState({
          curItem: curItem
        }, () => {
          self.getDataChart();
        });
      }
    });

    if (!Libs.isBlank(curItem.lat) && !Libs.isBlank(curItem.lng)) {
      var weather = await this.getLocationWeather(curItem.lat, curItem.lng);
      if (weather.success) {
        self.setState({
          weather: weather.data
        });
      } else {
        self.setState({
          weather: {}
        });
      }
    }


  }


  onClickNext() {
    var { chartParams } = this.state, self = this;
    var showNextBtn = chartParams.showNextBtn;
    var compareDate = Libs.compareDate(Libs.addDays(chartParams.end_date, 1), 'MM/DD/YYYY', chartParams.current_time);
    switch (chartParams.id_filter) {
      case 'today':
        if (compareDate >= 0) {
          showNextBtn = false;
          chartParams.end_date = Libs.addDays(chartParams.end_date, 1);
          chartParams.start_date = chartParams.end_date;
        } else {
          chartParams.end_date = Libs.addDays(chartParams.end_date, 1);
          chartParams.start_date = chartParams.end_date;
          showNextBtn = true;
        }
        break;

      case 'this_month':
        var tcurrent = new Date(chartParams.end_date);
        var ycurrent = tcurrent.getFullYear(), mcurrent = tcurrent.getMonth();
        if (compareDate > 0) {
          showNextBtn = false;
          chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
          chartParams.start_date = moment(new Date(ycurrent, mcurrent, 1)).format('MM/DD/YYYY HH:mm');
        } else {
          chartParams.end_date = moment(Libs.addMonths(new Date(ycurrent, mcurrent, 1), 1)).endOf('month').format('MM/DD/YYYY HH:mm');
          chartParams.start_date = moment(Libs.addMonths(new Date(ycurrent, mcurrent, 1), 1)).format('MM/DD/YYYY HH:mm');
          showNextBtn = true;
        }

        break;

      case 'last_month':
        var tc = new Date(Libs.getCurrentMMDDYYYYHI());
        var yc = tc.getFullYear(), mc = tc.getMonth();

        if (moment(chartParams.current_time).format('MM/YYYY') == moment(chartParams.end_date).format('MM/YYYY')) {
          showNextBtn = false;
          chartParams.end_date = moment(Libs.addMonths(new Date(yc, mc, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
          chartParams.start_date = moment(Libs.addMonths(new Date(yc, mc, 1), -1)).format('MM/DD/YYYY HH:mm');

        } else {
          var tlast = new Date(chartParams.end_date);
          var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
          chartParams.end_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), 1)).endOf('month').format('MM/DD/YYYY HH:mm');
          chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), 1)).format('MM/DD/YYYY HH:mm');
          showNextBtn = true;
        }

        break;


      case '12_month':
        var tstart = new Date(chartParams.end_date);
        var ystart = tstart.getFullYear(), mstart = tstart.getMonth();
        var compareEndDate = moment(Libs.addMonths(new Date(ystart, mstart, 1), 12)).format('YYYY');
        if (moment(chartParams.current_time).format('YYYY') <= compareEndDate) {
          chartParams.end_date = Libs.getCurrentMMDDYYYYHI();

          var tn = new Date(chartParams.end_date);
          var yn = tn.getFullYear(), mn = tn.getMonth();
          chartParams.start_date = moment(Libs.addMonths(new Date(yn, mn, 1), -12)).format('MM/DD/YYYY HH:mm');
          showNextBtn = false;
        } else {
          var te = new Date(chartParams.end_date);
          var ye = te.getFullYear(), me = te.getMonth();
          chartParams.end_date = moment(Libs.addMonths(new Date(ye, me, 1), 12)).endOf('month').format('MM/DD/YYYY HH:mm');
          var ts = new Date(chartParams.start_date);
          var ys = ts.getFullYear(), ms = ts.getMonth();
          chartParams.start_date = moment(Libs.addMonths(new Date(ys, ms, 1), 12)).format('MM/DD/YYYY HH:mm');
          showNextBtn = true;
        }

        break;
    }
    chartParams.showNextBtn = showNextBtn;
    this.setState({
      chartParams: chartParams
    }, () => {
      self.getDataChart();
    })
  }


  onClickPrev() {
    let self = this;
    var { chartParams } = this.state;
    chartParams.showNextBtn = true;
    var t = new Date(chartParams.end_date);
    var y = t.getFullYear(), m = t.getMonth();
    switch (chartParams.id_filter) {
      case 'today':
        chartParams.end_date = moment(Libs.addDays(chartParams.end_date, -1)).format('MM/DD/YYYY HH:mm:ss');
        chartParams.start_date = chartParams.end_date;
        break;
      case 'last_month':
      case 'this_month':
        chartParams.end_date = moment(Libs.addMonths(new Date(y, m, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
        chartParams.start_date = moment(Libs.addMonths(new Date(y, m, 1), -1)).format('MM/DD/YYYY HH:mm');
        break;
      case '12_month':
        chartParams.end_date = moment(Libs.addMonths(new Date(y, m, 1), -12)).endOf('month').format('MM/DD/YYYY HH:mm');
        var tstart = new Date(chartParams.start_date);
        var ystart = tstart.getFullYear(), mstart = tstart.getMonth();
        chartParams.start_date = moment(Libs.addMonths(new Date(ystart, mstart, 1), -12)).format('MM/DD/YYYY HH:mm');
        break;
    }
    this.setState({
      chartParams: chartParams
    }, () => {
      self.getDataChart();
    })
  }



  /**
   * Get chart data
   * @author long.pham 2020-12-03
   * @param id_site, id_customer
   * @return Object
   */
  getDataChart() {
    var { chartParams, curItem } = this.state, self = this;
    var lastUpdated = null;
    if (Libs.isObjectEmpty(chartParams)) return;

    var params = {};
    params.start_date = Libs.convertAllFormatDate(Libs.dateFormat(chartParams.start_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00");
    if (Libs.dateFormat(chartParams.current_time, "MM/DD/YYYY", "MM/DD/YYYY") == Libs.dateFormat(chartParams.end_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      params.end_date = Libs.convertAllFormatDate(chartParams.end_date); // '2020-11-01 23:59:59';
    } else {
      params.end_date = Libs.convertAllFormatDate(Libs.dateFormat(chartParams.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59");
    }

    // params.start_date = '2020-12-17 00:00:00';
    // params.end_date = '2020-12-17 23:59:59';
    params.id_site = curItem.id;
    params.id_customer = !Libs.isBlank(this.user) ? this.user.id_user : null;
    params.offset_timezone = Libs.getOffsetTimeZone(chartParams.end_date);
    // params.offset_timezone = '-08:00';
    params.filterBy = chartParams.id_filter;
    params.format_sql_long = Constants.DATE_FORMAT.format_sql_long;
    params.id_site_type = curItem.id_site_type;
    // Use only for lifetime
    params.typeView = (moment(curItem.commissioning).format('YYYY') - moment(chartParams.end_date).format('YYYY')) > 3 ? null : 'month';

    CustomerViewService.instance.getDataChart(params, (data) => {
      if (!Libs.isObjectEmpty(data)) {
        var dataListEnergy = data.energy;
        var dataIrradiance = [], dataEnergy = [], categories = [], dataExport = [];
        var generationTotal = 0;
        if (Libs.isArrayData(dataListEnergy)) {
          for (var k = 0; k < dataListEnergy.length; k++) {
            categories.push([dataListEnergy[k].convert_time]);
            if (chartParams.id_filter == 'today' && k == (dataListEnergy.length - 1) && moment(curItem.current_time).format('MM/DD/YYYY') == moment(params.end_date).format('MM/DD/YYYY')) {
              dataEnergy.push([dataListEnergy[k].full_time,  Math.round((curItem.energy_today - generationTotal))]);
              generationTotal = generationTotal + (curItem.energy_today - generationTotal);

            } else {
              generationTotal = generationTotal + dataListEnergy[k].energy_kwh;
              dataEnergy.push([dataListEnergy[k].full_time, dataListEnergy[k].energy_kwh]);
            }

            dataIrradiance.push([dataListEnergy[k].full_time, dataListEnergy[k].avg_sensor1_data]);
            lastUpdated = dataListEnergy[k].last_updated;

            // Generation data export to xlsx
            var itemDataExport = { "DateTime": dataListEnergy[k].download_time, "Energy Output (kW)": dataListEnergy[k].energy_kwh, "Measured Irradiance (w/m2)": dataListEnergy[k].avg_sensor1_data };
            dataExport.push(itemDataExport);

          }
        }

        if (chartParams.id_filter == 'today' && dataEnergy.length < 24) {
          for (var v = dataEnergy.length; v < 24; v++) {
            if (v <= 11) {
              categories.push([v + "AM"]);
              dataEnergy.push([v + "AM", 0]);
              dataIrradiance.push([v + "AM", 0]);
            } else {
              var pm = null;
              if(v < 12){
                pm = v;
              } else if(v == 12) {
                pm = (v);
              } else { 
                pm = v - 12;
              }
              categories.push([pm + "PM"]);
              dataEnergy.push([pm + "PM", 0]);
              dataIrradiance.push([pm + "PM", 0]);
            }
          }
        }
        curItem.generation_total = generationTotal;
        curItem.lastUpdated = lastUpdated;
        self.setState({
          dataCategories: categories,
          dataEnergy: dataEnergy,
          dataIrradiance: dataIrradiance,
          curItem: curItem,
          dataExport: dataExport
        }, () => {
          self.loadChartOption();
        });
      }
    });

  }


  loadChartOption() {
    var chartOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
      title: { text: null },

      chart: {
        height: window.innerWidth <= 1024 ? 300 : null
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 0,
        showInLegend: false
      },
      colors: ['#82cdff', '#f2ae1b'],
      xAxis: [
        {
          title: { text: "Energy Output", enabled: false },
          alignTicks: false,
          gridLineWidth: 1,
          categories: this.state.dataCategories
        },

        {
          title: { text: 'Data', enabled: false },
          tickInterval: 8,
          opposite: true,
          visible: false,
        },

      ],

      yAxis: [{
        min: 0,
        title: {
          text: 'kW',
          enabled: true
        },
        lineWidth: 1,
        gridLineWidth: 1,
        labels: {
          enabled: true
        },
      }, {
        title: { text: 'Watts/meter²', enabled: false },
        lineWidth: 1,
        opposite: true,
        gridLineWidth: 1,
        labels: {
          enabled: false
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

      tooltip: {
        shared: false,
        crosshairs: true
      },
      series: [
        {
          name: "Energy Output",
          type: 'column',
          tooltip: {
            valueSuffix: ' kW'
          },
          data: this.state.dataEnergy,
          zIndex: -1
        },
        {
          name: 'Irradiance',
          type: 'spline',
          xAxis: 1,
          yAxis: 1,
          lineWidth: 3,
          tooltip: {
            valueSuffix: ' W/m²'
          },
          data: this.state.dataIrradiance,
          id: 's1',
          marker: {
            radius: 1.5
          }
        },

      ]
    };

    this.setState({ chartOption: chartOption });
  }


  exportToCSV() {
    let {dataExport} = this.state;
    if (Libs.isArrayData(dataExport)) {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      var Heading = ["DateTime", "Energy Output (kW)", 'Measured Irradiance (w/m2)'];
      const ws = XLSX.utils.json_to_sheet(dataExport, { header: Heading, skipHeader: false });
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "export-generation-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

