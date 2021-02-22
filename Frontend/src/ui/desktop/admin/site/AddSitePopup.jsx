/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { RText, RButton, RTextArea, RNumber } from '../../../../component/Controls';
import FLDatePicker from '../../../../component/FLDatePicker/FLDatePicker';
import FLSelect from '../../../../component/FLSelect';
import Libs from '../../../../utils/Libs';
export default function () {
    var { curItem, listCustomer, dataListTimeZone, dataListCountry, listSiteType, msgError } = this.state;
    var positionCenter = {
        lat: !Libs.isBlank(curItem.lat) ? parseFloat(curItem.lat) : 38.609784, 
        lng: !Libs.isBlank(curItem.lng) ? parseFloat(curItem.lng) : -103.514553
    };

    return (
        <Modal visible={true} className="modal-site" dialogClassName="modal-xl modal-dialog-scrollable">
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode == Constants.SCREEN_MODE.EDIT) ? trans.translate('SITE.label_edit') : trans.translate('SITE.label_add')}
                </h5>
                <button type="button" onClick={this.onCloseAddSitePopup.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <div className="add-user-content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <RText label={trans.translate('SITE.name')}
                                            required="required" inputClass="form-control"
                                            inputId="name" inputName="name"
                                            value={curItem.name}
                                            onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                            maxLength={200} />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <FLSelect
                                            id="id_customer"
                                            required="required"
                                            className="id_customer"
                                            name="id_customer"
                                            options={listCustomer}
                                            label={trans.translate('SITE.id_customer')}
                                            selectedValue={curItem.id_customer}
                                            onSelect={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                            placeholderText={trans.translate('common.choose')}
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <FLSelect
                                            id="id_time_zone"
                                            required="required"
                                            className="id_time_zone"
                                            name="id_time_zone"
                                            options={dataListTimeZone}
                                            label={trans.translate('SITE.id_time_zone')}
                                            selectedValue={curItem.id_time_zone}
                                            onSelect={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                            placeholderText={trans.translate('common.choose')}
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <FLSelect
                                            id="id_site_type"
                                            required="required"
                                            className="id_site_type"
                                            name="id_site_type"
                                            options={listSiteType}
                                            label={trans.translate('SITE.id_site_type')}
                                            selectedValue={curItem.id_site_type}
                                            onSelect={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                            placeholderText={trans.translate('common.choose')}
                                        />
                                    </div>
                                </div>

                                

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <FLDatePicker
                                            label={trans.translate('SITE.built_since')}
                                            value={curItem.built_since}
                                            inputId="built_since"
                                            required="required"
                                            inputClass="form-control"
                                            inputName="built_since"
                                            handleChange={(e) => { this.handleDateInputChange(e); this.validateOne(e) }}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <FLDatePicker
                                            label={trans.translate('SITE.commissioning')}
                                            value={curItem.commissioning}
                                            inputId="commissioning"
                                            required="required"
                                            inputClass="form-control"
                                            inputName="commissioning"
                                            handleChange={(e) => { this.handleDateInputChange(e); this.validateOne(e) }}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <RNumber
                                            label={trans.translate('SITE.dc_capacity')}
                                            inputClass="form-control"
                                            inputId="dc_capacity" inputName="dc_capacity"
                                            value={curItem.dc_capacity}
                                            onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                            pattern="^[0-9]*$"
                                            maxLength={20} />
                                    </div>
                                </div>


                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <RNumber
                                            label={trans.translate('SITE.ac_capacity')}
                                            inputClass="form-control"
                                            inputId="ac_capacity" inputName="ac_capacity"
                                            value={curItem.ac_capacity}
                                            onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                            pattern="^[0-9]*$"
                                            maxLength={20} />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <RTextArea inputClass="form-control"
                                            label={trans.translate('SITE.emergency_contact')}
                                            inputName="emergency_contact"
                                            onChange={this.handleInputChange.bind(this)}
                                            value={curItem.emergency_contact}
                                            maxLength={500}
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <RTextArea inputClass="form-control"
                                            label={trans.translate('SITE.old_data')}
                                            inputName="old_data"
                                            onChange={this.handleInputChange.bind(this)}
                                            value={curItem.old_data}
                                            maxLength={500}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label className="control-label">{trans.translate('SITE.gallery')}</label>
                                        {Libs.isArrayData(msgError) ?
                                            <div className="alert alert-danger">
                                                <p>{msgError}</p>
                                            </div>
                                            : ''}
                                        <div className="image-gallery">
                                            <ul className="row">
                                                <li key={2} className="col-md-4">
                                                    <div className="item item-add">
                                                        <label htmlFor="gallery" className="add">
                                                            <span className="icon-picture-o"></span>
                                                            <input type="file" id="gallery" name="gallery" onChange={(event) => this.onFileChange(event)} />
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
                                                    : (!Libs.isBlank(curItem.gallery) ?
                                                        <li key={1} className="col-md-4">
                                                            <div className="item">
                                                                <div className="img">
                                                                    <img src={Constants.SERVER_DATA + curItem.gallery} />
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

                        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
                            <div className="setting_content">
                                <div className="row">

                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <LoadScript googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
                                                <GoogleMap id='view-map' zoom={5} center={positionCenter} >
                                                    <Marker position={positionCenter} />
                                                </GoogleMap>
                                            </LoadScript>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                required="required"
                                                label={trans.translate('SITE.lat')}
                                                inputClass="form-control"
                                                inputId="lat" inputName="lat"
                                                value={curItem.lat}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                pattern="^[0-9.-]*$"
                                                maxLength={100} />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                label={trans.translate('SITE.lng')}
                                                required="required"
                                                inputClass="form-control"
                                                inputId="lng" inputName="lng"
                                                value={curItem.lng}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                pattern="^[0-9.-]*$"
                                                maxLength={40} />
                                        </div>
                                    </div>


                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <FLSelect
                                                id="id_country"
                                                required="required"
                                                className="id_country"
                                                name="id_country"
                                                options={dataListCountry}
                                                selectedValue={curItem.id_country}
                                                label={trans.translate('SITE.country')}
                                                onSelect={(e) => { this.handleInputChange(e); this.validateOne(e) }}
                                                placeholderText={trans.translate('common.choose')}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                label={trans.translate('SITE.number')}
                                                inputClass="form-control"
                                                inputId="number" inputName="number"
                                                value={curItem.number}
                                                onChange={(e) => { this.handleInputChange(e); }}
                                                maxLength={100} />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                label={trans.translate('SITE.street')}
                                                inputClass="form-control"
                                                inputId="street" inputName="street"
                                                value={curItem.street}
                                                onChange={(e) => { this.handleInputChange(e); }}
                                                maxLength={100} />
                                        </div>
                                    </div>


                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                label={trans.translate('SITE.postal_code')}
                                                inputClass="form-control"
                                                inputId="postal_code" inputName="postal_code"
                                                value={curItem.postal_code}
                                                onChange={(e) => { this.handleInputChange(e); }}
                                                maxLength={40} />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                label={trans.translate('SITE.city')}
                                                inputClass="form-control"
                                                inputId="city" inputName="city"
                                                value={curItem.city}
                                                onChange={(e) => { this.handleInputChange(e); }}
                                                maxLength={40} />
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <RText
                                                label={trans.translate('SITE.state_province')}
                                                inputClass="form-control"
                                                inputId="state" inputName="state"
                                                value={curItem.state}
                                                onChange={(e) => { this.handleInputChange(e); }}
                                                maxLength={40} />
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <RButton onClick={this.onSaveAction.bind(this)} className="btn btn-save"
                    text={(curItem.screen_mode == Constants.SCREEN_MODE.EDIT) ? " " + trans.translate('common.label_update') : " " + trans.translate('common.label_save')}
                    title={(curItem.screen_mode == Constants.SCREEN_MODE.EDIT) ? trans.translate('common.label_update') : trans.translate('common.label_save')} />
            </div>
        </Modal>
    )
}