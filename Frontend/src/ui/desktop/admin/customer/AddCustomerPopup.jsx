import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RText, RButton, RTextArea } from '../../../../component/Controls';
export default function () {
    var { curItem, msgError } = this.state;
    return (
        <Modal visible={true} className="modal-customer" dialogClassName="modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? trans.translate('CUSTOMER.label_add') : trans.translate('CUSTOMER.label_edit')}
                </h5>
                <button type="button" onClick={this.onCloseAddCustomerPopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div className="add-user-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('CUSTOMER.first_name')}
                                    required="required" inputClass="form-control"
                                    inputId="first_name" inputName="first_name"
                                    value={curItem.first_name}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('CUSTOMER.last_name')}
                                    required="required" inputClass="form-control"
                                    inputId="last_name" inputName="last_name"
                                    value={curItem.last_name}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('CUSTOMER.phone')}
                                    inputClass="form-control"
                                    inputId="phone" inputName="phone"
                                    value={curItem.phone}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('CUSTOMER.mobile_phone')}
                                    inputClass="form-control"
                                    inputId="mobile_phone" inputName="mobile_phone"
                                    value={curItem.mobile_phone}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('CUSTOMER.fax')}
                                    inputClass="form-control"
                                    inputId="fax" inputName="fax"
                                    value={curItem.fax}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('CUSTOMER.email')}
                                    required="required"
                                    inputClass="form-control"
                                    inputId="email" inputName="email"
                                    value={curItem.email}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <div className="generate-password">
                                    <RText label={trans.translate('CUSTOMER.password')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="password" inputName="password"
                                        value={curItem.password}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                        maxLength={100} />
                                    <a>
                                        <i onClick={this.onClickRadomPassword.bind(this)} className="icon icon-refresh" aria-hidden="true"></i>
                                    </a>
                                </div>

                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <RTextArea label={trans.translate('CUSTOMER.address')}
                                    inputClass="form-control"
                                    inputId="address" inputName="address"
                                    value={curItem.address}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={300} />
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="form-group">
                                <label className="control-label">{trans.translate('CUSTOMER.logo')}</label>
                                {Libs.isArrayData(msgError) ?
                                    <div className="alert alert-danger">
                                        <p>{msgError}</p>
                                    </div>
                                    : ''}
                                <div className="image-logo">
                                    <ul className="row">
                                        <li key={2} className="col-md-4">
                                            <div className="item item-add">
                                                <label htmlFor="logo" className="add">
                                                    <span className="icon-picture-o"></span>
                                                    <input type="file" id="logo" name="logo" onChange={(event) => this.onFileChange(event)} />
                                                </label>
                                            </div>
                                        </li>

                                        {!Libs.isBlank(curItem.file_upload) ?
                                            <li key={1} className="col-md-4">
                                                <div className="item">
                                                    <div className="img">
                                                        <img src={curItem.file_upload} />
                                                    </div>
                                                </div>
                                            </li>
                                            : (!Libs.isBlank(curItem.logo) ?
                                                <li key={1} className="col-md-4">
                                                    <div className="item">
                                                        <div className="img">
                                                            <img src={Constants.SERVER_DATA + curItem.logo} />
                                                        </div>
                                                    </div>
                                                </li>
                                                : "")}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <RButton onClick={this.onSaveAction.bind(this)} className="btn btn-save"
                    text={(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? " " + trans.translate('common.label_save') : " " + trans.translate('common.label_update')}
                    title={(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? trans.translate('common.label_save') : trans.translate('common.label_update')} />
            </div>
        </Modal>
    )
}