import React from 'react';
import Modal from 'react-bootstrap4-modal';
import RowItem from './RowItem';
import Libs from '../../../../utils/Libs';
export default function () {
  var { curItem, dataList } = this.state;

  var rowItems = null;
  if (Libs.isArrayData(dataList)) {
    rowItems = dataList.map((item, index) => {  
      return <RowItem
        key={'row_item_' + index}
        index={index}
        dataItem={item}
        curItem = {curItem}
        onItemClickView = {this.onItemClickView}
      />
    });
  }

  return (
    <React.Fragment>
      <Modal visible={true} className="modal-list-site" dialogClassName="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-header">
          <h5 className="modal-title">
            Sites
          </h5>
          <button type="button" onClick={this.props.onCloseListSitePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <div className="content">
            <ul className="row">
                {rowItems}
            </ul>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}