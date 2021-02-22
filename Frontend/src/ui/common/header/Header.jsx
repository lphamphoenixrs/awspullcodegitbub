import React from 'react';
import Libs from '../../../utils/Libs';
import ChangePassword from '../changePassword/ChangePassword';

export default function () {
  var user = this.user;
  var layoutChangePassword = this.state.showChangePassword ?
    <ChangePassword
      onCloseChangePassword={this.onCloseChangePassword.bind(this)}
    />
    : '';
  return (
    <div className="main_header">
      {layoutChangePassword}
      <section className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="logo">
                <a><img src="/assets/images/logo-while.png" /></a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <ul className="menu_bar text-right">
                <li ref={this.wrapperRef} onClick={this.onClickShowMenuProfile.bind(this)} className= {this.state.showMenuProfile ? "user_menu on" : "user_menu"}>
                  <a>{user.fullname} 
                  <span className="avatar">{!Libs.isBlank(user.logo) ? <img src={Constants.SERVER_DATA + user.logo} />: <img src="/assets/images/userprofile.png" /> }</span>
                  
                  </a>
                  <ul>
                    <li><a onClick={this.onClickChangePassword.bind(this)}>Change password</a></li>
                    <li><a onClick={this.logout.bind(this)}>Logout</a></li>
                  </ul>
                </li>
                
              </ul>

            </div>
          </div>
        </div>
      </section>
    </div>

  )
}