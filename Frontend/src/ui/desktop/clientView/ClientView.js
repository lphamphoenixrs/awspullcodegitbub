import clientViewJsx from './ClientView.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientView.scss';
import Libs from '../../../utils/Libs';
import SiteService from '../../../services/SiteService';
import cloneDeep from 'lodash-es/cloneDeep';

export default class ClientView extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = clientViewJsx;
    var queryParams = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      dataCategories: [],
      dataIrradiance: [],
      dataPower: [],
      dataEnergy: [],
      totalPower: 0,
      totalEnergy: 0,
      avgPR: 0,
      curItem: {
        id: !Libs.isObjectEmpty(queryParams) ? queryParams.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null,
        max_date: Libs.getCurrentMMDDYYYYHI(),
        timeActive: "day",
        kpiActive: "month",
        kpi_filter: Libs.getCurrentMMDDYYYYHI(),
        date_filter: Libs.getCurrentMMDDYYYYHI(),
      },
      dataListMeter: [
        { "id": "2a56697349666d444242454b772b71513d", "name": "PV Meter - ACTIVE ENERGY", 'value': 10, "label": "kWh" },
        { "id": "2a56697349666d444242454b772b71513d", "name": "PV Meter - ACTIVE ENERGY", 'value': 20, "label": "kWh" }
      ],
      chartOption: {},
      showMap: false,
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

    this.handleDateInputChange = this.handleDateInputChange.bind(this);

  }
  componentDidMount() {
    super.componentDidMount();
    let self = this;
    this.getDashboardDetailSite();
    this.getChartKPIDay();
    setInterval( function(){ 
      self.getDashboardDetailSite();
      self.getChartKPIDay();
     }, 5*60*1000);
  }


  /**
 * Get dashboard detail site
 * @author long.pham 2020-10-22
 * @param id_site, id_customer
 * @return Object
 */
  getDashboardDetailSite() {
    let self = this;
    let curItem = this.state.curItem;
    SiteService.instance.getDashboardDetailSite(curItem, (data) => {
      if (data) {
        curItem = Object.assign({}, data, curItem);
        self.setState({
          curItem: curItem
        });
      }
    });
  }



  /**
 * Get dashboard detail site
 * @author long.pham 2020-10-22
 * @param id_site, id_customer
 * @return Object
 */
  getChartKPIDay() {
    let self = this;
    let curItem = this.state.curItem;
    curItem.kpi_type = curItem.kpiActive;
    var params = cloneDeep(curItem);
    params.kpi_filter = Libs.convertAllFormatDate(curItem.kpi_filter);
    params.offset_timezone = Libs.getOffsetTimeZone(params.kpi_filter);
    SiteService.instance.getChartKPIDay(params, (data) => {
      console.log(data);
      if (!Libs.isObjectEmpty(data)) {
        var dataIrradiance = [], dataPower = [], dataEnergy = [], categories = [];
        var totalPower = 0, totalEnergy = 0, totalPR = 0;
        switch (curItem.kpiActive) {
          case "month":
            if (Libs.isArrayData(data.energy)) {
              var dataListMonth = data.energy;
              for (var m = 0; m < dataListMonth.length; m++) {
                categories.push(dataListMonth[m].convert_time);
                // Energy
                totalEnergy = totalEnergy + dataListMonth[m].avg_month_sensor1_data;
                dataEnergy.push([dataListMonth[m].full_time, dataListMonth[m].avg_month_sensor1_data]);

                // Power
                totalPower = totalPower + dataListMonth[m].total_day_kw;
                dataPower.push([dataListMonth[m].full_time, dataListMonth[m].total_day_kw]);
                // PR
                dataIrradiance.push([dataListMonth[m].full_time, dataListMonth[m].day_pr]);
                totalPR = totalPR + dataListMonth[m].day_pr;
              }
              console.log(categories);
            }

            break;
          case "year":
            if (Libs.isArrayData(data.energy)) {
              var dataListYear = data.energy;
              for (var v = 0; v < dataListYear.length; v++) {
                categories.push(dataListYear[v].convert_time);
                // Energy
                totalEnergy = totalEnergy + dataListYear[v].avg_month_sensor1_data;
                dataEnergy.push([dataListYear[v].full_time, dataListYear[v].avg_month_sensor1_data]);

                // Power
                totalPower = totalPower + dataListYear[v].total_month_kw;
                dataPower.push([dataListYear[v].full_time, dataListYear[v].total_month_kw]);
                // PR
                dataIrradiance.push([dataListYear[v].full_time, dataListYear[v].month_pr]);
                totalPR = totalPR + dataListYear[v].month_pr;
              }
            }

            break;
          default:
            categories = [
              '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
              '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
            ];
            if (Libs.isArrayData(data.irradiance)) {
              var dataListIrradiance = data.irradiance;
              for (var i = 0; i < dataListIrradiance.length; i++) {
                var itemArr = [dataListIrradiance[i].time_day, dataListIrradiance[i].sensor1_data < 0 ? 0 : dataListIrradiance[i].sensor1_data];
                dataIrradiance.push(itemArr);
              }
            }

            if (Libs.isArrayData(data.power)) {
              var dataListPower = data.power;
              for (var j = 0; j < dataListPower.length; j++) {
                var itemArrPower = [dataListPower[j].time_day, dataListPower[j].ac_power < 0 ? 0 : dataListPower[j].ac_power];
                dataPower.push(itemArrPower);
              }
            }

            if (Libs.isArrayData(data.energy)) {
              var dataListEnergy = data.energy;
              for (var k = 0; k < dataListEnergy.length; k++) {
                if (k > 0) {
                  var energy = (dataListEnergy[k].ytd_kwh_total - dataListEnergy[k - 1].ytd_kwh_total) < 0 ? 0 : Libs.round(dataListEnergy[k].ytd_kwh_total - dataListEnergy[k - 1].ytd_kwh_total, 2);
                  var itemArrEnergy = [energy];
                  dataEnergy.push(itemArrEnergy);
                }
              }
            }

        }

        self.setState({
          dataCategories: categories,
          dataIrradiance: dataIrradiance,
          dataPower: dataPower,
          dataEnergy: dataEnergy,
          totalEnergy: totalEnergy,
          totalPower: totalPower,
          avgPR: Libs.isArrayData(data.energy) ? totalPR / data.energy.length : 0
        }, () => {
          self.loadChartOption();
        });
      }
    });
  }

  loadChartOption() {
    var curItem = this.state.curItem, chartOption = this.state.chartOption, self = this;
    switch (curItem.kpiActive) {
      case "day":
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            height: 400
          },

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

          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          xAxis: [
            {
              title: { text: 'Data', enabled: false },
              alignTicks: false,
              tickInterval: 2,
              categories: this.props.dataCategories
            },
            {
              title: { text: 'Data', enabled: false },
              alignTicks: false,
              opposite: true,
              visible: false
            },

          ],

          yAxis: [{
            title: { text: 'Power', enabled: false },
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: false
            },
          }, {
            title: { text: 'Energy', enabled: false },
            lineWidth: 1,
            opposite: true,
            gridLineWidth: 1,
            labels: {
              enabled: false
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
              name: 'Power',
              type: 'spline',
              xAxis: 1,
              yAxis: 1,
              data: this.state.dataPower,
              id: 's1',
              tooltip: {
                valueSuffix: ' kWh'
              },
            },
            {
              name: 'Energy',
              type: 'column',
              tooltip: {
                valueSuffix: ' kWh'
              },
              data: this.state.dataEnergy,
              zIndex: -1
            },

            {
              name: 'Irradiance',
              type: 'spline',
              tooltip: {
                valueSuffix: ' W/m2'
              },

              xAxis: 1,
              yAxis: 1,
              data: this.state.dataIrradiance,
              id: 's2',
              marker: {
                radius: 1.5
              }
            },

          ]
        };

        break;
      case "month":
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            type: 'column',
            height: 400
          },
          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          xAxis: {
            categories: this.state.dataCategories,
            crosshair: false
          },

          title: {
            text: null,
            enabled: false
          },

          yAxis: [{
            allowDecimals: false,
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: false
            },
            title: {
              text: null,
              enabled: false
            }
          },
          {
            title: { text: null, enabled: false },
            lineWidth: 1,
            gridLineWidth: 1,
            opposite: true,
            labels: {
              enabled: false
            },
          },
          {
            title: { text: null, enabled: false },
            lineWidth: 1,
            gridLineWidth: 1,
            opposite: true,
            labels: {
              enabled: false
            },
          }
          ],

          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },

          series: [{
            name: 'Energy ' + (this.state.totalPower > 0 ? Libs.formatNum(this.state.totalPower, "#,###.##") + ' kWh' : ''),
            data: this.state.dataPower,
            tooltip: {
              pointFormat: '<b>Energy :</b> {point.y}',
              valueSuffix: ' kWh',
              shared: true
            }
          }, {
            name: 'Insolation ' + (this.state.totalPower > 0 ? Libs.formatNum(this.state.totalEnergy, "#,###.##") + ' kWh/m2' : ''),
            data: this.state.dataEnergy,
            yAxis: 1,
            tooltip: {
              pointFormat: '<b>Insolation :</b> {point.y}',
              valueSuffix: ' kWh/m2',
              shared: true
            },

          }, {
            name: 'PR ' + (this.state.avgPR > 0 ? Libs.formatNum(this.state.avgPR, "#,###.##") + ' %' : ''),
            yAxis: 2,
            data: this.state.dataIrradiance,
            tooltip: {
              pointFormat: '<b>PR :</b> {point.y}',

              valueSuffix: ' %',
              shared: true
            }
          }]
        };
        break;
      case "year":
        chartOption = {
          credits: { enabled: false },
          exporting: { enabled: true },
          chart: {
            type: 'column',
            height: 400
          },
          colors: ['#ca5952', '#2491d8', '#f2bb46'],
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            showInLegend: false
          },

          xAxis: {
            categories: this.state.dataCategories,
            crosshair: true
          },

          title: {
            text: ""
          },

          yAxis: [{
            allowDecimals: false,
            lineWidth: 1,
            gridLineWidth: 1,
            labels: {
              enabled: false
            },
            title: {
              text: null,
              enabled: false
            }
          },
          {
            title: { text: null, enabled: false },
            lineWidth: 1,
            gridLineWidth: 1,
            opposite: true,
            labels: {
              enabled: false
            },
          },
          {
            title: { text: null, enabled: false },
            lineWidth: 1,
            gridLineWidth: 1,
            opposite: true,
            labels: {
              enabled: false
            },
          }
          ],
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },

          series: [{
            name: 'Energy ' + (this.state.totalPower > 0 ? Libs.formatNum(this.state.totalPower, "#,###.##") + ' kWh' : ''),
            data: this.state.dataPower,
            tooltip: {
              pointFormat: '<b>Energy :</b> {point.y}',
              valueSuffix: ' kWh',
              shared: true
            }
          }, {
            name: 'Insolation ' + (this.state.totalPower > 0 ? Libs.formatNum(this.state.totalEnergy, "#,###.##") + ' kWh/m2' : ''),
            data: this.state.dataEnergy,
            yAxis: 1,
            tooltip: {
              pointFormat: '<b>Insolation :</b> {point.y}',
              valueSuffix: ' kWh/m2',
              shared: true
            },

          }, {
            name: 'PR ' + (this.state.avgPR > 0 ? Libs.formatNum(this.state.avgPR, "#,###.##") + ' %' : ''),
            yAxis: 2,
            data: this.state.dataIrradiance,
            tooltip: {
              pointFormat: '<b>PR :</b> {point.y}',
              
              valueSuffix: ' %',
              shared: true
            }
          }]
        };

        break;
    }


    this.setState({ chartOption: chartOption })
  }


  /**
  * handle click show site information and view address map
  * @param {*} content 
  * @param {*} props 
  */
  onClickShowMap(index) {
    this.setState({
      showMap: index
    });
  }


  /**
  * handle production hquivalences change date
  * @param {*} content 
  * @param {*} props 
  */
  onClickChangeFilter(index) {
    var curItem = this.state.curItem;
    switch (index) {
      case "day":
        curItem.timeActive = "day";
        break;
      case "month":
        curItem.timeActive = "month";
        break;
      case "year":
        curItem.timeActive = "year";
        break
    }
    this.setState({
      curItem: curItem
    });
  }

  /**
  * handle Chart (KPI) change date
  * @param {*} content 
  * @param {*} props 
  */
  onChangeDateKPI(index) {
    var curItem = this.state.curItem, self = this;
    switch (index) {
      case "day":
        curItem.kpiActive = "day";
        break;
      case "month":
        curItem.kpiActive = "month";
        break;
      case "year":
        curItem.kpiActive = "year";
        break
    }
    this.setState({
      curItem: curItem
    }, () => {
      self.getChartKPIDay();
    });

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
      item[name] = value;
      this.setState({
        curItem: item
      }, () => {
        self.getChartKPIDay();
      });
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

