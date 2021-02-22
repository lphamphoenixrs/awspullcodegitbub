/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../component/Controls';
export default function () {
    var { curItem } = this.state;
    return (
        <Modal visible={true} className="modal-Site" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">
                    {curItem.is_delete == 0 ? trans.translate('SITE.title_delete') : trans.translate('SITE.title_retore')}
                        : {curItem.id}
                </h5>
                <button type="button" onClick={this.onCloseDeleteSitePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"><span>×</span></button>
            </div>
            <div className="modal-body">
                <p>{curItem.is_delete == 0 ? trans.translate('common.message_delete') : trans.translate('common.message_retore')}</p>
            </div>

            <div className="modal-footer">


                <RButton
                    onClick={this.onCloseDeleteSitePopup.bind(this)}
                    className="btn btn-cancel"
                    text={" " + trans.translate('common.label_cancel')}
                    data-dismiss="modal" aria-hidden="true"
                    title={trans.translate('common.label_cancel')} />

                <RButton
                    onClick={this.onDeleteAction.bind(this)}
                    className="btn btn-save"
                    text={curItem.is_delete == 0 ? " " + trans.translate('common.label_delete') : " " + trans.translate('common.label_retore')}
                    title={curItem.is_delete == 0 ? trans.translate('common.label_delete') : trans.translate('common.label_retore')} />
            </div>
        </Modal>
    )
}