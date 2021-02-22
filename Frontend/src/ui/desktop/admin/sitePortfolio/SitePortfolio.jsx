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
import Libs from '../../../../utils/Libs';

export default function () {
  var { dataList, searchParam, curMouse, alerts } = this.state;
  var timeAgo = '';
  if (this.state.time.h > 0) {
    timeAgo = this.state.time.h + (this.state.time.h > 1 ? " hours " : " hour ") + this.state.time.m + (this.state.time.m > 1 ? " minutes " : " minute ") + this.state.time.s + (this.state.time.s > 1 ? " seconds ago" : " second ago");
  } else if (this.state.time.m > 0) {
    timeAgo = this.state.time.m + (this.state.time.m > 1 ? " minutes " : " minute ") + this.state.time.s + (this.state.time.s > 1 ? " seconds ago" : " second ago");
  } else {
    timeAgo = this.state.time.s + (this.state.time.s > 1 ? " seconds ago" : " second ago");
  }

  var totalSite = 0, totalCapacity = 0, totalThroughut = 0;
  var RowItems = null;
  if (Libs.isArrayData(dataList)) {
    RowItems = dataList.map((item, index) => {
      totalSite = totalSite + 1;
      totalCapacity = totalCapacity + item.dc_capacity;
      if (!Libs.isBlank(item.energy_now)) {
        totalThroughut = totalThroughut + item.energy_now;
      }

      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        _onMouseOver={this._onMouseOver}
        _onMouseOut={this._onMouseOut}
      />
    });
  }

  var convertTotalCapacity = null;
  if (Libs.isBlank(totalCapacity) || totalCapacity <= 0) {
    convertTotalCapacity = <p><strong>0 </strong> KW</p>;
  } else if (totalCapacity >= 1000000) {
    convertTotalCapacity = <p><strong>{Number.parseFloat(totalCapacity / 1000000).toFixed(3)} </strong> GW</p>;
  } else if (totalCapacity >= 1000 && totalCapacity < 1000000) {
    convertTotalCapacity = <p><strong>{Number.parseFloat(totalCapacity / 1000).toFixed(3)} </strong> MW</p>;
  } else {
    convertTotalCapacity = <p><strong>{Number.parseFloat(totalCapacity).toFixed(2)} </strong> KW</p>;
  }

  var convertThroughut = null;
  if (Libs.isBlank(totalThroughut) || totalThroughut <= 0) {
    convertThroughut = <p><strong>0 </strong> KW</p>;
  } else if (totalThroughut >= 1000000) {
    convertThroughut = <p><strong>{Number.parseFloat(totalThroughut / 1000000).toFixed(3)} </strong> GW</p>;
  } else if (totalThroughut >= 1000 && totalThroughut < 1000000) {
    convertThroughut = <p><strong>{Number.parseFloat(totalThroughut / 1000).toFixed(3)} </strong> MW</p>;
  } else {
    convertThroughut = <p><strong>{Number.parseFloat(totalThroughut).toFixed(2)} </strong> KW</p>;
  }

  var layoutShowFilter = this.state.showFilter ?
    <FilterPopup
      onCloseFilterPopup={this.onCloseFilterPopup.bind(this)}
      callBackFilter={this.callBackFilter.bind(this)}
      callBackReset={this.callBackReset.bind(this)}
    />
    : "";

  var rowAlertItem = null;
  if (Libs.isArrayData(alerts)) {
    rowAlertItem = alerts.map(function (v, i) {
      return <li key={i}><span className={v.class_name}>{v.level_name}</span>{v.message}  <var>{v.devicename}</var></li>
    });
  }
  return (
    <section className="portfolio">
      {layoutShowFilter}
      {Libs.isArrayData(alerts) ?
        <div ref="myAlert" id="myAlert" className="list-alert-hover" style={{ top: curMouse.top, left: curMouse.left + 50, display: curMouse.display, bottom: curMouse.bottom }}>
          <ul>
            {rowAlertItem}
          </ul>
          {curMouse.totalError > 8 ? <div className="readmore"><a>Readmore</a></div> : ""}
        </div>
        : ""}


      <div className="list-summary">
        <ul className="row">
          <li className="col-xl-3 col-md-3 col-12">
            <div className="item">
              <h2>Total Sites</h2>
              <p><strong>{totalSite}</strong> Sites</p>
            </div>
          </li>

          <li className="col-xl-3 col-md-3 col-12">
            <div className="item">
              <h2>Total Capacity</h2>
              {convertTotalCapacity}
            </div>
          </li>

          <li className="col-xl-3 col-md-3 col-12">
            <div className="item">
              <h2>Total Throughput</h2>
              {convertThroughut}
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
                  </ul>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <ul className="portfolio-fnc float-right">
                    <li>
                      <div className="search">
                        <RText
                          inputClass="form-control"
                          placeholder="Search"
                          inputName="name"
                          inputId="name" inputName="name"
                          value={searchParam.name}
                          onChange={(e) => { this.handleInputChange(e); }}
                          onBlur={(e) => { this.handleOnBlueSearch(e); }}
                          maxLength={200} />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="box-header">
              <div className="header-row">
                <div className="header-col width10">
                </div>
                <div onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column == "name" ?
                  "header-col width35 sorting " + searchParam.order_by : "header-col width35 sorting "}>Name</div>
                <div onClick={e => this.onSort(e, 'dc_capacity')} className={searchParam.sort_column == "dc_capacity" ?
                  "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting "}>System Size</div>

                <div onClick={e => this.onSort(e, 'energy_now')} className={searchParam.sort_column == "energy_now" ?
                  "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting "}>Now</div>
                <div className="header-col text-center width10">
                  <img src="/assets/images/weather2.png" style={{ width: "20px" }} />
                </div>
                <div className="header-col width15fix">Irradiance (W/m<sup className="sup">2</sup> )</div>
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