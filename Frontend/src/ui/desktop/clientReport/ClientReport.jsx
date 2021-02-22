
import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import RowItemChart from './RowItemChart';
import FLSelect from '../../../component/FLSelect';
import { CSVLink } from "react-csv";

export default function () {
  var { curItem, chartOption, dataListReportType, dailyReportSum } = this.state;
  var chart = Libs.isObjectEmpty(chartOption) ? null : <RowItemChart chartOption={chartOption} />;

  return (
    <section className="client-report">
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
            <div className="title">Report</div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="filter">
              <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-2">
                  <FLSelect
                    id="report_type"
                    selectedValue={curItem.report_type}
                    className="report_type"
                    name="report_type"
                    options={dataListReportType}
                    placeholderText={trans.translate('common.choose')}
                    onSelect={this.handleDateInputChange.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="data-report">
              <div className="data-group">
                <div className="filter-group">
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-4">
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
                  </div>
                </div>

                {!Libs.isObjectEmpty(dailyReportSum) && curItem.report_type == 'monthly_report' ?
                  <table className="table" id="DataTableComparison">
                    <thead>
                      <tr>
                        <th className="text-left">Devices/PV system</th>

                        <th className="text-right">
                          <p>Gesamtertrag</p>
                          <p>Meter Change [kWh]</p>
                          <p>{dailyReportSum.month_format_time}</p>
                        </th>
                        <th className="text-right">
                          <p>Total yield</p>
                          <p>Meter Change [kWh]</p>
                          <p>{dailyReportSum.year_format_time}</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left">{dailyReportSum.devicename}</td>
                        <td className="text-right">{dailyReportSum.month_ytd_kwh_total}</td>
                        <td className="text-right">{dailyReportSum.year_ytd_kwh_total}</td>

                      </tr>

                      <tr className="total">
                        <td className="text-left"></td>
                        <td className="text-right">{dailyReportSum.month_ytd_kwh_total}</td>
                        <td className="text-right">{dailyReportSum.year_ytd_kwh_total}</td>

                      </tr>
                      <tr className="total">
                        <td className="text-right"></td>
                        <td className="text-right">[Total]</td>
                        <td className="text-right">[Total]</td>

                      </tr>
                    </tbody>
                  </table>
                  : ""}
                {!Libs.isObjectEmpty(dailyReportSum) && curItem.report_type == 'daily_report' ?
                  <table className="table" id="DataTableComparison">
                    <thead>
                      <tr>
                        <th className="text-left">Devices/PV system</th>
                        <th className="text-right">
                          <p>Total yield</p>
                          <p>Meter Change [kWh]</p>
                          <p>{dailyReportSum.local_time}</p>
                        </th>

                        <th className="text-right">
                          <p>Gesamtertrag</p>
                          <p>Meter Change [kWh]</p>
                          <p>{dailyReportSum.month_format_time}</p>
                        </th>
                        <th className="text-right">
                          <p>Total yield</p>
                          <p>Meter Change [kWh]</p>
                          <p>{dailyReportSum.year_format_time}</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left">{dailyReportSum.devicename}</td>
                        <td className="text-right">{dailyReportSum.energy_today_kw}</td>
                        <td className="text-right">{dailyReportSum.month_ytd_kwh_total}</td>
                        <td className="text-right">{dailyReportSum.year_ytd_kwh_total}</td>

                      </tr>

                      <tr className="total">
                        <td className="text-left"></td>
                        <td className="text-right"></td>
                        <td className="text-right">{dailyReportSum.month_ytd_kwh_total}</td>
                        <td className="text-right">{dailyReportSum.year_ytd_kwh_total}</td>

                      </tr>
                      <tr className="total">
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right">[Total]</td>
                        <td className="text-right">[Total]</td>

                      </tr>
                    </tbody>
                  </table>
                  : ""}

              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="chart">
              <div className="filter-group">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-4">
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
                  {curItem.report_type == 'monthly_report' ?
                    <div className="col-xl-3 col-lg-4 col-md-4">
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
                    : ''}
                </div>
              </div>
              {chart}
            </div>
            <div className="export-to-csv">
            <CSVLink filename={"export.csv"} data={this.state.dataExportCsv} headers={this.state.headers}>Export to csv</CSVLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}