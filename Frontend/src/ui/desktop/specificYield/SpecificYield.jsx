
import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import RowItemChart from './RowItemChart';

export default function () {
  var { curItem, chartDayOption, chartMonthOption } = this.state;
  var dataRowItemChartDay = Libs.isObjectEmpty(chartDayOption) ? null : <RowItemChart chartOption={chartDayOption} />;
  var dataRowItemChartMonth = Libs.isObjectEmpty(chartMonthOption) ? null : <RowItemChart chartOption={chartMonthOption} />;


  return (
    <section className="specific">
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
            <div className="title">Specific yield</div>
          </div>


          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="filter">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-4">
                  <FLDatePicker
                    value={curItem.date_from_day}
                    inputId="date_from_day"
                    dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                    inputClass="form-control"
                    inputName="date_from_day"
                    maxDate={curItem.max_date_from_day}
                    handleChange={this.handleDateInputChange.bind(this)}
                    maxLength={20}
                  />
                </div>

                <div className="col-xl-3 col-lg-3 col-md-4">
                  <FLDatePicker
                    value={curItem.date_to_day}
                    inputId="date_to_day"
                    dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                    inputClass="form-control"
                    inputName="date_to_day"
                    maxDate={curItem.max_date}
                    handleChange={this.handleDateInputChange.bind(this)}
                    maxLength={20}
                  />
                </div>

              </div>
            </div>

            <div className="chart">
              {dataRowItemChartDay}
            </div>
          </div>


          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="filter">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <FLDatePicker
                    value={curItem.date_from_month}
                    inputId="date_from_month"
                    dateFormat={!Libs.isBlank(curItem.localization_format) ? (curItem.localization_format).replace(/dd\/|dd|-dd|.dd|dd-|dd./gi, "") : "MM/yyyy"}
                    inputClass="form-control"
                    inputName="date_from_month"
                    maxDate={curItem.max_date_from_month}
                    handleChange={this.handleDateInputChange.bind(this)}
                    maxLength={20}
                    showMonthYearPicker={true}
                    showFullMonthYearPicker={true}
                  />
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3">
                  <FLDatePicker
                    value={curItem.date_to_month}
                    inputId="date_to_month"
                    dateFormat={!Libs.isBlank(curItem.localization_format) ? (curItem.localization_format).replace(/dd\/|dd|-dd|.dd|dd-|dd./gi, "") : "MM/yyyy"}
                    inputClass="form-control"
                    inputName="date_to_month"
                    maxDate={curItem.max_date}
                    handleChange={this.handleDateInputChange.bind(this)}
                    maxLength={20}
                    showMonthYearPicker={true}
                    showFullMonthYearPicker={true}
                  />
                </div>

              </div>
            </div>

            <div className="chart">
              {dataRowItemChartMonth}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}