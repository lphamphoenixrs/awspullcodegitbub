import React, { Component } from 'react'
import HeaderJsx from './Header.jsx';
import BaseComponent from '../../BaseComponent';
import './Header.scss';


export default class Header extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = HeaderJsx;
    this.state = {
      curItem: {},
      dataList: [],
      showChangePassword: false,
      showMenuProfile: false
    };
    this.wrapperRef = React.createRef()
  }
  componentDidMount() {
    super.componentDidMount();
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }


  handleClickOutside = (event) => {
    const { target } = event;
    var { showMenuProfile } = this.state, self = this;
    if (!this.wrapperRef.current.contains(target)) {
      if(showMenuProfile){
        self.setState({
          showMenuProfile: false
        })
      }
      // if(showMenuProfile){
      //   showMenuProfile = false;
      // } else {
      //   showMenuProfile = true;
      // }
      
    }
  }

  onClickShowMenuProfile(){
    this.setState({
      showMenuProfile: this.state.showMenuProfile ? false: true
    })
  }

  onClickChangePassword(){
    this.setState({
      showChangePassword: true
    });
  }

  onCloseChangePassword(){
    this.setState({
      showChangePassword: false
    });
  }

  logout() {
    localStorage.removeItem(Constants.COMMON.TOKEN);
    localStorage.removeItem(Constants.COMMON.USER_INFO);
    localStorage.removeItem(Constants.COMMON.ACCESS_PARAM);
    location.href = '/login'
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

