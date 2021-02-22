import React, { Component } from 'react'
import HomeJsx from './Home.jsx';
import BaseComponent from '../../BaseComponent';
import './Home.scss';
import DemoService from '../../../services/DemoService';
import Libs from '../../../utils/Libs';


export default class Home extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = HomeJsx;
    this.state = {
      curItem: {},
      dataList: []
    };
  }
  componentDidMount() {
    super.componentDidMount();
    this.getList();
  }

   /**
   * @description get province
   * @author long.pham 26/07/2019
   */

  getList() {
    let self = this;
    DemoService.instance.getList({}, function (data, totalRow) {
      console.log(data);
      if (Libs.isArrayData(data)) {
        self.setState({
          dataList: data
        });
      }
      else {
        self.setState({
          dataList: []
        });
      }
    }, false);
  }


  render() {
    return this.jsxTemplate.call(this);
  }
}

