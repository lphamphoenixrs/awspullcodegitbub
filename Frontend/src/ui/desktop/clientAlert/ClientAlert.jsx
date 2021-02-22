
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pagging } from '../../../component/Pagging';
import Libs from '../../../utils/Libs';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import RowItem from './RowItem';

export default function () {
  var { curItem, dataList, searchParam } = this.state;

  var RowItems = null;
  if (Libs.isArrayData(dataList)) {
    RowItems = dataList.map((item, index) => {
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
      />
    });
  }

  return (
    <section className="client-alert">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
              <li className="breadcrumb-item"><NavLink to={"/client/" + curItem.id}>{curItem.name}</NavLink></li>
            </ol>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="title">Alerts</div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="filter">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      {!Libs.isObjectEmpty(curItem) ?
                        <div className="row">
                          <div className="col-md-6">
                            <FLDatePicker
                              value={curItem.date_from}
                              inputId="date_from"
                              dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                              inputClass="form-control"
                              inputName="date_from"
                              maxDate={curItem.max_date}
                              handleChange={this.handleDateInputChange.bind(this)}
                              maxLength={20}
                            />
                          </div>

                          <div className="col-md-6">
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

                        </div>
                        : ""}

                    </div>

                    <div className="col-md-8">
                      <ul className="text-right">
                        <li><a onClick={this.onChangeView.bind(this, "day")} className={curItem.viewActive == "day" ? "active" : ""}>Day</a></li>
                        <li><a onClick={this.onChangeView.bind(this, "week")} className={curItem.viewActive == "week" ? "active" : ""}>Week</a></li>
                        <li><a onClick={this.onChangeView.bind(this, "month")} className={curItem.viewActive == "month" ? "active" : ""}>Month</a></li>
                        <li><a onClick={this.onChangeView.bind(this, "year")} className={curItem.viewActive == "year" ? "active" : ""}>Year</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="alert-content">
              <div className="lists">
                <div className="header-row">
                  <div onClick={e => this.onSort(e, 'id')} className={searchParam.sortColumn == "id" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Alert ID
                        </div>

                  <div onClick={e => this.onSort(e, 'start')} className={searchParam.sortColumn == "start" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Start
                      </div>

                  <div onClick={e => this.onSort(e, 'status')} className={searchParam.sortColumn == "status" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Status
                      </div>


                  <div onClick={e => this.onSort(e, 'duration')} className={searchParam.sortColumn == "duration" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Duration
                          </div>

                  <div onClick={e => this.onSort(e, 'id_device')} className={searchParam.sortColumn == "id_device" ?
                    "header-col width30 sorting " + searchParam.sortOrder : "header-col width30 sorting"}>
                    Device/problem
                      </div>
                  <div onClick={e => this.onSort(e, 'asset')} className={searchParam.sortColumn == "asset" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Asset
                      </div>
                  <div onClick={e => this.onSort(e, 'capacity')} className={searchParam.sortColumn == "capacity" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Capacity
                      </div>

                  <div onClick={e => this.onSort(e, 'level')} className={searchParam.sortColumn == "level" ?
                    "header-col width10 sorting " + searchParam.sortOrder : "header-col width10 sorting"}>
                    Level
                      </div>

                </div>

                <div className="body">
                  {RowItems ? RowItems : <div className="data-empty">Data empty</div>}
                </div>

              </div>

              <div className="box-footer">
                <Pagging total={this.state.paging.total} current={this.state.paging.current} onSelectPage={(index) => this.onSelectPage.bind(this, index)}></Pagging>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}