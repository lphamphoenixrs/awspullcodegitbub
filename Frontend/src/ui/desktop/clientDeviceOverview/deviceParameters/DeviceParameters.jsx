import React from 'react';
import Modal from 'react-bootstrap4-modal';
import RowItem from './RowItem';
import Libs from '../../../../utils/Libs';
import { Pagging } from '../../../../component/Pagging';

export default function () {
  var { curItem, dataList } = this.state;
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
    <React.Fragment>
      <Modal visible={true} className="device-parameters" dialogClassName="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-header">
          <h5 className="modal-title">Device: {curItem.name}</h5>
          <button type="button" onClick={this.props.onCloseDeviceParameters.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <div className="content">
            <h2>Parameters </h2>
            <div className="lists">
              <div className="header-row">
                <div className="header-col width60">Parameters</div>
                <div className="header-col width20"> Value</div>
                <div className="header-col width20">Last change</div>

              </div>

              <div className="body">
                {RowItems}
              </div>
            </div>

            <div className="box-footer">
              <Pagging total={this.pagging.total} current={this.pagging.current} onSelectPage={(index) => this.onSelectPage.bind(this, index)}></Pagging>
            </div>

          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}