import React from 'react';
import RowItem from './RowItem';
import { RText, RButton } from '../../../../component/Controls';
import { Pagging } from '../../../../component/Pagging';
import AddCustomerPopup from './AddCustomerPopup';
import DeleteCustomerPopup from './DeleteCustomerPopup';

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
      />
    });
  }

  var addCustomerPopupLayout = this.state.showAddCustomerPopup
    ? <AddCustomerPopup
      onCloseAddCustomerPopup={this.onCloseAddCustomerPopup.bind(this)}
      curItem={curItem}
    /> : '';

  var deleteCustomerPopupLayout = this.state.showDeleteCustomerPopup
    ? <DeleteCustomerPopup
      onCloseDeleteCustomerPopup={this.onCloseDeleteCustomerPopup.bind(this)}
      curItem={curItem}
    /> : '';

  return (
    <section className="customers">
      {addCustomerPopupLayout}
      {deleteCustomerPopupLayout}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <h1 className="title">Customers</h1>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <ul className="function-top float-right">
              {!formSearch ? <li><a onClick={this.onSearch.bind(this)}>Search</a></li> : ""}
              <li><a className="add" onClick={this.onAddCustomerPopup.bind(this)}>Add</a></li>
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
                    <div onClick={e => this.onSort(e, 'first_name')} className={searchParam.sort_column == "first_name" ?
                      "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting"}>First name</div>
                    <div onClick={e => this.onSort(e, 'last_name')} className={searchParam.sort_column == "last_name" ?
                      "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting"}>Last name </div>
                    <div onClick={e => this.onSort(e, 'phone')} className={searchParam.sort_column == "phone" ?
                      "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting"}>Phone</div>
                    <div onClick={e => this.onSort(e, 'email')} className={searchParam.sort_column == "email" ?
                      "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting"}>Email</div>
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