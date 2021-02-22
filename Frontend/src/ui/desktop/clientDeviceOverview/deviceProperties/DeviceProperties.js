import React, { Component } from 'react';
import BaseComponent from '../../../BaseComponent';
import DevicePropertiesJsx from './DeviceProperties.jsx';
import './DeviceProperties.scss';

class DeviceProperties extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      curItem: this.props.curItem
    };
    this.jsxTemplate = DevicePropertiesJsx;
  }
  componentDidMount() {
    super.componentDidMount();
  }

  render() {
    return this.jsxTemplate.call(this);
  }

}

export default DeviceProperties;