
import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import RowItemChart from './RowItemChart';
import RowItem from './RowItem';
import RowItemElement from './RowItemElement';
import RowItemParameter from './RowItemParameter';
import FLSelect from '../../../component/FLSelect';

export default function () {
  var { curItem, dataListDeviceType, dataListDevice, dataListParameter, chartOption, dataChart, dataHourFilter } = this.state;
  var dataRowItemChart = Libs.isObjectEmpty(chartOption) ? null : <RowItemChart chartOption={chartOption} />;
  var findParameterActive = Libs.find(dataListParameter, 'active', 1);
  var RowItemElements = null;
  if (Libs.isArrayData(dataListDevice)) {
    RowItemElements = dataListDevice.map((item, index) => {
      return <RowItemElement
        key={'row_item_' + index}
        index={index}
        curItem={curItem}
        dataItem={item}
        handleElementChange={this.handleElementChange}
      />
    });
  }

  var RowItemParameters = null;
  if (Libs.isArrayData(dataListParameter)) {
    RowItemParameters = dataListParameter.map((item, index) => {
      return <RowItemParameter
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        handleParameterChange={this.handleParameterChange}
      />
    });
  }


  var dataListParameterActive = dataListParameter.filter((v) => v.active == 1);
  var headerGroup = null;
  if(Libs.isArrayData(dataListParameterActive)){
    headerGroup = dataListParameterActive.map((item, index) => {
      return  <div className="header-col width15"> {item.name} </div>
    });
  }

  var RowItems = null;
  if (Libs.isArrayData(dataChart)) {
    RowItems = dataChart.map((item, index) => {
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        dataListParameterActive = {dataListParameterActive}
      />
    });
  }


  return (
    <section className="quick_query">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item"><NavLink to={"/client/"+ curItem.id}>{curItem.name}</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">Quick Query</li>
              </ol>
            </nav>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="filter">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-4">
                  <a onClick={this.onClickShowFilter.bind(this)} className="show-selector">
                    {!this.state.showFilter ? <span> <var className="icon icon-down-arrow"></var> Show selector</span> : <span><var className="icon icon-up-arrow"></var> Hide selector</span>}
                  </a>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-md-6">
                          <FLDatePicker
                            value={curItem.end_date}
                            inputId="end_date"
                            dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                            inputClass="form-control"
                            inputName="end_date"
                            maxDate={curItem.max_date}
                            handleChange={this.handleDateInputChange.bind(this)}
                            maxLength={20}
                          />
                        </div>
                        {curItem.timeActive == 'hour' ?
                          <div className="col-md-6">
                            <div className="dropdown_time">
                              <FLSelect
                                id="time_filter"
                                className="time_filter"
                                name="time_filter"
                                selectedValue={curItem.time_filter}
                                options={dataHourFilter}
                                placeholderText={trans.translate('common.choose')}
                                onSelect={this.handleDateInputChange.bind(this)}
                              />
                            </div>
                          </div>
                          : ''}


                      </div>

                    </div>
                    <div className="col-md-4">
                      <ul className="text-center">
                        <li><a onClick={this.onChangeHour.bind(this, "hour")} className={curItem.timeActive == "hour" ? "active" : ""}>Hour</a></li>
                        <li><a onClick={this.onChangeHour.bind(this, "allDate")} className={curItem.timeActive == "allDate" ? "active" : ""}>All day</a></li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <ul className="text-right">
                        <li><a onClick={this.onChangeView.bind(this, "table")} className={curItem.viewActive == "table" ? "active" : ""}>Table</a></li>
                        <li><a onClick={this.onChangeView.bind(this, "chart")} className={curItem.viewActive == "chart" ? "active" : ""}>Chart</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row">
              <div className={!this.state.showFilter ? "box-search col-xl-3 col-lg-3 col-md-4" : "col-xl-3 col-lg-3 col-md-4"}>
                <div className="query-search">
                  <div className="element-type">
                    <h2>Element Type</h2>
                    <div className="element-content-type">
                      <FLSelect
                        id="id_device_type"
                        className="id_device_type"
                        name="id_device_type"
                        options={dataListDeviceType}
                        selectedValue={curItem.id_device_type}
                        placeholderText={trans.translate('common.choose')}
                        onSelect={(e) => { this.handleDateInputChange(e); }}
                      />
                    </div>
                  </div>
                  {RowItemElements ?
                    <div className="element-type">
                      <h2>Elements</h2>
                      <div className="element-content-type">
                        <ul>{RowItemElements}</ul>
                      </div>
                    </div>
                    : ""}


                  {RowItemParameters ?
                    <div className="element-type">
                      <h2> Parameters</h2>
                      <div className="element-content">
                        <ul>{RowItemParameters}</ul>
                      </div>
                    </div>

                    : ""}

                  <div className="search-now">
                    <a onClick={this.onSearch.bind(this)} className={Libs.isObjectEmpty(findParameterActive)  ? "disable" : ""}>Ok</a>
                  </div>


                </div>

              </div>
              <div className={!this.state.showFilter ? "box-content col-xl-9 col-lg-9 col-md-8" : "col-xl-9 col-lg-9 col-md-8"}>
                {curItem.viewActive == 'chart' ?
                  <div className="query-content">
                    <div className="chart">
                      {dataRowItemChart}
                    </div>
                  </div>
                  :
                  <div className="query-content">
                    {Libs.isArrayData(dataListParameterActive) ? 
                    <div className="view-table">
                      <div className="lists">
                        <div className="header-row">
                          <div className="header-col width15">Date</div>
                          <div className="header-col width10">Device</div>
                          {headerGroup}
                        </div>

                        <div className="body">
                          {RowItems ? RowItems : <div className="data-empty">Data empty</div>}
                        </div>
                      </div>
                    </div>
                    : ""}
                    

                  </div>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}