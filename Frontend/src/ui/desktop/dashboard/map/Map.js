import React, { Component } from 'react'
import MapJsx from './Map.jsx';
import BaseComponent from '../../../BaseComponent';


export default class Map extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = MapJsx;
    this.state = {
      showInfoWindow: false,
      showIconHover: false,
      dataList: this.props.dataList,
    };

  }
  componentDidMount() {
    super.componentDidMount();
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

