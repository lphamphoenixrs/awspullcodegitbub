import React from 'react';
import Libs from '../../../utils/Libs';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

import ListSitePopup from './listSite/ListSitePopup';

export default function () {
  var { curItem, dataFilter, chartParams, chartOption, weather, dataListSite } = this.state;

  var itemFilters = null;
  if (Libs.isArrayData(dataFilter)) {
    itemFilters = dataFilter.map((item, index) => {
      return <a onClick={this.onClickFilter.bind(this, item.id)} className={item.id == chartParams.id_filter ? "item active" : "item"}>{item.text}</a>
    })
  }

  var itemTimes = null;
  if (!Libs.isObjectEmpty(chartParams)) {
    switch (chartParams.id_filter) {
      case 'today':
        itemTimes = <p>
          <span onClick={this.onClickPrev.bind(this)} className="icon icon-left-arrow-1"></span>
          <label className="start-date">{moment(chartParams.end_date).format('ll')}</label>
          <span onClick={chartParams.showNextBtn ? this.onClickNext.bind(this) : null} className={!chartParams.showNextBtn ? "icon icon-right-arrow-1 disabled" : "icon icon-right-arrow-1"}></span>
        </p>
        break;
      case '12_month':
      case 'last_month':
      case 'this_month':
        itemTimes = <p>
          <span onClick={this.onClickPrev.bind(this)} className="icon icon-left-arrow-1"></span>
          <label className="start-date">{moment(chartParams.start_date).format('ll')}</label>
          <label className="pad-line">-</label>
          <label className="start-date">{moment(chartParams.end_date).format('ll')}</label>
          <span onClick={chartParams.showNextBtn ? this.onClickNext.bind(this) : null} className={!chartParams.showNextBtn ? "icon icon-right-arrow-1 disabled" : "icon icon-right-arrow-1"}></span>
        </p>
        break;

      case 'lifetime':
        itemTimes = <p>
          <span className="icon icon-left-arrow-1 disabled"></span>
          <label className="start-date">{moment(chartParams.start_date).format('ll')}</label>
          <label className="pad-line">-</label>
          <label className="start-date">{moment(chartParams.end_date).format('ll')}</label>
          <span className="icon icon-right-arrow-1 disabled"></span>
        </p>
        break;
    }
  }


  var energyCompare = null;
  if (!Libs.isObjectEmpty(curItem) && !Libs.isBlank(curItem.compare_energy_today)) {
    if (!Libs.isBlank(curItem.compare_energy_today) && curItem.compare_energy_today > 0) {
      energyCompare = <span className="compare-up"><label className="icon icon-line-up"></label> <var>{curItem.compare_energy_today}% </var> Up from yesterday</span>
    } else if(!Libs.isBlank(curItem.compare_energy_today) && curItem.compare_energy_today < 0) {
      energyCompare = <span className="compare-down"><label className="icon icon-line-down"></label> <var>{(curItem.compare_energy_today) * -1}% </var> Down from yesterday</span>
    } else {
      energyCompare = <span className="compare-equal"><label className="icon icon-double-arrow"></label> Equal to yesterday</span>
    }
  }

  var powerCompare = null;
  if (!Libs.isObjectEmpty(curItem) && !Libs.isBlank(curItem.compare_power_today)) {
    var comparePowerToday = curItem.compare_power_today;
    if (!Libs.isBlank(curItem.compare_power_today) && curItem.compare_power_today > 0) {
      powerCompare = <span className="compare-up"><label className="icon icon-line-up"></label> <var>{comparePowerToday}% </var> Up from yesterday</span>
    } else if(!Libs.isBlank(curItem.compare_power_today) && curItem.compare_power_today < 0) {
      powerCompare = <span className="compare-down"><label className="icon icon-line-down"></label> <var>{comparePowerToday * -1}% </var> Down from yesterday</span>
    } else {
      powerCompare = <span className="compare-equal"><label className="icon icon-double-arrow"></label> Equal to yesterday</span>
    }
  }


  var ListSitePopupLayout = this.state.showListSite ? <ListSitePopup onCloseListSitePopup={this.onCloseListSitePopup.bind(this)} curItem={curItem} dataList={dataListSite}
  /> : '';

  var energyLifetime = null;
  if (Libs.isBlank(curItem.energy_lifetime) || curItem.energy_lifetime <= 0) {
    energyLifetime = <p className="content"><span className="value">0 </span><span className="unit">kWh</span></p>;
  } else if (curItem.energy_lifetime >= 1000000) {
    energyLifetime = <p className="content"><span className="value">{Number.parseFloat(curItem.energy_lifetime / 1000000).toFixed(3)} </span><span className="unit">GWh</span></p>;
  } else if (curItem.energy_lifetime >= 1000 && curItem.energy_lifetime < 1000000) {
    energyLifetime = <p className="content"><span className="value">{Number.parseFloat(curItem.energy_lifetime / 1000).toFixed(3)} </span><span className="unit">MWh</span></p>;
  } else {
    energyLifetime = <p className="content"><span className="value">{Number.parseFloat(curItem.energy_lifetime).toFixed(2)} </span><span className="unit">kWh</span></p>;
  }

  return (
    <section className="customer-view">
      {ListSitePopupLayout}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 text-right">
            {!Libs.isBlank(curItem.name) ?
              <h1 onClick={this.openListSitePopup.bind(this)} className="title">Site: {curItem.name}
                {Libs.isArrayData(dataListSite) && dataListSite.length > 1 ? <span className="icon icon-menu"></span> : ""}
              </h1>
              : ""}

          </div>
        </div>
      </div>

      <div className="customer-view-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-9 col-md-9">
              <div className="summary">
                <ul className="row">
                  <li className="col-xl-4 col-lg-4 col-md-4">
                    <div className="item energy">
                      <h2 className="title">Energy today</h2>
                      <p className="content">
                        <span className="value">{!Libs.isBlank(curItem.energy_today) ? curItem.energy_today : 0}</span>
                        <span className="unit">kWh</span>
                      </p>
                      <p className="range">
                        {energyCompare}
                      </p>
                      <div className="icon-nt">
                        <img src="/assets/images/energy.png" />
                      </div>
                    </div>
                  </li>

                  <li className="col-xl-4 col-lg-4 col-md-4">
                    <div className="item power">
                      <h2 className="title">Peak Power</h2>
                      <p className="content">
                        <span className="value">{curItem.ac_power_today ? curItem.ac_power_today : 0}</span>
                        <span className="unit">kW</span>
                      </p>
                      <p className="range">
                        {powerCompare}
                      </p>
                      <div className="icon-nt">
                        <img src="/assets/images/power.png" />
                      </div>
                    </div>
                  </li>

                  <li className="col-xl-4 col-lg-4 col-md-4">
                    <div className="item irradiance">
                      <h2 className="title">Energy Lifetime</h2>
                      {energyLifetime}
                      {/* <p className="content">
                        <span className="value">{Libs.formatElectricalPowerUnit(curItem.energy_lifetime)}</span>
                        <span className="unit">W/M<var class="sup">2</var></span>
                      </p>
                      <p className="range">
                        {irradianceCompare}
                      </p> */}
                      <div className="icon-nt">
                        <img src="/assets/images/irradiance.png" />
                      </div>
                    </div>
                  </li>

                </ul>
              </div>

              <div className="view-chart">
                <div className="title">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h2><p onClick={this.exportToCSV.bind(this)}><span className="icon icon-direct-download"></span> Generation ({!Libs.isBlank(curItem.generation_total) && curItem.generation_total > 0 ? Libs.formatElectricalPowerUnit(curItem.generation_total, 'h') : "0 kWh"})</p></h2>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div ref={this.wrapperRef} className={chartParams.show_filter ? "filter on" : "filter"}>
                        <a onClick={this.onClickShowFilter.bind(this)} className="view">{chartParams.text_filter} <span className="icon icon-down-arrow"></span></a>
                        <div className="filter-dropdown">
                          {itemFilters}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="chart">
                  {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}
                  <div className="time-filter">
                    {itemTimes}
                  </div>
                </div>


                {!Libs.isBlank(curItem.lastUpdated) ?
                  <div className="update-time">
                    <p>Last updated on {curItem.lastUpdated}</p>
                  </div>
                  : ""}

              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-3">
              <div className="block-right">
                <ul className="row">
                  <li className="col-xl-12">
                    <div className="item">
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="temperature">
                            <p className="icon"><img src="/assets/images/arranged.png" /></p>
                            <p className="title">TEMPERATURE</p>
                            <p className="content">{!Libs.isObjectEmpty(weather) && !Libs.isBlank(weather.main) ? weather.main.temp : 0}<var class="sup">o</var></p>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="temperature">
                            <p className="icon"><img src="/assets/images/humidity.png" /></p>
                            <p className="title">HUMIDITY</p>
                            <p className="content">{!Libs.isObjectEmpty(weather) && !Libs.isBlank(weather.main) ? weather.main.humidity : 0}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="col-xl-12">
                    <div className="item item-sub tree">
                      <div className="plan-item"><img src="/assets/images/tree.png" /></div>
                      <p className="value">{curItem.total_tree}</p>
                      <p className="label">Equivalent Trees Planted</p>
                    </div>
                  </li>

                  <li className="col-xl-12">
                    <div className="item item-sub factory">
                      <div className="plan-item"><img src="/assets/images/factory.png" /></div>
                      <p className="value">{curItem.total_co2}</p>
                      <p className="label">Tons of CO2 Avoided</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="block-right two">
                <ul className="row">
                  <li className="col-xl-12">
                    <div className="item">
                      <p className="dc">PV System Size (kW-DC): <strong>{curItem.dc_capacity} kWp</strong></p>
                      <p className="dc">PV Nameplate (kW-AC): <strong>{curItem.ac_capacity} kW</strong></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}