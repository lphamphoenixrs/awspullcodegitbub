
import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import RowItemChart from './RowItemChart';
import RowItem from './RowItem';
import { CSVLink } from "react-csv";

export default function () {
  var { curItem, chartDayOption, chartMonthOption, dataListDevice } = this.state;

  var chartDay = Libs.isObjectEmpty(chartDayOption) ? null : <RowItemChart chartOption={chartDayOption} />;
  var chartMonth = Libs.isObjectEmpty(chartMonthOption) ? null : <RowItemChart chartOption={chartMonthOption} />;
  var RowItems = null;
  if (Libs.isArrayData(dataListDevice)) {
    RowItems = dataListDevice.map((item, index) => {
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        handleDeviceChange={this.handleDeviceChange}
      />
    });
  }

  console.log("curItem: ",curItem);
  return (
    <section className="client-device">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item"><NavLink to={"/client/" + curItem.id}>{curItem.name}</NavLink></li>
              </ol>
            </nav>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="title">Devices</div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            {RowItems ?
              <div className="element-type">
                <h2>List</h2>
                <div className="element-content">
                  <ul>{RowItems}</ul>
                </div>
              </div>
              : ""}
          </div>

          <div className="col-xl-8 col-lg-8 col-md-8">
            {!Libs.isObjectEmpty(curItem.device) ? <h1>Device name: {curItem.device.name}</h1> : ""}
            {!Libs.isObjectEmpty(curItem) ?
              <div className="chart">
                <div className="filter-group">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3">
                      <FLDatePicker
                        value={curItem.date_from}
                        inputId="date_from"
                        dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                        inputClass="form-control"
                        inputName="date_from"
                        maxDate={curItem.max_from_date}
                        handleChange={this.handleDateInputChange.bind(this)}
                        maxLength={20}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3">
                      <FLDatePicker
                        value={curItem.date_to}
                        inputId="date_to"
                        dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                        inputClass="form-control"
                        inputName="date_to"
                        maxDate={curItem.max_date}
                        handleChange={this.handleDateInputChange.bind(this)}
                        maxLength={20}
                      />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 text-right">
                      <CSVLink filename={"export_by_year.csv"} data={this.state.dataChartYear} headers={this.state.headersExportYear}>Export to csv</CSVLink>
                    </div>
                  </div>
                </div>
                {chartMonth}
              </div>
              : ""}


            {!Libs.isObjectEmpty(curItem) ?
              <div className="chart">
                <div className="filter-group">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3">
                      <FLDatePicker
                        value={curItem.date_sum}
                        inputId="date_sum"
                        dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                        inputClass="form-control"
                        inputName="date_sum"
                        maxDate={curItem.max_date}
                        handleChange={this.handleDateInputChange.bind(this)}
                        maxLength={20}
                      />
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-9 text-right">
                      <CSVLink filename={"export_by_day.csv"} data={this.state.dataChartDay} headers={this.state.headersExportDay}>Export to csv</CSVLink>
                    </div>
                  </div>
                </div>
                {chartDay}
              </div>
              : ""}

          </div>
        </div>
      </div>
    </section>
  )
}