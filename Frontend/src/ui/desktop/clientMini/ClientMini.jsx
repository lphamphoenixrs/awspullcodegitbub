import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
import Libs from '../../../utils/Libs';
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default function () {
  var { curItem, chartOption, paramsFilter } = this.state;
  
  return (
    <section className="client_mini">
      <div className="view_header">
        <p>Site: {curItem.name}</p>
      </div>

      <div className="view_left">
        <ul>
          <li>
            <div className="item">
              <p className="value"> {!Libs.isBlank(curItem.ac_power) && curItem.ac_power > 0 ? (curItem.ac_power + " kW") : "-"} </p>
              <p className="label">Power</p>
            </div>
          </li>

          <li>
            <div className="item">
              <p className="value"> {!Libs.isBlank(curItem.energy_today) && curItem.energy_today > 0 ? Libs.formatElectricalPowerUnit(curItem.energy_today, 'h') : "-"} </p>
              <p className="label">Today</p>
            </div>
          </li>

          <li>
            <div className="item">
              <p className="value"> {!Libs.isBlank(curItem.energy_this_month) && curItem.energy_this_month > 0 ? Libs.formatElectricalPowerUnit(curItem.energy_this_month, 'h') : "-"}  </p>
              <p className="label">This month</p>
            </div>
          </li>

          <li>
            <div className="item">
              <p className="value"> {!Libs.isBlank(curItem.energy_this_year) && curItem.energy_this_year > 0 ? Libs.formatElectricalPowerUnit(curItem.energy_this_year, 'h') : "-"} </p>
              <p className="label">This year</p>
            </div>
          </li>

          <li>
            <div className="item">
              <p className="value"> {!Libs.isBlank(curItem.energy_lifetime) && curItem.energy_lifetime > 0 ? Libs.formatElectricalPowerUnit(curItem.energy_lifetime, 'h') : "-"} </p>
              <p className="label">Lifetime</p>
            </div>
          </li>

        </ul>
      </div>

      <div className="view_body">
        <div className="filter">
          <div className="row">
            <div className="col-xl-2 col-xl-2 col-md-2 text-center">
              {paramsFilter.filterBy != 'lifetime' ?
                <div className="group-prev">
                  {paramsFilter.filterBy != 'day'  && paramsFilter.filterBy != 'month' && paramsFilter.filterBy != 'year' ? <a onClick={this.onClickBackward.bind(this)} className="step"><span className="icon icon-backward"></span></a> : ''}

                  <a className="step" onClick={this.onClickPrev.bind(this)}><span className="icon icon-caret-left"></span></a>
                </div>
                : ''}

            </div>
            <div className="col-xl-8 col-xl-8 col-md-8">
              <ul>
                <li><a onClick={this.onChangeFilterBy.bind(this, 'day')} className={paramsFilter.filterBy == 'day' ? "active" : ""}>Day</a></li>
                <li><a onClick={this.onChangeFilterBy.bind(this, 'threeDay')} className={paramsFilter.filterBy == 'threeDay' ? "active" : ""}>3 day</a></li>
                <li><a onClick={this.onChangeFilterBy.bind(this, 'month')} className={paramsFilter.filterBy == 'month' ? "active" : ""}>Month</a></li>
                <li><a onClick={this.onChangeFilterBy.bind(this, 'year')} className={paramsFilter.filterBy == 'year' ? "active" : ""}>Year</a></li>
                <li><a onClick={this.onChangeFilterBy.bind(this, 'lifetime')} className={paramsFilter.filterBy == 'lifetime' ? "active" : ""}>Lifetime</a></li>
              </ul>
            </div>
            <div className="col-xl-2 col-xl-2 col-md-2 text-center">
              {this.state.showNextBtn && paramsFilter.filterBy != 'lifetime' ?
                <div className="group-next">
                  <a className="step" onClick={this.onClickNext.bind(this)}><span className="icon icon-caret-right"></span></a>
                  {paramsFilter.filterBy != 'day' && paramsFilter.filterBy != 'month'  && paramsFilter.filterBy != 'year' ? <a onClick={this.onClicForward.bind(this)} className="step"><span className="icon icon-forward"></span></a> : ''}
                </div>
                : ""}

            </div>
          </div>

        </div>

        <div className="operating_chart">
          <div id="operating_container" className="operating_container">
            {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}

          </div>

        </div>
        <div className="operating_system">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <p>System size: <span>{curItem.dc_capacity} kW</span></p>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6">
              <p>Operating since: <span>
                {!Libs.isBlank(curItem.built_since) && !Libs.isBlank(curItem.localization_format) ? 
                Libs.dateFormat(curItem.commissioning, (curItem.localization_format).replace(/%/gi, "").toUpperCase(), 'MM/DD/YYYY HH:mm:ss')
                : ""}
                </span></p>
            </div>

          </div>
        </div>
      </div>

      <div className="view_right">
        <div className="title">
          <ul>
            <li>Our impact: </li>
            <li><a onClick={this.onChangeOurImpact.bind(this, 1)} className={this.state.ourImpact == 1 ? "active" : ""}>Month</a></li>
            <li><a onClick={this.onChangeOurImpact.bind(this, 2)} className={this.state.ourImpact == 2 ? "active" : ""}>Lifetime</a></li>
          </ul>
        </div>

        <div className="content">
          <ul>
            <li>
              <div className="item">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <img src="/assets/images/Treeglass.png" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8">
                    <p className="name trees">trees</p>
                    <p className="value">1,622</p>
                    <p className="label">Trees planted</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="item">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <img src="/assets/images/Gas.png" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8">
                    <p className="name gas">Gas</p>
                    <p className="value">7,116</p>
                    <p className="label">Gallons of gasoline</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="item">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <img src="/assets/images/Energy.png" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8">
                    <p className="name energy">Energy</p>
                    <p className="value">12.4 GWh</p>
                    <p className="label">Energy produced</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="item">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <img src="/assets/images/waterglass.png" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8">
                    <p className="name water">water</p>
                    <p className="value">6,196,423</p>
                    <p className="label">Gallons of water</p>
                  </div>
                </div>
              </div>
            </li>


          </ul>
        </div>
      </div>

      <div className="view_footer">
        Last Update: {!Libs.isObjectEmpty(curItem) && !Libs.isBlank(curItem.localization_format) ? moment().format((curItem.localization_format).replace(/%/gi, "").toUpperCase() + ' h:mm:ss A') : "" }

      </div>

    </section>
  )
}