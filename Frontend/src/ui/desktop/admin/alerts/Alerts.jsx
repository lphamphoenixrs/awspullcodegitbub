/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import RowItem from './RowItem';
import { RText } from '../../../../component/Controls';
import Clock from './Clock';
import FilterPopup from './FilterPopup';
import TimeBetweenPopup from './TimeBetweenPopup';

export default function () {
  var { dataList, searchParam } = this.state;
  var timeAgo = '';
  if (this.state.time.h > 0) {
    timeAgo = this.state.time.h + (this.state.time.h > 1 ? " hours " : " hour ") + this.state.time.m + (this.state.time.m > 1 ? " minutes " : " minute ") + this.state.time.s + (this.state.time.s > 1 ? " seconds ago" : " second ago");
  } else if (this.state.time.m > 0) {
    timeAgo = this.state.time.m + (this.state.time.m > 1 ? " minutes " : " minute ") + this.state.time.s + (this.state.time.s > 1 ? " seconds ago" : " second ago");
  } else {
    timeAgo = this.state.time.s + (this.state.time.s > 1 ? " seconds ago" : " second ago");
  }

  var totalError = 0, lowPriority = 0, highPriority = 0;
  var RowItems = null;
  if (Libs.isArrayData(dataList)) {
    RowItems = dataList.map((item, index) => {
      totalError = totalError + 1;
      if (item.priority == 1) { lowPriority = lowPriority + 1; } else if (item.priority == 2) { highPriority = highPriority + 1 }
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
      />
    });
  }

  var layoutShowFilter = this.state.showFilter ?
    <FilterPopup
      onCloseFilterPopup={this.onCloseFilterPopup.bind(this)}
      callBackFilter={this.callBackFilter.bind(this)}
      callBackReset={this.callBackReset.bind(this)}
    />
    : "";

  var layoutTimeBetween = this.state.showBetweenTime ?
    <TimeBetweenPopup
      curItem={searchParam}
      onCloseTimeBetweenPopup={this.onCloseTimeBetweenPopup.bind(this)}
      callBackSetTime={this.callBackSetTime.bind(this)}
      callBackReset={this.callBackReset.bind(this)}
    />
    : "";


  return (
    <section className="alerts">
      {layoutShowFilter}
      {layoutTimeBetween}
      <div className="list-summary">
        <ul className="row">
          <li className="col-xl-3 col-md-3 col-12">
            <div className="item">
              <h2>Total Alerts</h2>
              <p><strong>{totalError}</strong></p>
            </div>
          </li>

          <li className="col-xl-3 col-md-3 col-12">
            <div className="item">
              <h2>High Priority Alerts</h2>
              <p><strong>{highPriority} </strong></p>
            </div>
          </li>

          <li className="col-xl-3 col-md-3 col-12">
            <div className="item">
              <h2>Low  Priority Alerts</h2>
              <p><strong>{lowPriority} </strong></p>
            </div>
          </li>
        </ul>
      </div>



      <div className="body">
        <div className="form-content">
          <div className="title">
            <div className="container-fluid">
              <div className="row">

                <div className="col-xl-6 col-lg-6 col-md-6">
                  <ul className="portfolio-fnc">
                    <li><a onClick={this.onClickRefresh.bind(this)}><span className="icon icon-refresh-2"></span> Refresh</a></li>
                    <li><a onClick={this.onClickShowFilter.bind(this)}><span className="icon icon-filter"></span> Filter</a></li>
                    <li onClick={this.onCLickViewHistory.bind(this, false)} className={!this.state.viewHistory ? "review active" : "review"}><a>Active</a></li>
                    <li onClick={this.onCLickViewHistory.bind(this, true)} className={this.state.viewHistory ? "review active" : "review"}><a>View previous alerts</a></li>
                  </ul>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <ul className="portfolio-fnc float-right">
                    <li>
                      <div className="search">
                        <RText
                          inputClass="form-control"
                          placeholder="Search site name"
                          inputName="site_name"
                          inputId="site_name" inputName="site_name"
                          value={searchParam.site_name}
                          onChange={(e) => { this.handleInputChange(e); }}
                          onBlur={(e) => { this.handleOnBlueSearch(e); }}
                          onKeyPress={event => event.key === 'Enter' && this.getList()}
                          maxLength={200} />
                      </div>
                    </li>
                    <li>
                      <a className="export-file" onClick={this.exportToCSV.bind(this)}>Export file</a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          {this.state.viewHistory ?
            <div className="filter-history">
              <ul>
                <li onClick={this.filterByTime.bind(this, 'day')} className={searchParam.timeActive == 'day' ? "active" : ""}><span>Day</span></li>
                <li onClick={this.filterByTime.bind(this, 'week')} className={searchParam.timeActive == 'week' ? "active" : ""}><span>Week</span></li>
                <li onClick={this.filterByTime.bind(this, 'month')} className={searchParam.timeActive == 'month' ? "active" : ""}><span>Month</span></li>
                <li onClick={this.filterByTime.bind(this, 'year')} className={searchParam.timeActive == 'year' ? "active" : ""}><span>Year</span></li>
                <li onClick={this.showFilterByTimeBetween.bind(this, 'between')} className="active"><span>{moment(searchParam.date_from).format('ll')} - {moment(searchParam.date_to).format('ll')}</span></li>
              </ul>
            </div>
            : ""}


          <div className="main">
            <div className="box-header">
              <div className="header-row">
                <div onClick={e => this.onSort(e, 'id_error_level')} className={searchParam.sort_column == "id_error_level" ?
                  "header-col width5 sorting " + searchParam.order_by : "header-col width5 sorting "}>Alert</div>

                <div onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column == "name" ?
                  "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting "}>Name</div>
                <div onClick={e => this.onSort(e, 'priority_name')} className={searchParam.sort_column == "priority_name" ?
                  "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting "}>Priority</div>

                <div className="header-col width20">Issue</div>

                <div className="header-col width15">Component</div>

                <div className="header-col width15">Opened</div>
                <div className="header-col width15fix">Open period</div>
              </div>
            </div>

            <div className="box-body scrollbar-inner">
              {RowItems ? RowItems : <div className="data-empty">Data empty</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="box-footer">
        <span>Last Refresh: <var>{timeAgo}</var></span>
        <Clock />
      </div>
    </section>
  )
}