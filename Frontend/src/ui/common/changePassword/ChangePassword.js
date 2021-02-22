import React, { Component } from 'react';
import BaseComponent from '../../BaseComponent';
import ChangePasswordJsx from './ChangePassword.jsx';
import Libs from '../../../utils/Libs';
import ChangePasswordValidate from './ChangePasswordValidate';
import LoginService from '../../../services/LoginService';
import cloneDeep from 'lodash-es/cloneDeep';

class ChangePassword extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      curItem: {}
    };
    this.jsxTemplate = ChangePasswordJsx;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handRegisterEnterChange = this.handRegisterEnterChange.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
  }

  handRegisterEnterChange = (event) => {
    // var _this = $(event.target);
    if (event.which === 13) {
      this.onSaveChangePassword();
    }
  }

  /**
     * setValue method to Input
     * @author Long.Pham 2020-09-03
     */
  handleInputChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name) {
      let curItem = this.state.curItem;
      if (name == 'old_password') {
        if (value.length < 8) {
          setValidateMessage({ old_password: trans.translate('LOGIN.password_valid_min_8character') }, true);
        } else {
          setValidateMessage({ old_password: '' }, true);
        }
      }

      // const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
      if (name == 'password') {
        // if (value.length < 6 || regexp.exec(value) == null) {
        if (value.length < 8) {
          setValidateMessage({ password: trans.translate('LOGIN.password_valid_min_8character') }, true);
        } else {
          setValidateMessage({ password: '' }, true);
        }
      }

      if (name == 'password_confirm') {
        if (curItem.password != value) {
          setValidateMessage({ password_confirm: trans.translate('LOGIN.password_incorrect') }, true);
        } else {
          setValidateMessage({ password_confirm: '' }, true);
        }
      }

      curItem[name] = value;
      this.setState({
        curItem: curItem
      });
    }
  }


  /**
    * @description validate a field input
    * @author long.pham 2020-09-03
    * @param {*} event 
    */
  async validateOne(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value
    if (name) {
      let param = {
        [name]: value
      }
      let v = new ChangePasswordValidate(null);
      let error = await v.validateOne(param, name);
      if (error != null) {
        setValidateMessage(error, true);
      }
    }
  }



  async onSaveChangePassword() {
    let curItem = this.state.curItem, self = this;
    let param = cloneDeep(this.state.curItem);
    let v = new ChangePasswordValidate();
    let errors = await v.FLValidationAll(curItem);
    let stateError = false;
    if (errors) {
      setValidateMessage(errors);
      stateError = true;
    }

    // const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    // if (Libs.isBlank(param.password) || param1.password.length < 6 || regexp.exec(param1.password) == null) {
    if (Libs.isBlank(param.password) || param.password.length < 8) {
      setValidateMessage({ password: trans.translate('LOGIN.password_valid_min_8character') }, true);
      stateError = true;
    } else {
      setValidateMessage({ password: '' }, true);
    }

    if (curItem.password == curItem.old_password) {
      setValidateMessage({ password: trans.translate('LOGIN.password_different') }, true);
      stateError = true;
    } else {
      setValidateMessage({ password: '' }, true);
    }

    if (param.password != param.password_confirm) {
      setValidateMessage({ password_confirm: trans.translate('LOGIN.password_incorrect') }, true);
      stateError = true;
    } else {
      setValidateMessage({ password_confirm: '' }, true);
    }



    if (stateError == true) { return; }
    //remove message validation
    removeAllValidateMessage();
    param.id = this.user.id_user;
    param.email = this.user.user_name;
    param.password = Libs.md5(param.password);
    param.old_password = Libs.md5(param.old_password);
    delete param.password_confirm;
    LoginService.instance.ChangePassword(param, (status, data, msg) => {
      if (status) {
        self.toast(msg, 'info');
        self.props.onCloseChangePassword();
        localStorage.removeItem(Constants.COMMON.TOKEN);
        localStorage.removeItem(Constants.COMMON.USER_INFO);
        localStorage.removeItem(Constants.COMMON.ACCESS_PARAM);
        
        setTimeout(function () {
					window.location.href = Constants.FRONT_SITE_URL.LOGIN;
        }.bind(this), 1000);
        
      } else {
        if (data) {
          setValidateMessage(data);
        } else {
          if (!Libs.isBlank(msg)) {
            self.toast(msg, 'error');
          }
        }

      }
    }, true);
  }

  render() {
    return this.jsxTemplate.call(this);
  }

}

export default ChangePassword;