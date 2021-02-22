import React, { Component } from 'react'
import Libs from '../../../utils/Libs.js';
import ClientMiniJsx from './ClientMini.jsx';
const moment = require("moment");
import './ClientMini.scss';
import MiniSiteService from '../../../services/MiniSiteService';
import { cloneDeep } from 'lodash-es';

export default class ClientMini extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientMiniJsx;
    var queryParams = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {
        id: !Libs.isObjectEmpty(queryParams) ? queryParams.id : null,
        current_time: Libs.getCurrentMMDDYYYYHI(),
        end_date: Libs.getCurrentMMDDYYYYHI(),
        start_date: Libs.getCurrentMMDDYYYYHI()
      },
      paramsFilter: {
        filterBy: 'day'
      },

      dataEnergy: [],
      titleEnergy: "",
      xAxisTitle: null,
      dataCategories: [],
      dataIrradiance: [],
      dataPower: [],
      ourImpact: 2,
      showNextBtn: false,
      chartOption: {},
      dataList: [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }
      ],
      dataFilter: [
        { id: 1, text: "Name" },
        { id: 2, text: "Alerts" },
        { id: 3, text: "DC Capacity" },
        { id: 4, text: "Power" },
        { id: 5, text: "Irradiance" },
        { id: 6, text: "Energy Today" },
        { id: 7, text: "Energy Lifetime" },
        { id: 8, text: "EER Last Month" },
        { id: 9, text: "EER This Month" }

      ]
    };

    this.param = {
      index: 1,
      offset: 0,
      limit: Constants.COMMON.PER_PAGE
    };

    this.pagging = {
      total: 10,
      current: 1
    }
  }
  componentDidMount() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
    let curItem = this.state.curItem;
    curItem.current_date = new Date(y, m, d, 0, 0, 0);
    const height = document.getElementById('operating_container').clientHeight;
    this.setState({ height: height, curItem: curItem });
    this.loadChartOption();
    this.getMiniSiteInfo();
    this.getChartInverterPerformance();
  }

  /**
   * Get detail site
   * @author long.pham 2020-10-30
   * @param id_site, id_customer
   * @return Object
   */
  getMiniSiteInfo() {
    let self = this, curItem = this.state.curItem;
    let params = cloneDeep(this.state.curItem);
    params.end_date = Libs.convertAllFormatDate(params.end_date);
    params.offset_timezone = Libs.getOffsetTimeZone(params.end_date);
    params.format_sql_long = curItem.format_sql_long;
    params.format_sql_short = curItem.format_sql_short;
    params.format_sql_string_long = curItem.format_sql_string_long;
    params.format_sql_string_short = curItem.format_sql_string_short;
    params.format_sql_string_mdy = curItem.format_sql_string_mdy;

    MiniSiteService.instance.getMiniSiteInfo(params, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        self.setState({
          curItem: curItem
        });
      }
    });
  }

  /**
 * Get mini site inverter performance
 * @author long.pham 2020-10-04
 * @param id_site
 * @return Object
 */
  getChartInverterPerformance() {
    let self = this;
    let curItem = this.state.curItem, paramsFilter = this.state.paramsFilter;
    paramsFilter.id = curItem.id;
    paramsFilter.start_date = Libs.convertAllFormatDate(Libs.dateFormat(curItem.start_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00");
    // paramsFilter.start_date = "2020-11-02 00:00:00";
    if (Libs.dateFormat(curItem.current_time, "MM/DD/YYYY", "MM/DD/YYYY") == Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      paramsFilter.end_date = Libs.convertAllFormatDate(curItem.end_date); // '2020-11-01 23:59:59';
    } else {
      paramsFilter.end_date = Libs.convertAllFormatDate(Libs.dateFormat(curItem.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59");
    }
    paramsFilter.offset_timezone = Libs.getOffsetTimeZone(curItem.end_date);

    MiniSiteService.instance.getChartInverterPerformance(paramsFilter, (data) => {
      if (!Libs.isObjectEmpty(data)) {

        var dataIrradiance = [], dataPower = [], dataEnergy = [], categories = [], titleEnergy = "", xAxisTitle = null;
        switch (paramsFilter.filterBy) {
          case "threeDay":
            if (Libs.isArrayData(data.irradiance)) {
              var dataListIrradiance = data.irradiance;
              for (var j = 0; j < dataListIrradiance.length; j++) {
                if (j == 0) { xAxisTitle = dataListIrradiance[j].xAxisTitle; }
                var itemArr = [Date.parse(dataListIrradiance[j].string_time + " UTC"), dataListIrradiance[j].sensor1_data < 0 ? 0 : dataListIrradiance[j].sensor1_data];
                dataIrradiance.push(itemArr);
              }
            }

            if (Libs.isArrayData(data.energy)) {
              var dataListThreeDayEnergy = data.energy;
              for (var k = 0; k < dataListThreeDayEnergy.length; k++) {
                if (k == 0) {
                  titleEnergy = dataListThreeDayEnergy[k].devicename;
                } else {
                  if (dataListThreeDayEnergy[k].ytd_kwh_total <= 0 || dataListThreeDayEnergy[k - 1].ytd_kwh_total <= 0) {
                    dataEnergy.push([Date.parse(dataListThreeDayEnergy[k].string_time + " UTC"), 0]);
                  } else {
                    var energy = (dataListThreeDayEnergy[k].ytd_kwh_total - dataListThreeDayEnergy[k - 1].ytd_kwh_total) < 0 ? 0 : Libs.round(dataListThreeDayEnergy[k].ytd_kwh_total - dataListThreeDayEnergy[k - 1].ytd_kwh_total, 2);
                    dataEnergy.push([Date.parse(dataListThreeDayEnergy[k].string_time + " UTC"), energy]);
                  }
                  //ac_power 
                  var itemArrPower = [Date.parse(dataListThreeDayEnergy[k].string_time + " UTC"), dataListThreeDayEnergy[k].ac_power < 0 ? 0 : dataListThreeDayEnergy[k].ac_power];
                  dataPower.push(itemArrPower);
                }

              }
            }

            break;
          case "month":
            if (Libs.isArrayData(data.energy)) {
              var dataListMonth = data.energy;
              for (var m = 0; m < dataListMonth.length; m++) {
                if (m == 0) { titleEnergy = dataListMonth[m].devicename; xAxisTitle = dataListMonth[m].xAxisTitle; }
                categories.push(dataListMonth[m].convert_time);
                // Energy
                dataEnergy.push([dataListMonth[m].full_time, dataListMonth[m].energy_month_kw]);
                // Power
                dataPower.push([dataListMonth[m].full_time, dataListMonth[m].avg_ac_power]);
                // Irradiance
                dataIrradiance.push([dataListMonth[m].full_time, dataListMonth[m].avg_month_sensor1_data]);
              }
            }

            break;
          case "year":
            if (Libs.isArrayData(data.energy)) {
              var dataListYear = data.energy;
              for (var n = 0; n < dataListYear.length; n++) {
                if (n == 0) { titleEnergy = dataListYear[n].devicename; xAxisTitle = dataListYear[n].xAxisTitle; }
                categories.push(dataListYear[n].convert_time);
                // Energy
                dataEnergy.push([dataListYear[n].full_time, dataListYear[n].energy_month_kw]);
                // Power
                dataPower.push([dataListYear[n].full_time, dataListYear[n].avg_ac_power]);
                // Irradiance
                dataIrradiance.push([dataListYear[n].full_time, dataListYear[n].avg_month_sensor1_data]);
              }
            }
            break;
          case "lifetime":
            if (Libs.isArrayData(data.energy)) {
              var dataListLifetime = data.energy;
              for (var h = 0; h < dataListLifetime.length; h++) {
                if (h == 0) { titleEnergy = dataListLifetime[h].devicename; xAxisTitle = dataListLifetime[h].xAxisTitle }
                categories.push(dataListLifetime[h].convert_time);
                // Energy
                dataEnergy.push([dataListLifetime[h].full_time, dataListLifetime[h].energy_month_kw]);
                // Power
                dataPower.push([dataListLifetime[h].full_time, dataListLifetime[h].avg_ac_power]);
                // Irradiance
                dataIrradiance.push([dataListLifetime[h].full_time, dataListLifetime[h].avg_month_sensor1_data]);
              }
            }
            break;
          default:
            if (Libs.isArrayData(data.irradiance)) {
              var dataListDayIrradiance = data.irradiance;
              for (var i = 0; i < dataListDayIrradiance.length; i++) {
                if (i == 0) { xAxisTitle = dataListDayIrradiance[i].xAxisTitle; }
                dataIrradiance.push([dataListDayIrradiance[i].time, dataListDayIrradiance[i].sensor1_data < 0 ? 0 : dataListDayIrradiance[i].sensor1_data]);
              }
            }

            if (Libs.isArrayData(data.energy)) {
              var dataListEnergy = data.energy;
              for (var u = 0; u < dataListEnergy.length; u++) {
                if (u == 0) {
                  titleEnergy = dataListEnergy[u].devicename;
                  categories.push([dataListEnergy[u].time]);
                } else {
                  if (dataListEnergy[u].ytd_kwh_total <= 0 || dataListEnergy[u - 1].ytd_kwh_total <= 0) {
                    dataEnergy.push([0]);
                  } else {
                    dataEnergy.push([(dataListEnergy[u].ytd_kwh_total - dataListEnergy[u - 1].ytd_kwh_total) < 0 ? 0 : Libs.round(dataListEnergy[u].ytd_kwh_total - dataListEnergy[u - 1].ytd_kwh_total, 2)]);
                  }
                  categories.push([dataListEnergy[u].time]);

                  //ac_power 
                  dataPower.push([dataListEnergy[u].time, dataListEnergy[u].ac_power < 0 ? 0 : dataListEnergy[u].ac_power]);
                }

              }
            }

            break;
        }

        self.setState({
          dataCategories: categories,
          dataIrradiance: dataIrradiance,
          dataPower: dataPower,
          dataEnergy: dataEnergy,
          titleEnergy: titleEnergy,
          xAxisTitle: xAxisTitle
        }, () => {
          self.loadChartOption();
        });
      }
    });
  }


  onClickNext() {
    var curItem = this.state.curItem, self = this, filterBy = this.state.paramsFilter.filterBy, showNextBtn = this.state.showNextBtn;
    var compareDate = Libs.compareDate(Libs.addDays(curItem.end_date, 1), 'MM/DD/YYYY', curItem.current_date);
    switch (filterBy) {
      case 'day':
        if (compareDate >= 0) {
          showNextBtn = false;
          curItem.end_date = Libs.addDays(curItem.end_date, 1);
          curItem.start_date = curItem.end_date;
        } else {
          curItem.end_date = Libs.addDays(curItem.end_date, 1);
          curItem.start_date = curItem.end_date;
          showNextBtn = true;
        }

        break;

      case 'threeDay':
        if (compareDate > 0) {
          showNextBtn = false;
          curItem.end_date = Libs.addDays(curItem.end_date, 1);
          curItem.start_date = Libs.addDays(curItem.start_date, 1);
        } else {
          curItem.end_date = Libs.addDays(curItem.end_date, 1);
          curItem.start_date = Libs.addDays(curItem.start_date, 1);
          showNextBtn = true;
        }

        break;
      case 'month':
        var compareMonth = Libs.compareDate(Libs.addMonths(curItem.end_date, 1), 'MM/DD/YYYY', curItem.current_date);
        if (compareMonth > 0) {
          showNextBtn = false;
          curItem.end_date = Libs.getCurrentMMDDYYYYHI();
          curItem.start_date = Libs.getCurrentMMDDYYYYHI();
        } else {
          curItem.end_date = Libs.addMonths(curItem.end_date, 1);
          curItem.start_date = Libs.addMonths(curItem.start_date, 1);
          showNextBtn = true;
        }
        break;
      case 'year':
        var compareYear = Libs.compareDate(Libs.addMonths(curItem.end_date, 1), 'MM/DD/YYYY', curItem.current_date);
        if (compareYear > 0) {
          showNextBtn = false;
          curItem.end_date = Libs.addMonths(curItem.end_date, 1);
          curItem.start_date = Libs.addMonths(curItem.start_date, 1);
        } else {
          curItem.end_date = Libs.addMonths(curItem.end_date, 1);
          curItem.start_date = Libs.addMonths(curItem.start_date, 1);
          showNextBtn = true;
        }

        break;
    }
    this.setState({
      curItem: curItem,
      showNextBtn: showNextBtn
    }, () => {
      self.getChartInverterPerformance();
    })
  }


  onClickPrev() {
    var curItem = this.state.curItem, filterBy = this.state.paramsFilter.filterBy, showNextBtn = this.state.showNextBtn, self = this;
    // var compareDate = Libs.compareDate(Libs.addDays(curItem.end_date, 1), 'MM/DD/YYYY', curItem.current_date);
    switch (filterBy) {
      case 'day':
        curItem.end_date = Libs.addDays(curItem.end_date, -1);
        curItem.start_date = curItem.end_date;
        showNextBtn = true;
        break;
      case 'month':
        var t = new Date(curItem.end_date);
        var y = t.getFullYear(), m = t.getMonth();
        const endOfMonth = moment(Libs.addMonths(new Date(y, m, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
        curItem.end_date = endOfMonth;
        curItem.start_date = endOfMonth;
        showNextBtn = true;
        break;
      case 'threeDay':
        curItem.end_date = Libs.addDays(curItem.end_date, -1);
        curItem.start_date = Libs.addDays(curItem.start_date, -1);
        showNextBtn = true;
        break;
      case 'year':
        curItem.end_date = Libs.addMonths(curItem.end_date, -1);
        curItem.start_date = Libs.addMonths(curItem.start_date, -1);
        showNextBtn = true;
        break;
    }
    this.setState({
      curItem: curItem,
      showNextBtn: showNextBtn
    }, () => {
      self.getChartInverterPerformance();
    })
  }

  onClickBackward() {
    var curItem = this.state.curItem, filterBy = this.state.paramsFilter.filterBy, showNextBtn = this.state.showNextBtn, self = this;
    switch (filterBy) {
      case 'threeDay':
        curItem.end_date = Libs.addDays(curItem.end_date, -2);
        curItem.start_date = Libs.addDays(curItem.start_date, -2);
        showNextBtn = true;
        break;
      case 'month':
        curItem.end_date = Libs.addMonths(curItem.end_date, -1);
        curItem.start_date = Libs.addMonths(curItem.start_date, -1);
        showNextBtn = true;
        break;
      case 'year':
        curItem.end_date = Libs.addMonths(curItem.end_date, -12);
        curItem.start_date = Libs.addMonths(curItem.start_date, -12);
        showNextBtn = true;
        break;
    }

    this.setState({
      curItem: curItem,
      showNextBtn: showNextBtn
    }, () => {
      self.getChartInverterPerformance();
    })
  }


  onClicForward() {
    var curItem = this.state.curItem, filterBy = this.state.paramsFilter.filterBy, showNextBtn = this.state.showNextBtn, self = this;

    switch (filterBy) {
      case 'threeDay':
        var compareThreeDay = Libs.compareDate(Libs.addDays(curItem.end_date, 2), 'MM/DD/YYYY', curItem.current_date);
        if (compareThreeDay > 0) {
          showNextBtn = false;
          curItem.end_date = Libs.getCurrentDDMMYYYYHI();
          curItem.start_date = Libs.addDays(Libs.getCurrentDDMMYYYYHI(), -2);
        } else {
          curItem.end_date = Libs.addDays(curItem.end_date, 2);
          curItem.start_date = Libs.addDays(curItem.start_date, 2);
          showNextBtn = true;
        }

        break;
      case 'month':
        var compareMonth = Libs.compareDate(Libs.addMonths(curItem.end_date, 1), 'MM/DD/YYYY', curItem.current_date);
        if (compareMonth > 0) {
          showNextBtn = false;
          curItem.end_date = Libs.getCurrentDDMMYYYYHI();
          curItem.start_date = Libs.addMonths(Libs.getCurrentDDMMYYYYHI(), -1);
        } else {
          curItem.end_date = Libs.addMonths(curItem.end_date, 1);
          curItem.start_date = Libs.addMonths(curItem.start_date, 1);
          showNextBtn = true;
        }
        break;

      case 'year':
        var compareYear = Libs.compareDate(Libs.addYears(curItem.end_date, 1), 'MM/DD/YYYY', curItem.current_date);
        if (compareYear > 0) {
          showNextBtn = false;
          curItem.end_date = Libs.getCurrentDDMMYYYYHI();
          curItem.start_date = Libs.addYears(Libs.getCurrentDDMMYYYYHI(), -1);
        } else {
          curItem.end_date = Libs.addYears(curItem.end_date, 1);
          curItem.start_date = Libs.addYears(curItem.start_date, 1);
          showNextBtn = true;
        }

        break;
    }
    this.setState({
      curItem: curItem,
      showNextBtn: showNextBtn
    }, () => {
      self.getChartInverterPerformance();
    })
  }

  onChangeFilterBy(value) {
    var self = this, curItem = this.state.curItem, paramsFilter = this.state.paramsFilter;
    if (value == 'day') {
      curItem.start_date = Libs.getCurrentMMDDYYYYHI();
      curItem.end_date = Libs.getCurrentMMDDYYYYHI();
    }

    if (value == 'threeDay') {
      curItem.start_date = Libs.addDays(curItem.end_date, -2);
    }

    if (value == 'month') {
      curItem.start_date = Libs.addMonths(curItem.end_date, -1);
    }

    if (value == 'year') {
      curItem.start_date = Libs.getCurrentMMDDYYYYHI();
      curItem.end_date = Libs.getCurrentMMDDYYYYHI();
    }

    paramsFilter.filterBy = value;

    this.setState({
      paramsFilter: paramsFilter,
      curItem: curItem
    }, () => {
      self.getChartInverterPerformance();
    });
  }



  onChangeOurImpact(value) {
    this.setState({ ourImpact: value });
  }

  loadChartOption() {
    const height = document.getElementById('operating_container').clientHeight;
    var paramsFilter = this.state.paramsFilter;
    var chartOption = this.state.chartOption;
    switch (paramsFilter.filterBy) {
      case 'day':

        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            height: height
          },

          title: {
            text: 'Inverter Performance'
          },

          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          xAxis: [
            {
              title: { text: this.state.xAxisTitle, enabled: true },
              alignTicks: false,
              tickInterval: 12,
              gridLineWidth: 1,
              categories: this.state.dataCategories,
            },

            {
              title: { text: 'Data', enabled: false },
              tickInterval: 8,
              opposite: true,
              visible: false,
            },

          ],

          yAxis: [{
            title: { text: 'Kilowatts', enabled: true },
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: true
            },
          }, {
            title: { text: 'Watts/meter²', enabled: true },
            lineWidth: 1,
            opposite: true,
            gridLineWidth: 1,
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

          tooltip: {
            shared: false,
            crosshairs: true
          },
          series: [
            {
              name: this.state.titleEnergy,
              type: 'column',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataEnergy,
              zIndex: -1
            },
            {
              name: 'Weather Station - Basic (POA)*',
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

            {
              name: 'Estimated output (blue sky)',
              type: 'spline',
              tooltip: {
                valueSuffix: ' kW'
              },

              xAxis: 1,
              lineWidth: 3,
              data: this.state.dataPower,
              id: 's2',
              marker: {
                radius: 1.5
              }
            },

          ]
        };
        break;
      case 'threeDay':
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            height: height
          },

          title: {
            text: 'Inverter Performance'
          },

          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          xAxis: {
            title: { text: this.state.xAxisTitle, enabled: true },
            tickInterval: 24 * 3600 * 1000,
            type: 'datetime',
            dateTimeLabelFormats: {
              day: "%e. of %b",
              month: "%b '%y",
              year: "%Y"
            },
            labels: {
              formatter: function () {
                return moment(this.value).format("MM-DD-YYYY");
              }
            }
          },

          yAxis: [{
            title: { text: 'Kilowatts', enabled: true },
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: true
            },
          }, {
            title: { text: 'Watts/meter²', enabled: true },
            opposite: true,
            labels: {
              enabled: true
            },
          }],

          plotOptions: {
            series: {
              lineWidth: 3,
              states: {
                hover: {
                  lineWidth: 4
                }
              },
              marker: {
                enabled: true
              },

            }
          },

          tooltip: {
            shared: false,
            crosshairs: true
          },
          series: [
            {
              name: this.state.titleEnergy,
              type: 'column',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataEnergy,
              zIndex: -1
            },
            {
              name: 'Weather Station - Basic (POA)*',
              type: 'spline',
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


            {
              name: 'Estimated output (blue sky)',
              type: 'line',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataPower,
              id: 's2',
              marker: {
                radius: 1.5
              }
            },

          ]
        };

        break;

      case 'month':
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            height: height
          },

          title: {
            text: 'Inverter Performance'
          },

          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          xAxis: {
            title: { text: this.state.xAxisTitle, enabled: true },
            alignTicks: false,
            gridLineWidth: 1,
            categories: this.state.dataCategories
          },

          yAxis: [{
            title: { text: 'Kilowatts', enabled: true },
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: true
            },
          }, {
            title: { text: 'Watts/meter²', enabled: true },
            opposite: true,
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
          series: [
            {
              name: this.state.titleEnergy,
              type: 'column',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataEnergy,
              zIndex: -1
            },
            {
              name: 'Weather Station - Basic (POA)*',
              type: 'line',
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

            {
              name: 'Estimated output (blue sky)',
              type: 'line',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataPower,
              id: 's2',
              marker: {
                radius: 1.5
              }
            },

          ]
        };
        break;
      case 'year':
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            height: height
          },

          title: {
            text: 'Inverter Performance'
          },

          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          xAxis: {
            title: { text: this.state.xAxisTitle, enabled: true },
            alignTicks: false,
            gridLineWidth: 1,
            categories: this.state.dataCategories
          },

          yAxis: [{
            title: { text: 'Kilowatts', enabled: true },
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: true
            },
          }, {
            title: { text: 'Watts/meter²', enabled: true },
            opposite: true,
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
          series: [
            {
              name: this.state.titleEnergy,
              type: 'column',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataEnergy,
              zIndex: -1
            },
            {
              name: 'Weather Station - Basic (POA)*',
              type: 'line',
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
            {
              name: 'Estimated output (blue sky)',
              type: 'line',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataPower,
              id: 's2',
              marker: {
                radius: 1.5
              }
            }
          ]
        };

        break;
      case 'lifetime':
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            height: height
          },

          title: {
            text: 'Inverter Performance'
          },

          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          xAxis: {
            title: { text: this.state.xAxisTitle, enabled: true },
            alignTicks: false,
            gridLineWidth: 1,
            categories: this.state.dataCategories
          },

          yAxis: [{
            title: { text: 'Kilowatts', enabled: true },
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: true
            },
          }, {
            title: { text: 'Watts/meter²', enabled: true },
            opposite: true,
            labels: {
              enabled: true
            },
          }],

          tooltip: {
            shared: false,
            crosshairs: true
          },
          series: [
            {
              name: this.state.titleEnergy,
              type: 'column',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataEnergy,
              zIndex: -1
            },
            {
              name: 'Weather Station - Basic (POA)*',
              type: 'line',
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
            {
              name: 'Estimated output (blue sky)',
              type: 'line',
              tooltip: {
                valueSuffix: ' kW'
              },
              data: this.state.dataPower,
              id: 's2',
              marker: {
                radius: 1.5
              }
            },
          ]
        };
        break;
    }

    this.setState({ chartOption: chartOption });
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

