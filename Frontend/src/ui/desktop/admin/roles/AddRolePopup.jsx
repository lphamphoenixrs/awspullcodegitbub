import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RText, RButton, RTextArea } from '../../../../component/Controls';
export default function () {
    var { curItem } = this.state;
    return (
        <Modal visible={true} className="modal-role" dialogClassName="">
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? trans.translate('ROLE.label_add_role') : trans.translate('ROLE.label_edit_role')}
                </h5>
                <button type="button" onClick={this.onCloseAddRolePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div className="add-user-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <RText label={trans.translate('ROLE.name')}
                                    required="required" inputClass="form-control"
                                    inputId="name" inputName="name"
                                    value={curItem.name}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <RTextArea label={trans.translate('ROLE.description')}
                                    inputClass="form-control"
                                    inputId="description" inputName="description"
                                    value={curItem.description}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={300} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <RButton onClick={this.onSaveAction.bind(this)} className="btn btn-save"
                    text={(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? " " + trans.translate('common.label_save') :  " " + trans.translate('common.label_update') }
                    title={(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? trans.translate('common.label_save') : trans.translate('common.label_update')} />
            </div>
        </Modal>
    )
}