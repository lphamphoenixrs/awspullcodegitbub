import ClientReportJsx from './ClientReport.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientReport.scss';
import Libs from '../../../utils/Libs';
import SiteService from '../../../services/SiteService';
import moment from 'moment';


export default class ClientReport extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientReportJsx;
    var params = !Libs.isBlank(this.props.baseParam) && !Libs.isObjectEmpty(this.props.baseParam.match.params) ? this.props.baseParam.match.params : {};
    this.state = {
      curItem: {},
      queryParams: {
        id_site: !Libs.isObjectEmpty(params) ? params.id : null,
        id_customer: !Libs.isBlank(this.user) ? this.user.id_user : null
      },

      dailyReportSum: {},
      dataReportChart: [],
      dataListReportType: [
        { id: 'daily_report', 'text': "Daily report" }, { id: 'monthly_report', 'text': "Monthly report" }
      ],
      chartOption: {},
      headers:  [],
      dataExportCsv: []
    };

    this.handleDateInputChange = this.handleDateInputChange.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.getDetailSite();
  }


  /**
   * Get detail site
   * @author long.pham 2020-11-11
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
        curItem.date_sum = Libs.getCurrentMMDDYYYYHI();
        curItem.date_from = Libs.getCurrentMMDDYYYYHI();
        curItem.date_to = Libs.getCurrentMMDDYYYYHI();
        curItem.report_type = 'daily_report'; // daily report
        if (curItem.report_type == 'monthly_report') {
          curItem.max_from_date = Libs.addMonths(curItem.date_to, -1);
        } else {
          curItem.max_from_date = Libs.getCurrentMMDDYYYYHI();
        }

        self.setState({
          curItem: curItem
        }, () => {
          self.getDailyReportSum();
          self.getDailyReportChart();
        });
      } else {
        self.props.baseParam.history.push('/');
      }
    });
  }


  /**
   * Get daily report
   * @author long.pham 2020-11-11
   * @param id_site, id_customer, start_date, end_date
   * @return Object
   */
  getDailyReportSum() {
    let self = this, {curItem, queryParams} = this.state;
    var startDate = Libs.dateFormat(curItem.date_sum, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00", endDate = '';
    if (Libs.dateFormat(curItem.date_sum, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
      endDate = Libs.dateFormat(curItem.date_sum, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
    } else {
      endDate = curItem.date_sum;
    }

    var params = {
      id: queryParams.id_site,
      id_customer: queryParams.id_customer,
      kpi_type: curItem.report_type,
      offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
      start_date: Libs.convertAllFormatDate(startDate),
      end_date: Libs.convertAllFormatDate(endDate),
      format_sql_long: curItem.format_sql_long,
      format_sql_short: curItem.format_sql_short,
      format_sql_string_long: curItem.format_sql_string_long,
      format_sql_string_short: curItem.format_sql_string_short,
      format_sql_string_mdy: curItem.format_sql_string_mdy
    }

    SiteService.instance.getDailyReportSum(params, (data) => {
      if (data) {
        self.setState({
          dailyReportSum: data
        });
      } else {
        self.setState({
          dailyReportSum: {}
        })
      }
    });
  }


  /**
  * Get list daily report chart
  * @author long.pham 2020-11-11
  * @param id_site, id_customer, start_date, end_date
  * @return array
  */

 getDailyReportChart() {
    let self = this, {curItem, queryParams} = this.state;
    var startDate = Libs.dateFormat(curItem.date_from, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00";
    var endDate = '';

    if(curItem.report_type == 'daily_report'){
      if (Libs.dateFormat(curItem.date_from, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
        endDate = Libs.dateFormat(curItem.date_from, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
      } else {
        endDate = curItem.date_from;
      }
    }

    if(curItem.report_type == 'monthly_report'){
      if (Libs.dateFormat(curItem.date_to, "MM/DD/YYYY", "MM/DD/YYYY") != Libs.dateFormat(curItem.max_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
        endDate = Libs.dateFormat(curItem.date_to, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59";
      } else {
        endDate = curItem.date_to;
      }
    }

    if (!Libs.isBlank(endDate) && !Libs.isBlank(startDate)) {
      var params = {
        id: queryParams.id_site,
        id_customer: queryParams.id_customer,
        kpi_type: curItem.report_type,
        offset_timezone: Libs.getOffsetTimeZone(curItem.max_date),
        start_date: Libs.convertAllFormatDate(startDate), // '2020-11-10 00:00:00', 
        end_date:  Libs.convertAllFormatDate(endDate), // '2020-11-10 23:59:59',
        format_sql_long: curItem.format_sql_long,
        format_sql_short: curItem.format_sql_short,
        format_sql_string_long: curItem.format_sql_string_long,
        format_sql_string_short: curItem.format_sql_string_short,
        format_sql_string_mdy: curItem.format_sql_string_mdy
      }

      SiteService.instance.getDailyReportChart(params, (data, total_row) => {
        if (Libs.isArrayData(data)) {
          self.setState({
            dataReportChart: data
          }, () => {
            self.loadChartOption();
          });
        } else {
          self.setState({
            dataReportChart: []
          }, () => {
            self.loadChartOption();
          });
        }
      });
    }

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
      if (item.report_type == 'monthly_report' && name == 'date_from') {
        item.date_to = moment(Libs.addMonths(value, +1)).format('MM/DD/YYYY HH:mm:ss');
      }

      if (item.report_type == 'monthly_report' && name == 'date_to') {
        item.date_from = moment(Libs.addMonths(value, -1)).format('MM/DD/YYYY HH:mm:ss');
      }

      if(name == 'report_type' && value == 'monthly_report'){
        item.date_from = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -1)).format('MM/DD/YYYY HH:mm:ss');
      } 

      if(name == 'report_type' && value == 'daily_report'){
        item.date_from = Libs.getCurrentMMDDYYYYHI();
      } 

      item[name] = value;
      this.setState({
        curItem: item
      }, () => {
        if (name == 'date_sum') {
          self.getDailyReportSum();
        }

        if(name == 'date_from' || name == 'date_to' || name == 'report_type'){
          self.getDailyReportChart();
        }
      });
    }
  }

  loadChartOption() {
    var {curItem, dataReportChart } = this.state;
    var categories = [], dataSeries = [], xAxisTitle = '', dataExportCsv = [], headers = [];
    if(Libs.isArrayData(dataReportChart) && curItem.report_type == 'daily_report'){
      headers = [
        {label: 'Id site', key: "id"},
        {label: 'Date', key: "local_time"},
        {label: "Hour", key: "convert_time"},
        {label: "YTD kWh Total", key: "ytd_kwh_total"},
        {label: 'Energy kWh', key: "now_ytd_kwh_total"}
      ];
      dataReportChart.map((item, index) => {
        if(index == 0){ xAxisTitle = item.full_time; }
        var itemCsv = {
          id: item.id,
          local_time: item.local_time,
          convert_time: item.convert_time,
          ytd_kwh_total: item.ytd_kwh_total,
          now_ytd_kwh_total: 0
        };
        categories.push(item.convert_time);
        if(index > 0){
          if (dataReportChart[index].ytd_kwh_total <= 0 || dataReportChart[index - 1].ytd_kwh_total <= 0) {
            dataSeries.push([dataReportChart[index].local_time, 0]);
          } else {
            var energy = (dataReportChart[index].ytd_kwh_total - dataReportChart[index - 1].ytd_kwh_total) < 0 ? 0 : Libs.round(dataReportChart[index].ytd_kwh_total - dataReportChart[index - 1].ytd_kwh_total, 2);
            dataSeries.push([dataReportChart[index].local_time, energy]);
            itemCsv.now_ytd_kwh_total = energy;
          }
        }

        dataExportCsv.push(itemCsv);
      });
    }

    if(Libs.isArrayData(dataReportChart) && curItem.report_type == 'monthly_report'){
      headers =   [
        {label: 'Id site', key: "id"},
        {label: 'Date', key: "local_time"},
        {label: 'Energy kWh', key: "energy_month_kw"}
      ];

      dataReportChart.map((item, index) => {
        var itemCsv = {
          id: item.id,
          local_time: item.local_time,
          convert_time: item.convert_time,
          energy_month_kw: item.energy_month_kw
        };
        dataExportCsv.push(itemCsv);

        if(index == 0){
          xAxisTitle = item.xAxisTitle;
        }
        categories.push(item.convert_time);
        dataSeries.push([item.full_time, item.energy_month_kw]);
      }); 
    }

    if (curItem.report_type == 'monthly_report') {
      curItem.max_from_date = Libs.addMonths(curItem.max_date, -1);
      curItem.date_from = Libs.addMonths(curItem.date_to, -1);
    } else {
      curItem.max_from_date = Libs.getCurrentMMDDYYYYHI();
    }

    var chartOption = {
      credits: { enabled: false },
      exporting: { enabled: true },
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
          tickInterval: curItem.report_type == 'daily_report' ? 2: 1,
          categories: categories
        },
      ],

      yAxis: [{
        title: { text: '[kWh] Merter change', enabled: true },
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
    this.setState({ chartOption: chartOption, curItem: curItem, dataExportCsv: dataExportCsv, headers: headers })
  }


  render() {
    return this.jsxTemplate.call(this);
  }
}

