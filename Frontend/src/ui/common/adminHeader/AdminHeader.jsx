import React from 'react';
import Libs from '../../../utils/Libs';
import AdminChangePassword from '../adminChangePassword/AdminChangePassword';

export default function () {
  var user = this.admin;
  var layoutAdminChangePassword = this.state.showChangePassword ?
    <AdminChangePassword
      onCloseChangePassword={this.onCloseChangePassword.bind(this)}
    />
    : '';
  return (
    <div className="main_header">
      {layoutAdminChangePassword}
      <section className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="logo">
                
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <ul className="menu_bar text-right">
                <li className="notification">
                  <a><span className="icon icon-alert"></span><var>10</var></a>
                </li>
                <li ref={this.wrapperRef} onClick={this.onClickShowMenuProfile.bind(this)} className= {this.state.showMenuProfile ? "user_menu on" : "user_menu"}>
                  <a>{user.fullname} 
                  {!Libs.isBlank(user.logo) ? <img src={Constants.SERVER_DATA + user.logo} />: <img src="/assets/images/userprofile.png" /> }
                  
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