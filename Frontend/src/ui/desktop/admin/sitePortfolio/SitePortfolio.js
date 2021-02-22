/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import SitePortfolioJsx from './SitePortfolio.jsx';
import AdminBaseComponent from '../../../AdminBaseComponent';
import PortfolioService from '../../../../services/PortfolioService';
import './SitePortfolio.scss';
import { cloneDeep } from 'lodash-es';

export default class SitePortfolio extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = SitePortfolioJsx;
    this.state = {
      time: {}, seconds: 0,
      curItem: {},
      curMouse: {
        left: 0, top: 0, display: "none", height: 0, bottom: 'auto', totalError: 0
      },
      alerts: [],
      isRefresh: false,
      showFilter: false,
      dataList: [],
      dataListFilterOld: [],
      searchParam: {
        current_time: Libs.getCurrentMMDDYYYYHI(),
        offset_timezone: Libs.getOffsetTimeZone(Libs.getCurrentMMDDYYYYHI()) // '-08:00'
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
   * Func callback filter data
   * @author Long.Pham 2021-01-28
   */

  callBackFilter = (data) => {
    if (!Libs.isArrayData(data)) return;
    var {dataListFilterOld} = this.state;
    if (!Libs.isArrayData(dataListFilterOld)) return;
    var filterData = [];
    for(var i = 0 ; i < data.length; i++){
      dataListFilterOld.map((item, index) => {
        if(Libs.isArrayData(item.alerts)){
          var findItem = Libs.find(item.alerts, 'id', data[i].id );
          if(!Libs.isObjectEmpty(findItem)){
            filterData.push(item);
          }
        }
      });
    }

    if(Libs.isArrayData(filterData)){
      this.setState({
        dataList: filterData
      })
    }
  }

  /**
   * Func callback filter reset data
   * @author Long.Pham 2021-01-28
   */

  callBackReset (){
    var {dataListFilterOld} = this.state;
    this.setState({
      dataList: dataListFilterOld
    })
  }

  _onMouseOver = (index, e) => {
    var { dataList } = this.state;
    if (!Libs.isArrayData(dataList)) return;
    var findItem = dataList[index];
    if (Libs.isObjectEmpty(findItem)) return;
    var alerts = Libs.isArrayData(findItem.alerts) ? findItem.alerts : [];
    var windowHeight = window.innerHeight;

    this.setState({
      curMouse: {
        left: e.pageX,
        top: e.pageY > (windowHeight / 2) ? 'auto' : e.pageY,
        display: "block",
        bottom: e.pageY > (windowHeight / 2) ? windowHeight - e.pageY : 'auto',
        totalError: findItem.total_error
      },

      alerts: alerts
    });
  }

  _onMouseOut = (index, e) => {
    this.setState({
      curMouse: {
        top: 0,
        left: 0,
        bottom: 'auto',
        display: "none",
        totalError: 0
      },
      alerts: []
    });
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
    var params = cloneDeep(this.state.searchParam);
    params.current_time = Libs.convertAllFormatDate(params.current_time);
    PortfolioService.instance.getList(params, (data, total_row) => {
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
      case 'name':
        if (this.state.searchParam.order_by == 'asc') {
          dataListNew = dataList.sort((a, b) => a.name < b.name ? 1 : -1);
        } else {
          dataListNew = dataList.sort((a, b) => a.name > b.name ? 1 : -1);
        }
        break;
      case 'dc_capacity':
        if (this.state.searchParam.order_by == 'asc') {
          dataListNew = dataList.sort((a, b) => a.dc_capacity < b.dc_capacity ? 1 : -1);
        } else {
          dataListNew = dataList.sort((a, b) => a.dc_capacity > b.dc_capacity ? 1 : -1);
        }
        break;
      case 'energy_now':
        if (this.state.searchParam.order_by == 'asc') {
          dataListNew = dataList.sort((a, b) => a.energy_now < b.energy_now ? 1 : -1);
        } else {
          dataListNew = dataList.sort((a, b) => a.energy_now > b.energy_now ? 1 : -1);
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
  render() {
    return this.jsxTemplate.call(this);
  }
}