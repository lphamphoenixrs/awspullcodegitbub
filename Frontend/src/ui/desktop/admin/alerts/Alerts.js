/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import AlertsJsx from './Alerts.jsx';
import AdminBaseComponent from '../../../AdminBaseComponent';
import AlertService from '../../../../services/AlertService';
import './Alerts.scss';
import { cloneDeep } from 'lodash-es';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Libs from '../../../../utils/Libs.js';

export default class Alerts extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = AlertsJsx;
    this.state = {
      time: {}, seconds: 0,
      curItem: {},
      isRefresh: false,
      showFilter: false,
      dataList: [],
      viewHistory: false,
      showBetweenTime: false,
      dataListFilterOld: [],
      searchParam: {
        id_levels: [],
        id_sites: [],
        date_from: null,
        date_to: null,
        timeActive: 'day',
        current_time: Libs.getCurrentMMDDYYYYHI(),
        offset_timezone: Libs.getOffsetTimeZone(Libs.getCurrentMMDDYYYYHI()) // '-08:00',
      }
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnBlueSearch = this.handleOnBlueSearch.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.timer = setInterval(this.countDown, 1000);
    this.getList();
    $('.scrollbar-inner').scrollbar();
  }

  /**
   * Func callback time range
   * @author Long.Pham 2021-02-05
   */
  callBackSetTime = (item) => {
    var self = this;
    this.setState({
      showBetweenTime: false,
      searchParam: item
    }, () => {
      self.getList();
    })
  }


  filterByTime = (state) => {
    var { searchParam } = this.state, self = this;
    searchParam.timeActive = state;
    var endDate = Libs.convertAllFormatDate(Libs.getCurrentMMDDYYYYHI());
    var startDate = '';
    switch (state) {
      case 'day':
        startDate = Libs.convertAllFormatDate(Libs.dateFormat(endDate, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00");
        break;
      case 'week':
        startDate = Libs.convertAllFormatDate(Libs.addDays(endDate, -7));
        break;
      case 'month':
        startDate = Libs.convertAllFormatDate(Libs.addMonths(endDate, -1));
        break;
      case 'year':
        startDate = Libs.convertAllFormatDate(Libs.addMonths(endDate, -12));
        break;
    }
    if (!Libs.isBlank(endDate) && !Libs.isBlank(startDate)) {
      searchParam.date_from = startDate;
      searchParam.date_to = endDate;
    }
    this.setState({
      searchParam: searchParam
    }, () => {
      self.getList();
    })
  }

  showFilterByTimeBetween = () => {
    this.setState({
      showBetweenTime: true
    });
  }
  onCLickViewHistory = (state) => {
    let { searchParam } = this.state, self = this;
    if (state) {
      searchParam.date_from = Libs.dateFormat(Libs.getCurrentMMDDYYYYHI(), "MM/DD/YYYY", "MM/DD/YYYY") + ' 00:00:00';
      searchParam.date_to = Libs.getCurrentMMDDYYYYHI();
    } else {
      searchParam.date_from = null;
      searchParam.date_to = null;
    }

    this.setState({
      viewHistory: state
    }, () => {
      self.getList();
    });
  }
  /**
   * Func callback filter data
   * @author Long.Pham 2021-02-03
   */

  callBackFilter = (data, id_sites) => {
    var searchParam = this.state.searchParam, self = this;
    var id_levels = [], list_sites = [];
    if (Libs.isArrayData(data)) {
      data.map((item, index) => {
        id_levels.push({ id: item.id });
      });
    }

    if (Libs.isArrayData(id_sites)) {
      id_sites.map((item, index) => {
        list_sites.push({ id: item.id });
      });
    }

    searchParam.id_levels = id_levels;
    searchParam.id_sites = list_sites;
    this.setState({
      searchParam: searchParam
    }, () => {
      self.getList();
    });
  }

  /**
   * Func callback filter reset data
   * @author Long.Pham 2021-01-28
   */

  callBackReset() {
    var searchParam = this.state.searchParam, self = this;
    searchParam.id_levels = [];
    searchParam.id_sites = [];
    this.setState({
      searchParam: searchParam
    }, () => {
      self.getList();
    })

  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    var self = this;
    if (this.state.time.m == 15) {
      self.getList();
      this.setState({
        time: {},
        seconds: 0,
      });
    }
    let seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  handleInputChange(event) {
    let self = this;
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name) {
      let params = self.state.searchParam;
      params[name] = (event.target.validity.valid) ? value : params[name];
      self.setState({
        searchParam: params
      });

    }
  }

  handleOnBlueSearch(event) {
    this.getList();
  }

  /**
   * get Site list by employee
   * @author Long.Pham 2021-01-22
   */
  getList() {
    let self = this;
    var searchParam = cloneDeep(this.state.searchParam);


    var idSites = this.admin.id_sites, list_sites = [];
    if (!Libs.isBlank(idSites)) {
      var sites = idSites.split(",");
      if (sites.length > 0) {
        for (var i = 0; i < sites.length; i++) {
          var item = {
            id: sites[i]
          };
          list_sites.push(item);
        }
      }
    }

    if (!Libs.isArrayData(searchParam.id_sites)) {
      searchParam.id_sites = list_sites;
    }

    if (!Libs.isBlank(searchParam.date_from))
      searchParam.date_from = Libs.convertAllFormatDate(searchParam.date_from);

    if (!Libs.isBlank(searchParam.date_to))
      searchParam.date_to = Libs.convertAllFormatDate(searchParam.date_to);

    searchParam.current_time = Libs.convertAllFormatDate(searchParam.current_time);
    searchParam.format_sql_long = Constants.DATE_FORMAT.format_sql_long;
    searchParam.format_sql_short = Constants.DATE_FORMAT.format_sql_short;
    searchParam.format_sql_string_long = Constants.DATE_FORMAT.format_sql_string_long;
    searchParam.format_sql_string_short = Constants.DATE_FORMAT.format_sql_string_short;
    searchParam.format_sql_string_mdy = Constants.DATE_FORMAT.format_sql_string_mdy;

    AlertService.instance.getList(searchParam, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({
          isRefresh: false,
          dataList: data,
          dataListFilterOld: data
        });

      } else {
        self.setState({
          dataList: [],
          dataListFilterOld: []
        });
      }
      self.forceUpdate()
    })
  }


  /**
    * Func filter table
    * @author long.pham 2021-01-22
    * @param  {Object} e
    */

  onSort(event, sortKey) {
    this.state.searchParam.sort_column = sortKey;
    this.state.searchParam.order_by = (this.state.searchParam.order_by == '' || this.state.searchParam.order_by == 'asc') ? 'desc' : 'asc';
    const { dataList } = this.state;
    let dataListNew = dataList;
    switch (sortKey) {
      case 'site_name':
        if (this.state.searchParam.order_by == 'asc') {
          dataListNew = dataList.sort((a, b) => a.site_name < b.site_name ? 1 : -1);
        } else {
          dataListNew = dataList.sort((a, b) => a.site_name > b.site_name ? 1 : -1);
        }
        break;
      case 'priority_name':
        if (this.state.searchParam.order_by == 'asc') {
          dataListNew = dataList.sort((a, b) => a.priority_name < b.priority_name ? 1 : -1);
        } else {
          dataListNew = dataList.sort((a, b) => a.priority_name > b.priority_name ? 1 : -1);
        }
        break;
      case 'id_error_level':
        if (this.state.searchParam.order_by == 'asc') {
          dataListNew = dataList.sort((a, b) => a.id_error_level < b.id_error_level ? 1 : -1);
        } else {
          dataListNew = dataList.sort((a, b) => a.id_error_level > b.id_error_level ? 1 : -1);
        }
        break;
    }
    this.setState({
      dataList: dataListNew
    })
  }

  /**
   * Func onclick filter
   * @author long.pham 2021-01-26
   */

  onClickShowFilter() {
    this.setState({
      showFilter: true
    });
  }

  /**
   * Func on close filter popup
   * @author long.pham 2021-01-26
   */
  onCloseFilterPopup() {
    this.setState({
      showFilter: false
    })
  }


  /**
   * Func on close time
   * @author long.pham 2021-01-26
   */
  onCloseTimeBetweenPopup() {
    this.setState({
      showBetweenTime: false
    })
  }

  /**
   * Func onclick refresh
   * @author long.pham 2021-01-22
   */

  onClickRefresh = () => {
    this.setState({
      time: {}, seconds: 0
    });
    this.getList();
  }

  /**
   * Func cakback refresh data after 15 minute
   * @author long.pham 2021-01-22
   */
  callBackRefreshData() {
    this.getList();
  }

  exportToCSV() {
    let { dataList } = this.state, dataExport = [];
    if (!Libs.isArrayData(dataList)) return;
    dataList.map((item, index) => {
      dataExport.push({
        "ALERT": item.level,
        "NAME": item.site_name,
        'PROORITY': item.priority_name,
        'ISSUE': item.message,
        'COMPONENT': item.devicename,
        'OPENED': item.start_date,
        'OPEN PERIOD': item.duration
      });
    });

    if (Libs.isArrayData(dataExport)) {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      var Heading = ["ALERT", "NAME", 'PROORITY', 'ISSUE', 'COMPONENT', 'OPENED', 'OPEN PERIOD'];
      const ws = XLSX.utils.json_to_sheet(dataExport, { header: Heading, skipHeader: false });
      const wb = { Sheets: { 'alerts': ws }, SheetNames: ['alerts'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "export-alerts-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}