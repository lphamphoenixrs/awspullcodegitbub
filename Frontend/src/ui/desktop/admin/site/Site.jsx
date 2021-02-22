/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import RowItem from './RowItem';
import { RText, RButton } from '../../../../component/Controls';
import { Pagging } from '../../../../component/Pagging';
import AddSitePopup from './AddSitePopup';
import DeleteSitePopup from './DeleteSitePopup';
import AddManageSitePopup from './AddManageSitePopup';

export default function () {
  var { curItem, dataList, searchParam, formSearch } = this.state;
  var RowItems = null;
  if (Libs.isArrayData(dataList)) {
    RowItems = dataList.map((item, index) => {
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        onStatusChange={this.onStatusChange}
        onItemClick={this.onItemClick}
        onItemClickDelete={this.onItemClickDelete}
        onItemClickManageSite = {this.onItemClickManageSite}
      />
    });
  }

  var addSitePopupLayout = this.state.showAddSitePopup
    ? <AddSitePopup
      onCloseAddSitePopup={this.onCloseAddSitePopup.bind(this)}
      curItem={curItem}
    /> : '';

  var addManageSitePopupLayout = this.state.showAddManageSitePopup
    ? <AddManageSitePopup
      onCloseAddManageSitePopup={this.onCloseAddManageSitePopup.bind(this)}
      curItem={curItem}
    /> : '';

  var deleteSitePopupLayout = this.state.showDeleteSitePopup
    ? <DeleteSitePopup
      onCloseDeleteSitePopup={this.onCloseDeleteSitePopup.bind(this)}
      curItem={curItem}
    /> : '';

  return (
    <section className="Sites">
      {addSitePopupLayout}
      {deleteSitePopupLayout}
      {addManageSitePopupLayout}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <h1 className="title">Sites</h1>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <ul className="function-top float-right">
              {!formSearch ? <li><a onClick={this.onSearch.bind(this)}>Search</a></li> : ""}
              <li><a className="add" onClick={this.onAddSitePopup.bind(this)}>Add</a></li>
            </ul>
          </div>

          {formSearch ?
            <div className="col-xl-12 col-lg-12 col-md-12">
              <section className="box-search">
                <div className="title">
                  <h2>{trans.translate('common.search_title')} <a className="close-form-search float-right" onClick = {this.closeFormSearch.bind(this)}> <span className="icon icon-delete"></span></a></h2>
                </div>
                <div className="search">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                      <div className="form-group">
                        <RText label={trans.translate('common.keyword')}
                          inputClass="form-control"
                          inputName="keyword"
                          inputId="keyword" inputName="keyword"
                          value={searchParam.keyword}
                          onChange={(e) => { this.handleInputChange(e); }}
                          maxLength={200} />
                      </div>
                    </div>


                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2">
                      <RButton className="btn btn-search"
                        onClick={this.handleSearch.bind(this)}
                        title={trans.translate('common.btn_search')}
                        text={" " + trans.translate('common.btn_search')}
                        iClass={"fa fa-search"}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            : ""}

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="content">
              <div className="lists">
                <div className="box-header">
                  <div className="header-row">
                    <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column == "id" ?
                      "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}>ID</div>
                      <div onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column == "name" ?
                      "header-col width30 sorting " + searchParam.order_by : "header-col width30 sorting"}>Site name</div>

                    <div onClick={e => this.onSort(e, 'customer_name')} className={searchParam.sort_column == "customer_name" ?
                      "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting"}>Customer name</div>
                    
                    <div onClick={e => this.onSort(e, 'dc_capacity')} className={searchParam.sort_column == "dc_capacity" ?
                      "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}>DC Capacity (kW)</div>
                      
                    <div onClick={e => this.onSort(e, 'built_since')} className={searchParam.sort_column == "built_since" ?
                      "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}>Built since</div>

                    <div onClick={e => this.onSort(e, 'status')} className={searchParam.sort_column == "status" ?
                      "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}>Status</div>
                    <div className="header-col width10"></div>
                  </div>
                </div>

                <div className="box-body">
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