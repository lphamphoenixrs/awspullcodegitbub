import React, { Component } from 'react'
import ClientMapJsx from './ClientMap.jsx';
import BaseComponent from '../../BaseComponent';
import './ClientMap.scss';
import SiteService from '../../../services/SiteService';
import Libs from '../../../utils/Libs.js';


export default class ClientMap extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = ClientMapJsx;
    this.state = {
      showInfoWindow: false,
      showIconHover: false,
      curItem: {},
      dataList: []
    };
  }
  componentDidMount() {
    super.componentDidMount();
    this.getAll();
  }

  /**
   * Get all site by id_customer
   * @author long.pham 2020-10-08
   * @param id_customer
   */
  getAll() {
    let self = this, params = {
      id_customer: this.user.id_user
    };

    SiteService.instance.getAll(params, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.setState({ dataList: data });
      } else {
        self.setState({ dataList: [] });
      }
    })
  }

  handleMouseOver = (marker, event) => {
    this.setState({
      showInfoWindow: marker
    });
  };
  handleMouseExit = (marker, event) => {
    this.setState({
      showInfoWindow: false
    });
  };

  onMouseoverMarker = (marker, event) => {
    this.setState({
      showIconHover: marker
    });
  };

  mouseMoveOutOfMarker = (marker, event) => {
    this.setState({
      showIconHover: false
    });
  };

  render() {
    return this.jsxTemplate.call(this);
  }
}

