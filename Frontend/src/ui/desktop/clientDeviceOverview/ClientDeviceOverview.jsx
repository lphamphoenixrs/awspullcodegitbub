
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pagging } from '../../../component/Pagging';
import Libs from '../../../utils/Libs';
import { RText } from '../../../component/Controls';
import RowItem from './RowItem';
import FLSelect from '../../../component/FLSelect';
import DeviceProperties from './deviceProperties/DeviceProperties';
import DeviceParameters from './deviceParameters/DeviceParameters';

export default function () {
  var { curItem, dataList, searchParam, dataListStatus } = this.state;

  var DevicePropertieslayout = this.state.showDeviceProperties ?
    <DeviceProperties
      curItem={curItem}
      onCloseDeviceProperties={this.onCloseDeviceProperties}
    />
    : "";

  var DeviceParameterslayout = this.state.showDeviceParameters ?
    <DeviceParameters
      curItem={curItem}
      onCloseDeviceParameters={this.onCloseDeviceParameters}
    />
    : "";

  var RowItems = null;
  if (Libs.isArrayData(dataList)) {
    RowItems = dataList.map((item, index) => {
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        onOpenDeviceProperties={this.onOpenDeviceProperties}
        onOpenDeviceParameters={this.onOpenDeviceParameters}
      />
    });
  }


  return (
    <section className="client-device-overview">
      {DevicePropertieslayout}
      {DeviceParameterslayout}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item"><NavLink to="/client/2a56697349666d444242454b772b71513d">Costco - Santa Maria</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">Device overview</li>
              </ol>
            </nav>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="filter">
              <div className="row">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-2">
                      <RText
                        label="Device name"
                        inputClass="form-control"
                        inputId="name" inputName="name"
                        value={searchParam.name}
                        onChange={(e) => { this.handleInputChange(e); }}
                        maxLength={100} />
                    </div>
                    <div className="col-md-2">
                      <RText
                        label="Serial number"
                        inputClass="form-control"
                        inputId="serial_number" inputName="serial_number"
                        value={searchParam.serial_number}
                        onChange={(e) => { this.handleInputChange(e); }}
                        maxLength={100} />
                    </div>

                    <div className="col-md-2">
                      <FLSelect
                        label="Status"
                        id="status"
                        className="status"
                        name="status"
                        selectedValue={searchParam.status}
                        options={dataListStatus}
                        placeholderText={trans.translate('common.choose')}
                        onChange={this.handleDropdownChange.bind(this)}
                      />
                    </div>

                    <div className="col-md-2">
                      <a onClick={this.onClickSearch.bind(this)} className="search">Search</a>
                      <a onClick={this.onClickReset.bind(this)} className="reset">Reset</a>
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
                  <div className="header-col width5 text-center"></div>
                  <div onClick={e => this.onSort(e, 'name')} className={searchParam.sortColumn == "name" ?
                    "header-col width15 sorting " + searchParam.sortOrder : "header-col width15 sorting"}>
                    Device Name
                        </div>

                  <div onClick={e => this.onSort(e, 'serial_number')} className={searchParam.sortColumn == "serial_number" ?
                    "header-col width15 sorting " + searchParam.sortOrder : "header-col width15 sorting"}>
                    Serial Number
                      </div>

                  <div onClick={e => this.onSort(e, 'product_group')} className={searchParam.sortColumn == "product_group" ?
                    "header-col width15 sorting " + searchParam.sortOrder : "header-col width15 sorting"}>
                    Product Group
                          </div>

                  <div className="header-col width10 text-center">
                    Data Collection
                      </div>
                  <div className="header-col width10 text-center">
                    Monitoring
                      </div>
                  <div className="header-col width10 text-center">
                    Properties
                      </div>

                  <div className="header-col width10 text-center">
                    Parameters
                      </div>

                  <div className="header-col width10 text-center">
                    Log
                      </div>

                </div>

                <div className="body">
                  {RowItems ? RowItems : <div className="data-empty">Data empty</div>}
                </div>

              </div>

              <div className="box-footer">
                <Pagging total={this.pagging.total} current={this.pagging.current} onSelectPage={(index) => this.onSelectPage.bind(this, index)}></Pagging>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}