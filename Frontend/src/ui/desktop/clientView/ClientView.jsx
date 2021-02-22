
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Libs from '../../../utils/Libs';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import RowItemChart from './RowItemChart';
import RowItemMeter from './RowItemMeter';
import Constants from '../../../utils/Constants';

export default function () {
  var { curItem, chartOption, dataListMeter } = this.state;
  var dataRowItemChart = Libs.isObjectEmpty(chartOption) ? null : <RowItemChart chartOption={chartOption} />;

  var RowItemMeters = null;

  if (Libs.isArrayData(dataListMeter)) {
    RowItemMeters = dataListMeter.map((item, index) => {
      return <RowItemMeter
        key={'row_item_' + index}
        index={index}
        dataItem={item}
      />
    });
  }

  var alarmItems = null;
  if (Libs.isArrayData(curItem.activeAlarm)) {
    alarmItems = curItem.activeAlarm.map((item, index) => {
      return <div className="card">
        <div className="card-header" id="plant-energy">
          <h2 className="mb-0">
            <a className="collapsed" data-toggle="collapse" data-target={"#collapse-energy" + index} aria-expanded="true" aria-controls={"collapse-energy" + index}>
              {item.message} </a>
          </h2>
        </div>

        <div id={"collapse-energy" + index} className="collapse" aria-labelledby={"plan-energy" + index} data-parent="#accordionAlarm">
          <div className="card-body">
            <div className="content">
              <ul className="row">
                <li className="col-md-12">
                  <div className="item">
                    <NavLink to={"/client/alerts/" + item.id_site + "/" + item.id}>
                      <div className="row">
                        <div className="col-md-7">{item.devicename}</div>
                        <div className="col-md-5 text-right">
                          {item.times_ago > 0 ? item.times_ago : ""}
                          {" " + item.times_ago_unit}
                          {item.times_ago > 1 && "s"} ago

                        </div>
                      </div>
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    });
  }

  var timeFormat = '';
  if (!Libs.isObjectEmpty(curItem) && !Libs.isBlank(curItem.localization_format)) {
    switch (curItem.kpiActive) {
      case 'month':
        timeFormat = !Libs.isBlank(curItem.localization_format) ? ((curItem.localization_format).replace(/dd\/|dd|-dd|.dd|dd-|dd./gi, "")) : "MM/yyyy";
        break;
      case 'year':
        timeFormat = 'yyyy';
        break;
      default:
        timeFormat = !Libs.isBlank(curItem.localization_format) ? curItem.localization_format : 'MM/dd/yyyy';
        break;
    }
  }

  return (
    <section className="client_view">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">{curItem.name}</li>
              </ol>
            </nav>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="title">{curItem.name}</div>
                <div className="your_system_content">
                  <div className="filter">
                    <ul>
                      <li><a onClick={this.onClickShowMap.bind(this, false)} className={!this.state.showMap ? "active" : ""} title="Information"><span className="icon icon-info"></span></a></li>
                      <li><a onClick={this.onClickShowMap.bind(this, true)} className={this.state.showMap ? "active" : ""} title="View address"><span className="icon icon-street-view"></span></a></li>
                    </ul>
                  </div>

                  <div className="content">
                    {this.state.showMap ?
                      <div className="map">
                        <LoadScript id="script-loader" googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
                          <GoogleMap id='map' zoom={5} center={{ lat: curItem.lat, lng: curItem.lng }} >
                            <Marker position={{ lat: curItem.lat, lng: curItem.lng }} icon="/assets/images/place.png" />
                          </GoogleMap>
                        </LoadScript>
                        <div className="map_info">
                          <p className="address"><strong>{curItem.street}</strong></p>
                          <p className="address">{curItem.address_short}</p>
                          <p className="address">{curItem.postal_code}</p>
                          <p className="date">{curItem.commissioning}</p>
                          <p className="value">{Libs.formatElectricalPowerUnit(curItem.dc_capacity, 'p')}</p>
                        </div>
                      </div>
                      :
                      <div className="info">
                        {!Libs.isBlank(curItem.gallery) ? <img src={Constants.SERVER_DATA + curItem.gallery} /> : <img src="/assets/images/default_clienthome_pic.jpg" /> }
                        
                        <div className="system_info">
                          <div className="row">
                            <div className="col-md-4">
                              <p className="sun"><img src="/assets/images/113.png" /></p>
                              <p className="value">27°C</p>
                              <p className="sub_value"><span>27 </span> <span>36</span></p>
                            </div>
                            <div className="col-md-4">
                              <p className="sun"><img src="/assets/images/114.png" /></p>
                              <p className="value">THURSDAY</p>
                              <p className="sub_value"><var className="icon icon-location-arrow"></var> <span>0 km/h </span></p>
                            </div>
                            <div className="col-md-4">
                              <p className="sun"><img src="/assets/images/115.png" /></p>
                              <p className="value">FRIDAY</p>
                              <p className="sub_value"><var className="icon icon-044-umbrella"></var> <span>0.0 mm </span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    }



                  </div>

                </div>


              </div>
              <div className="col-xl-8 col-lg-8 col-md-8">
                <div className="title">Chart (KPI)</div>
                <div className="historical_chart">
                  <div className="row">
                    <div className="col-md-2 col-sm-3">
                      {!Libs.isBlank(timeFormat) ?
                        <FLDatePicker
                          value={curItem.kpi_filter}
                          inputId="kpi_filter"
                          showMonthYearPicker={curItem.kpiActive == "month" ? true : false}
                          showYearPicker={curItem.kpiActive == "year" ? true : false}
                          dateFormat={timeFormat}
                          yearItemNumber={curItem.kpiActive == "year" ? 8 : null}
                          inputClass="form-control"
                          inputName="kpi_filter"
                          timeActive={curItem.kpiActive}
                          maxDate={curItem.max_date}
                          handleChange={this.handleDateInputChange.bind(this)}
                          maxLength={20}
                        />
                        : ""}

                    </div>

                    <div className="col-md-10 col-sm-9 text-right">

                      <ul>
                        <li><a onClick={this.onChangeDateKPI.bind(this, "day")} className={curItem.kpiActive == "day" ? "active" : ""}>Day</a></li>
                        <li><a onClick={this.onChangeDateKPI.bind(this, "month")} className={curItem.kpiActive == "month" ? "active" : ""}>Month</a></li>
                        <li><a onClick={this.onChangeDateKPI.bind(this, "year")} className={curItem.kpiActive == "year" ? "active" : ""}>Year</a></li>
                      </ul>
                    </div>

                  </div>
                  {dataRowItemChart}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="title">Plant Parameters</div>
                <div className="plant_parameters">
                  <div className="accordion" id="accordionParameters">
                    <div className="card">
                      <div className="card-header" id="plant-energy">
                        <h2 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" data-target="#collapse-energy" aria-expanded="true" aria-controls="collapse-energy">
                            <var className="icon icon-caret-right" />Plant Energy <span className="float-right">0 kWh</span></a>
                        </h2>
                      </div>

                      <div id="collapse-energy" className="collapse show" aria-labelledby="plant-energy" data-parent="#accordionParameters">
                        <div className="card-body">
                          <div className="content">
                            <ul className="row">
                              {RowItemMeters}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" id="plant-power">
                        <h2 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" data-target="#collapsePower" aria-expanded="false" aria-controls="collapsePower">
                            <var className="icon icon-caret-right" /> Plant Power <span className="float-right">-0.04 kW</span> </a>
                        </h2>
                      </div>
                      <div id="collapsePower" className="collapse" aria-labelledby="plant-power" data-parent="#accordionParameters">
                        <div className="card-body">
                          <div className="content">
                            <ul className="row">
                              {RowItemMeters}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" id="plant-irradiance">
                        <h2 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" data-target="#collapseIrradiance" aria-expanded="false" aria-controls="collapseIrradiance">
                            <var className="icon icon-caret-right" /> Plant Irradiance (Tilted) <span className="float-right">-0.04 kWh/m2</span> </a>
                        </h2>
                      </div>
                      <div id="collapseIrradiance" className="collapse" aria-labelledby="plant-irradiance" data-parent="#accordionParameters">
                        <div className="card-body">
                          <div className="content">
                            <ul className="row">
                              {RowItemMeters}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" id="plant-insolation">
                        <h2 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" data-target="#collapseInsolation" aria-expanded="false" aria-controls="collapseInsolation">
                            <var className="icon icon-caret-right" /> Plant Insolation (Tilted) <span className="float-right">0 kWh/m2</span></a>
                        </h2>
                      </div>
                      <div id="collapseInsolation" className="collapse" aria-labelledby="plant-insolation" data-parent="#accordionParameters">
                        <div className="card-body">
                          <div className="content">
                            <ul className="row">
                              {RowItemMeters}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" id="plant-pr">
                        <h2 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" data-target="#collapsePR" aria-expanded="false" aria-controls="collapsePR">
                            <var className="icon icon-caret-right" /> Plant PR <span className="float-right">0 %</span></a>
                        </h2>
                      </div>
                      <div id="collapsePR" className="collapse" aria-labelledby="plant-pr" data-parent="#accordionParameters">
                        <div className="card-body">
                          <div className="content">
                            <ul className="row">
                              {RowItemMeters}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="card">
                      <div className="card-header" id="plant-temperature ">
                        <h2 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" data-target="#collapseTemperature" aria-expanded="false" aria-controls="collapseTemperature">
                            <var className="icon icon-caret-right" /> Plant Temperature (Panel)  <span className="float-right">012.00 ºC</span></a>
                        </h2>
                      </div>
                      <div id="collapseTemperature" className="collapse" aria-labelledby="plant-temperature" data-parent="#accordionParameters">
                        <div className="card-body">
                          <div className="content">
                            <ul className="row">
                              {RowItemMeters}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="title">Production Equivalences</div>

                <div className="equivalences_content">
                  <div className="filter">
                    <div className="row">
                      <div className="col-md-8">
                        <ul>
                          <li><a onClick={this.onClickChangeFilter.bind(this, "day")} className={curItem.timeActive == "day" ? "active" : ""}>Day</a></li>
                          <li><a onClick={this.onClickChangeFilter.bind(this, "month")} className={curItem.timeActive == "month" ? "active" : ""}>Month</a></li>
                          <li><a onClick={this.onClickChangeFilter.bind(this, "year")} className={curItem.timeActive == "year" ? "active" : ""}>Year</a></li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <div className="filter_datapicker">
                          <FLDatePicker
                            value={curItem.date_filter}
                            inputId="date_filter"
                            showMonthYearPicker={curItem.timeActive == "month" ? true : false}
                            showYearPicker={curItem.timeActive == "year" ? true : false}
                            dateFormat={curItem.timeActive == "month" ? "MM/yyyy" : (curItem.timeActive == "year") ? "yyyy" : "MM/dd/yyyy"}
                            yearItemNumber={curItem.timeActive == "year" ? 8 : null}
                            inputClass="form-control"
                            inputName="date_filter"
                            timeActive={curItem.timeActive}
                            maxDate={curItem.max_date}
                            handleChange={this.handleDateInputChange.bind(this)}
                            maxLength={20}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="content">
                    <ul className="row">
                      <li className="col-md-12">
                        <div className="row">
                          <div className="col-md-6"><span className="icon icon-plug"></span> <span className="name">Energy</span></div>
                          <div className="col-md-6 text-right"><strong>4,814.00</strong> <span className="label">kWh</span></div>
                        </div>
                      </li>

                      <li className="col-md-12">
                        <div className="row">
                          <div className="col-md-6"><span className="icon icon-internet-1"></span> <span className="name">Homes</span></div>
                          <div className="col-md-6 text-right"><strong>254.35</strong> <span className="label">homes</span></div>
                        </div>
                      </li>

                      <li className="col-md-12">
                        <div className="row">
                          <div className="col-md-6"><span className="icon icon-factory"></span> <span className="name">C02 electricity</span></div>
                          <div className="col-md-6 text-right"><strong>439.83</strong> <span className="label">kg</span></div>
                        </div>
                      </li>

                      <li className="col-md-12">
                        <div className="row">
                          <div className="col-md-6"><span className="icon icon-083-fuel-station"></span> <span className="name">CO2 Gas</span></div>
                          <div className="col-md-6 text-right"><strong>157.65</strong> <span className="label">liters</span></div>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>

              </div>
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="title">Active Alarms</div>

                <div className="active-alarm">
                  {alarmItems ?
                    <div className="plant_parameters">
                      <div className="accordion" id="accordionAlarm">
                        {alarmItems}
                      </div>
                    </div>
                    :
                    <div className="data-empty">There are no active alarms.</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}