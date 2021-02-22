import React, { Component } from 'react'
import HeaderJsx from './AdminHeader.jsx';
import AdminBaseComponent from '../../AdminBaseComponent';
import './AdminHeader.scss';


export default class AdminHeader extends AdminBaseComponent {
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
    localStorage.removeItem(Constants.COMMON.ADMIN_TOKEN);
    localStorage.removeItem(Constants.COMMON.ADMIN_INFO);
    localStorage.removeItem(Constants.COMMON.ADMIN_ACCESS_PARAM);
    location.href = '/admin'
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

