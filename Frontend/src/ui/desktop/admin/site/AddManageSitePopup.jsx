/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RText, RButton } from '../../../../component/Controls';
import FLSelect from '../../../../component/FLSelect';
import FLDatePicker from '../../../../component/FLDatePicker/FLDatePicker';
import { Pagging } from '../../../../component/Pagging';
import RowItemDevice from './RowItemDevice'
export default function () {
    var { curItem, dataList, searchParam, listVendor, listDeviceType, listGroup, siteCurItem } = this.state;
    var RowItems = null;
    if (Libs.isArrayData(dataList)) {
        RowItems = dataList.map((item, index) => {
            return <RowItemDevice
                key={'row_item_' + index}
                index={index}
                dataItem={item}
                onDeviceStatusChange={this.onDeviceStatusChange}
                onItemClick={this.onItemClick}
                onItemClickDelete={this.onItemClickDelete}
            />
        });
    }

    return (
        <Modal visible={true} className="modal-device" dialogClassName="modal-xl modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">
                    Site: {siteCurItem.name}
                </h5>
                <button type="button" onClick={this.props.onCloseAddManageSitePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div className="add-user-content">
                    <div className="row">
                        {this.state.showAdd ?
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <fieldset>
                                    <legend>Add device</legend>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <FLSelect
                                                    id="id_vendor"
                                                    required="required"
                                                    className="id_vendor"
                                                    name="id_vendor"
                                                    options={listVendor}
                                                    label={trans.translate('SITE.id_vendor')}
                                                    selectedValue={curItem.id_vendor}
                                                    onSelect={(e) => { this.handleDropdownInputChange(e); this.validateOne(e) }}
                                                    placeholderText={trans.translate('common.choose')}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">

                                            <div className="form-group">
                                                <FLSelect
                                                    id="id_device_type"
                                                    required="required"
                                                    className="id_device_type"
                                                    name="id_device_type"
                                                    options={listDeviceType}
                                                    label={trans.translate('SITE.id_device_type')}
                                                    selectedValue={curItem.id_device_type}
                                                    onSelect={(e) => { this.handleDropdownInputChange(e); this.validateOne(e) }}
                                                    placeholderText={trans.translate('common.choose')}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <FLSelect
                                                    id="id_device_group"
                                                    required="required"
                                                    className="id_device_group"
                                                    name="id_device_group"
                                                    options={listGroup}
                                                    label={trans.translate('SITE.id_device_group')}
                                                    selectedValue={curItem.id_device_group}
                                                    onSelect={(e) => { this.handleDropdownInputChange(e); this.validateOne(e) }}
                                                    placeholderText={trans.translate('common.choose')}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.serial_number')}
                                                    required="required" inputClass="form-control"
                                                    inputId="serial_number" inputName="serial_number"
                                                    value={curItem.serial_number}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.modbusdevicenumber')}
                                                    required="required" inputClass="form-control"
                                                    inputId="modbusdevicenumber" inputName="modbusdevicenumber"
                                                    value={curItem.modbusdevicenumber}
                                                    onChange={(e) => { this.handleNumberInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.devicename')}
                                                    required="required" inputClass="form-control"
                                                    inputId="devicename" inputName="devicename"
                                                    value={curItem.devicename}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.devicetype')}
                                                    required="required" inputClass="form-control"
                                                    inputId="devicetype" inputName="devicetype"
                                                    value={curItem.devicetype}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.deviceclass')}
                                                    inputClass="form-control"
                                                    inputId="deviceclass" inputName="deviceclass"
                                                    value={curItem.deviceclass}
                                                    onChange={(e) => { this.handleNumberInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.configuration')}
                                                    inputClass="form-control"
                                                    inputId="configuration" inputName="configuration"
                                                    value={curItem.configuration}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <FLDatePicker
                                                    label={trans.translate('SITE.configurationchangetime')}
                                                    value={curItem.configurationchangetime}
                                                    inputId="configurationchangetime"
                                                    inputClass="form-control"
                                                    inputName="configurationchangetime"
                                                    handleChange={(e) => { this.handleDateInputChange(e); this.validateOne(e) }}
                                                    maxLength={10}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.configurationchecksum')}
                                                    inputClass="form-control"
                                                    inputId="configurationchecksum" inputName="configurationchecksum"
                                                    value={curItem.configurationchecksum}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <RText label={trans.translate('SITE.datatablename')}
                                                    inputClass="form-control"
                                                    inputId="datatablename" inputName="datatablename"
                                                    value={curItem.datatablename}
                                                    disabled={true}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                    maxLength={100} />
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right">
                                            <div className="form-group">
                                            {curItem.screen_mode == Constants.SCREEN_MODE.EDIT ? 
                                                <RButton onClick={this.onClickReset.bind(this)} className="btn btn-cancel"
                                                text= {trans.translate('common.label_add')}
                                                title={trans.translate('common.label_add')} />
                                            : ""}
                                                <RButton onClick={this.onSaveAction.bind(this)} className="btn btn-save"
                                                    text={(curItem.screen_mode == Constants.SCREEN_MODE.EDIT) ? " " + trans.translate('common.label_update') : " " + trans.translate('common.label_save')}
                                                    title={(curItem.screen_mode == Constants.SCREEN_MODE.EDIT) ? trans.translate('common.label_update') : trans.translate('common.label_save')} />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            : ""}




                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div class="list-title">
                                <div class="row">
                                    <div className="col-md-6">
                                        <h2 className="device-title">List device</h2>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        {!this.state.showAdd ?
                                            <ul className="function-top float-right">
                                                <li><a className="add" onClick={this.onAddDevicePopup.bind(this)}>Add</a></li>
                                            </ul>
                                            : ""}
                                    </div>
                                </div>
                            </div>
                            <div className="content list-device">
                                <div className="lists">
                                    <div className="box-header">
                                        <div className="header-row">
                                            <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column == "id" ?
                                                "header-col w100px sorting " + searchParam.order_by : "header-col w100px sorting"}>ID</div>
                                            <div className="header-col w200px">Serial number</div>
                                            <div className="header-col w300px">Modbus device number</div>
                                            <div className="header-col w200px">Device name</div>
                                            <div className="header-col w200px">Device type</div>
                                            <div className="header-col w200px">Device class</div>
                                            <div className="header-col w200px">Configuration</div>
                                            <div className="header-col w200px">Configuration change time</div>
                                            <div className="header-col w400px">Configuration checksum</div>
                                            <div className="header-col w200px">Data table name</div>
                                            <div className="header-col w100px">Status</div>
                                            <div className="header-col w100px"></div>
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
            </div>
        </Modal>
    )
}