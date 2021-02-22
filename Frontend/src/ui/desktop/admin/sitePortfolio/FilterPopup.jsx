/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../component/Controls';
import RowItemElement from './RowItemElement';
export default function () {
    var { curItem, listErrorLevel } = this.state;
    var RowItems = null;
    if (Libs.isArrayData(listErrorLevel)) {
        RowItems = listErrorLevel.map((item, index) => {
            return <RowItemElement
                key={'row_item_' + index}
                index={index}
                curItem={curItem}
                dataItem={item}
                handleElementChange={this.handleElementChange}
            />
        });
    }

    return (
        <Modal visible={true} className="modal-filter" dialogClassName="modal-small modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">Filter alert</h5>
                <button type="button" onClick={this.props.onCloseFilterPopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div class="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h2></h2>
                        <div className="list-alert-filter">
                            <ul>
                                {RowItems}
                            </ul>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                            <RButton onClick={this.onFilterAction.bind(this)} className="btn btn-save" text="Add filter" title="Add filter" />
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                        <RButton onClick={this.onClickReset.bind(this)} className="btn btn-cancel"
                            text="Clear all"
                            title="Clear all" />
                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                        <RButton onClick={this.props.onCloseFilterPopup.bind(this)} className="btn btn-cancel"
                            text="Close"
                            title="Close" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}