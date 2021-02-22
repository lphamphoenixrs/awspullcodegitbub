import React from 'react';
import RowItem from './RowItem';
import { Pagging } from '../../../../component/Pagging';
import AddRolePopup from './AddRolePopup';
import DeleteRolePopup from './DeleteRolePopup';

export default function () {
  var { curItem, dataList } = this.state;
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

  var addRolePopupLayout = this.state.showAddRolePopup
    ? <AddRolePopup
      onCloseAddRolePopup={this.onCloseAddRolePopup.bind(this)}
      curItem={curItem}
    /> : '';

  var deleteRolePopupLayout = this.state.showDeleteRolePopup
    ? <DeleteRolePopup
      onCloseDeleteRolePopup={this.onCloseDeleteRolePopup.bind(this)}
      curItem={curItem}
    /> : '';

  return (
    <section className="roles">
      {addRolePopupLayout}
      {deleteRolePopupLayout}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <h1 className="title">Roles</h1>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <ul className="function-top float-right">
              <li><a className="add" onClick={this.onAddRolePopup.bind(this)}>Add</a></li>
            </ul>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="content">
              <div className="lists">
                <div className="box-header">
                  <div className="header-row">
                    <div className="header-col width10">
                      ID
                  </div>
                    <div className="header-col width30">
                      Name
                  </div>
                    <div className="header-col width40">
                      Description
                  </div>
                    <div className="header-col width10">
                      Status
                  </div>
                    <div className="header-col width10">

                    </div>
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