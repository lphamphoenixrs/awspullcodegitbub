/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../component/Controls';
import FLSelect from '../../../../component/FLSelect';
import Libs from '../../../../utils/Libs';
import RowItemElement from './RowItemElement';
import RowItemSiteElement from './RowItemSiteElement';
export default function () {
    var { curItem, listErrorLevel, listFilter, listSite } = this.state;
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

    var siteRowItems = null;
    if (Libs.isArrayData(listSite)) {
        siteRowItems = listSite.map((item, index) => {
            return <RowItemSiteElement
                key={'row_item_' + index}
                index={index}
                curItem={curItem}
                dataItem={item}
                handleSiteElementChange={this.handleSiteElementChange}
            />
        });
    }

    return (
        <Modal visible={true} className="modal-filter" dialogClassName="modal-small">
            <div className="modal-header">
                <h5 className="modal-title">Filter alert</h5>
                <button type="button" onClick={this.props.onCloseFilterPopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div class="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                            <FLSelect
                                id="column"
                                className="column"
                                name="column"
                                options={listFilter}
                                label="Column"
                                selectedValue={curItem.column}
                                onSelect={(e) => { this.handleInputChange(e) }}
                                placeholderText={trans.translate('common.choose')}
                            />
                        </div>
                    </div>
                    {!Libs.isBlank(curItem.column) && curItem.column == 2 && siteRowItems ?
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="list-alert-filter scrollbar-inner">
                                <ul>
                                    {siteRowItems}
                                </ul>
                            </div>
                        </div>
                        : ""}

                    {!Libs.isBlank(curItem.column) && curItem.column == 1 && RowItems ?
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="list-alert-filter scrollbar-inner">
                                <ul>
                                    {RowItems}
                                </ul>
                            </div>
                        </div>
                        : ""}
                </div>
            </div>
            <div className="modal-footer">
                <RButton onClick={this.onFilterAction.bind(this)} className="btn btn-save" text="Add filter" title="Add filter" />
                <RButton onClick={this.onClickReset.bind(this)} className="btn btn-cancel"
                    text="Clear all"
                    title="Clear all" />
                <RButton onClick={this.props.onCloseFilterPopup.bind(this)} className="btn btn-cancel"
                    text="Close"
                    title="Close" />


            </div>
        </Modal>
    )
}