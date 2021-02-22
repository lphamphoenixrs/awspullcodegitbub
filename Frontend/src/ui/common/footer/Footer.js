import React, { Component } from 'react'
import FooterJsx from './Footer.jsx';
import './Footer.scss';


export default class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = FooterJsx;
    this.state = {};
  }
  
  render() {
    return this.jsxTemplate.call(this);
  }
}

