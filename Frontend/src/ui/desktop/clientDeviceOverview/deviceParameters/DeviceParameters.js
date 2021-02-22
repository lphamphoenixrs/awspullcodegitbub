import React, { Component } from 'react';
import BaseComponent from '../../../BaseComponent';
import DeviceParametersJsx from './DeviceParameters.jsx';
import './DeviceParameters.scss';

class DeviceParameters extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      curItem: this.props.curItem,
      dataList: [
        { id: 42340588, parameters: "SMA ShadeFix", value: "Yes", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Country standard set", value: 7519, last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "End point of the power control via frequency", value: "2.00 ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Start. point of the power control via frequency", value: "	1.00  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Maximum apparent power device", value: "12000 VA", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "cos φ excit.type, cos φ config., direct spec.", value: "Underexcited  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Operating mode of static voltage stability, configuration of static voltage stability", value: "cos φ, manual setting  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Operating mode of active power reduction in case of overfrequency P(f)", value: "Off  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Maximum active power device", value: "12000 W", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Set active power limit", value: "	12000 W", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "perating mode active power setting", value: "External setting", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Status of MFR with control via communication", value: "	Off  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Operating mode of multifunction relay", value: "	Fault indication ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "ardware version of the communication assembly", value: "B1", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Revision status of the communication assembly", value: 0, last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Firmware version of the communication assembly", value: "02.64.05.R  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Revision status of the display", value: 0, last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Hardware version of the main processor", value: "	A2  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Firmware version of the main processor", value: "02.03.04.R  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Communication version", value: "01.01.09.7  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Device name", value: "	STP 12kTL-US-10 752", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Software package", value: "02.83.03.R  ", last_change: "30/05/2018 05:58:59" },
        { id: 42340588, parameters: "Serial number", value: "191238752  ", last_change: "30/05/2018 05:58:59" }

      ],
      searchParam: {
        limit: Constants.LIMIT,
        offset: 0,
        index: 1,
      },

    };

    this.pagging = {
      total: 10,
      current: 1
    }

    this.jsxTemplate = DeviceParametersJsx;
  }
  componentDidMount() {
    super.componentDidMount();
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

  render() {
    return this.jsxTemplate.call(this);
  }

}

export default DeviceParameters;