import React, { Component } from 'react'
import DashboardJsx from './Dashboard.jsx';
import BaseComponent from '../../BaseComponent';
import './Dashboard.scss';


export default class Dashboard extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = DashboardJsx;
    this.state = {
      curItem: {},
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
    super.componentDidMount();
  }

  /**
   * @description Select page in pagging
   * @author Minh.Pham 2019-05-28
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

