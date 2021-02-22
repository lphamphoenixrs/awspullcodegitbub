import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';

export default function () {
  var { permissions } = this.state;
  var rowItems = null;
  if (Libs.isArrayData(permissions)) {
    rowItems = permissions.map((item, index) => {
      var classActive = item.path == "/management"  ? "index active": "active";
      var hasChild = (!Libs.isBlank(item.parent) && item.parent > 0) ? " has-child" : "";
      return <li key={index}>
        <NavLink className={hasChild} activeClassName={classActive + hasChild} to={item.path} >
          {!Libs.isBlank(item.class_icon) ? <span className={"icon " + item.class_icon }></span>  : ""}
          <var className="text">{item.screen_name}</var>
        </NavLink>
      </li>
    });
  }
  return (
    <div className="main_sidebar">
      <div className="monitoring"><NavLink to="/management">
        {this.state.is_show_menu ? <img src="/assets/images/logo-while.png" /> : <img src="/assets/images/logo-while-off.png" /> }
        
        </NavLink></div>
      <div className="sidebar-body">
        <div className="menu-box">
          <h2>{this.state.is_show_menu ? "Menu" : ""}</h2>
          <ul>
            {rowItems}
          </ul>
        </div>
      </div>

      <div className="sidebar-footer">
      {this.state.is_show_menu ? 
      <div className="what-new">
        <ul>
          <li><NavLink to="/what-new">What new? <span className="count">10</span></NavLink></li>
          <li><a href="mailto:service@phoenixrs.com">Help </a></li> 
        </ul>
      </div>
       : ""}
      
      <div className="expend"><span onClick = {this.onClickExpendMenu.bind(this)} className={!this.state.is_show_menu ? "icon icon-ex-logout" : "icon icon-logout"}></span></div>
        {this.state.is_show_menu ? <div className="copyright">Power by Next Wave Energy Monitoring, Inc.</div> : ""}
      </div>

    </div>

  )
}