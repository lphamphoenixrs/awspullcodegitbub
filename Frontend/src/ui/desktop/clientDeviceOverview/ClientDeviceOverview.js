import React, { Component } from 'react'
import ClientDeviceOverviewJsx from './ClientDeviceOverview.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientDeviceOverview.scss';
import Libs from '../../../utils/Libs';


export default class ClientDeviceOverview extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientDeviceOverviewJsx;
    this.state = {
      curItem: {},
      showDeviceProperties: false,
      showDeviceParameters: false,
      searchParam: {
        limit: Constants.LIMIT,
        offset: 0,
        index: 1,
      },

      dataList: [
        { id: 42340588, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42337716, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "STP 12kTL-US-10 932", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 0, monitoring: 0, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42335490, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "STP 12kTL-US-10 932", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42334878, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "STP 12kTL-US-10 932", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42334744, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "STP 12kTL-US-10 932", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1 , ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00"},
        { id: 42334741, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42342729, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42342024, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42343827, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42344605, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42338806, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42333619, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42333049, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42338465, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42334444, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42334889, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42338323, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42335030, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42343233, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
        { id: 42343234, id_client: "2a56697349666d444242454b772b71513d", image: "/assets/images/device.png", name: "Cluster Controller 466", serial_number: "165012466", product_group: "SMA Cluster Controller", data_collection: 1, monitoring: 1, status: 1, ip: "192.168.1.1", manufacturer: "SMA Solar Technology AG", description: "", irradiation_sensor: 1, module_temperatur_sensor: 1, outsite_temerature_sensor: 1, alarm_after: "8 hours, 15 minutes (Sharp)", interval: "8 hours", time_span: "00:00 - 00:00" },
      ],
      dataListStatus: [
        { id: 1, text: "All" },
        { id: 2, text: "Active" },
        { id: 3, text: "Deactive" }
      ]
    };


    this.pagging = {
      total: 10,
      current: 1
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    var curItem = this.state.curItem;
    this.setState({
      dataHourFilter: Libs.generateListHour(curItem.date_filter, 'MM/dd/yyyy', '/')
    });
  }

  /**
 * handle on click show popup device properties
 * @param {*} content 
 * @param {*} props 
 */
  onOpenDeviceProperties = (index) => {
    var dataList = this.state.dataList;
    var item = dataList[index];
    if (Libs.isObjectEmpty(item)) return;

    this.setState({
      showDeviceProperties: true,
      curItem: item
    });
  }

  /**
  * handle on click close popup device properties
  * @param {*} content 
  * @param {*} props 
  */
  onCloseDeviceProperties = () => {
    this.setState({
      showDeviceProperties: false
    })
  }


  /**
 * handle on click show popup device parameter
 * @param {*} content 
 * @param {*} props 
 */
onOpenDeviceParameters = (index) => {
  var dataList = this.state.dataList;
  var item = dataList[index];
  if (Libs.isObjectEmpty(item)) return;

  this.setState({
    showDeviceParameters: true,
    curItem: item
  });
}

/**
* handle on click close popup device parameter
* @param {*} content 
* @param {*} props 
*/
onCloseDeviceParameters = () => {
  this.setState({
    showDeviceParameters: false
  })
}


  /**
  * handle onchange type
  * @param {*} content 
  * @param {*} props 
  */
  handleTypeChange = (index) => {
    let self = this;
    var data = self.state.dataListType;
    var item = data[index];
    if (Libs.isObjectEmpty(item)) return;
    data[index].active = data[index].active == 1 ? 0 : 1
    this.setState({
      dataListType: data
    });
  }
  /**
  * handle on click btn confirm all
  * @param {*} content 
  * @param {*} props 
  */
  onClickConfirm() {
    var dataList = this.props.dataList;
    if (!Libs.isArrayData(dataList)) return;

    // Call api update all status
  }

  /**
  * handle on click btn search
  * @param {*} content 
  * @param {*} props 
  */
  onClickSearch() {

  }


  /**
  * handle on click btn reset
  * @param {*} content 
  * @param {*} props 
  */
  onClickReset() {
    var searchParam = this.state.searchParam;
    searchParam.name = '';
    searchParam.serial_number = '';
    searchParam.status = 1;
    this.setState({
      searchParam: searchParam
    })
  }


  handleDropdownChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    }
    if (name) {
      let item = this.state.searchParam;
      item[name] = value;
      this.setState({ searchParam: item });
    }
  }

  /**
  * handle on click btn confirm one item
  * @param {*} content 
  * @param {*} props 
  */


  confirmItem = (index) => {
    var dataList = this.props.dataList;
    if (!Libs.isArrayData(dataList)) return;

    var item = dataList[index];
    if (Libs.isObjectEmpty(item)) return;

    // Call api update status
  }




  /**
    * @description Select page in pagging
    * @author Long.Pham 09/22/2020
    * @param {int} index
    */
  onSelectPage(index) {
    let self = this;
    self.param.index = index;
    if (index > 0) {
      self.param.offset = (index - 1) * self.param.limit;
    } else {
      self.param.offset = 0;
    }
  }

  /**
    * Func filter table
    * @author long.pham 09/22/2020
    * @param  {Object} e
    */

  onSort(event, sortKey) {
    this.state.searchParam.sortColumn = sortKey;
    this.state.searchParam.sortOrder = (this.state.searchParam.sortOrder == '' || this.state.searchParam.sortOrder == 'asc') ? 'desc' : 'asc';
    this.forceUpdate();
    // this.getList();
  }


  render() {
    return this.jsxTemplate.call(this);
  }
}

