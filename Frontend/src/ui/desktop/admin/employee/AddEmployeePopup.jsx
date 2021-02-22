import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RText, RButton, RTextArea, RCheckbox } from '../../../../component/Controls';
import FLDatePicker from '../../../../component/FLDatePicker/FLDatePicker';
import Libs from '../../../../utils/Libs';
export default function () {
    var { curItem, msgError, roleLists, msgRole } = this.state;
    var itemRoles = [];
    if (Libs.isArrayData(roleLists)) {
        roleLists.map((item, index) => {
            itemRoles.push(
                <li className="col-12 col-sm-6 col-md-6 col-lg-6" key={index}>
                    <div className="form-group">
                        <RCheckbox
                            label={item.name}
                            inputId={"role_" + item.id}
                            inputName="role"
                            labelClass="no-label"
                            checked={item.is_checked}
                            onChange={(e) => { this.handleRoleInputChange(e, index); }} />
                    </div>
                </li>
            );
        });
    }

    return (
        <Modal visible={true} className="modal-employee" dialogClassName="modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode == Constants.SCREEN_MODE.ADD) ? trans.translate('EMPLOYEE.label_add') : trans.translate('EMPLOYEE.label_edit')}
                </h5>
                <button type="button" onClick={this.onCloseAddEmployeePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div className="add-user-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.first_name')}
                                    required="required" inputClass="form-control"
                                    inputId="first_name" inputName="first_name"
                                    value={curItem.first_name}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.last_name')}
                                    required="required" inputClass="form-control"
                                    inputId="last_name" inputName="last_name"
                                    value={curItem.last_name}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.phone')}
                                    inputClass="form-control"
                                    required="required"
                                    inputId="phone" inputName="phone"
                                    value={curItem.phone}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.email')}
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
                                <FLDatePicker
                                    label={trans.translate('EMPLOYEE.birthday')}
                                    value={curItem.birthday}
                                    inputId="birthday"
                                    dateFormat="MM/dd/yyyy"
                                    inputClass="form-control"
                                    inputName="birthday"
                                    maxDate={curItem.max_date}
                                    handleChange={this.handleDateInputChange.bind(this)}
                                    maxLength={20}
                                    showYearDropdown={true}
                                    showMonthDropdown={true}
                                    dropdownMode="select"
                                />
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <div className="generate-password">
                                    <RText label={trans.translate('EMPLOYEE.password')}
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
                            <div className={!Libs.isBlank(msgRole) ? "list-role error": "list-role"}>
                                <fieldset>
                                    <legend>{trans.translate('EMPLOYEE.label_role')} <span class="required">*</span></legend>
                                    <ul className="row">
                                        {itemRoles}
                                    </ul>
                                </fieldset>
                                {!Libs.isBlank(msgRole) ? <p class="validate-message">{msgRole}</p>: ""}
                            </div>

                        </div>


                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <RText label={trans.translate('EMPLOYEE.skype')}
                                    inputClass="form-control"
                                    inputId="skype" inputName="skype"
                                    value={curItem.skype}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={100} />
                            </div>
                        </div>



                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <RTextArea label={trans.translate('EMPLOYEE.address')}
                                    inputClass="form-control"
                                    inputId="address" inputName="address"
                                    value={curItem.address}
                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                    maxLength={300} />
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="form-group">
                                <label className="control-label">{trans.translate('EMPLOYEE.avatar')}</label>
                                {Libs.isArrayData(msgError) ?
                                    <div className="alert alert-danger">
                                        <p>{msgError}</p>
                                    </div>
                                    : ''}
                                <div className="image-avatar">
                                    <ul className="row">
                                        <li key={2} className="col-md-4">
                                            <div className="item item-add">
                                                <label htmlFor="avatar" className="add">
                                                    <span className="icon-picture-o"></span>
                                                    <input type="file" id="avatar" name="avatar" onChange={(event) => this.onFileChange(event)} />
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
                                            : (!Libs.isBlank(curItem.avatar) ?
                                                <li key={1} className="col-md-4">
                                                    <div className="item">
                                                        <div className="img">
                                                            <img src={Constants.SERVER_DATA + curItem.avatar} />
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