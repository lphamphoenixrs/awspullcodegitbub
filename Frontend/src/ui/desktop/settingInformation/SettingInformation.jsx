import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Libs from '../../../utils/Libs';
import { RText, RButton, RNumber, RTextArea } from '../../../component/Controls';
import FLSelect from '../../../component/FLSelect';
import FLDatePicker from '../../../component/FLDatePicker/FLDatePicker';
import Constants from '../../../utils/Constants';

export default function () {
  var { curItem, dataListTimeZone, dataListCountry, listSiteType, msgErrorGallery } = this.state;
  var positionCenter = {
    lat: !Libs.isBlank(curItem.lat) ? curItem.lat: 38.609784, lng: !Libs.isBlank(curItem.lng) ? curItem.lat : -103.514553
  };


  return (
    <section className="setting">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                <li className="breadcrumb-item"><NavLink to={"/client/" + curItem.id}>{curItem.name}</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">Settings information</li>
              </ol>
            </nav>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="title">{trans.translate('SETTINGS.site_settings')}</div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="information_content">

              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="group_info">
                    <h2>General Description</h2>
                    <div className="setting_content">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.site_name')}
                              inputClass="form-control"
                              inputId="site_name" inputName="site_name"
                              value={curItem.name}
                              disabled={true}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={100} />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <FLDatePicker
                              label={trans.translate('SETTINGS.commissioning')}
                              value={curItem.commissioning}
                              inputId="commissioning"
                              inputClass="form-control"
                              inputName="commissioning"
                              maxDate={curItem.max_date}
                              handleChange={(e) => { this.handleInputChange(e); }}
                              maxLength={10}
                            />
                          </div>
                        </div>


                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <FLDatePicker
                              label={trans.translate('SETTINGS.built_since')}
                              value={curItem.built_since}
                              inputId="built_since"
                              inputClass="form-control"
                              inputName="built_since"
                              maxDate={curItem.max_date}
                              handleChange={(e) => { this.handleInputChange(e); }}
                              maxLength={10}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div className="form-group">
                            <label className="control-label">{trans.translate('SETTINGS.image_gallery')}</label>
                            {Libs.isArrayData(msgErrorGallery) ?
                              <div className="alert alert-danger">
                                <p>{msgErrorGallery}</p>
                              </div>
                              : ''}
                            <div className="image-gallery">
                              <ul className="row">
                                <li key={2} className="col-md-4">
                                  <div className="item item-add">
                                    <label htmlFor="upload_gallery" className="add">
                                      <span className="icon-picture-o"></span>
                                      <input type="file" id="upload_gallery" name="upload_image" multiple="multiple" onChange={(event) => this.onFileGalleryChange(event)} />
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

                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div className="form-group">
                            <RTextArea inputClass="form-control"
                              label={trans.translate('SETTINGS.emergency_contact')}
                              inputName="emergency_contact"
                              onChange={this.handleInputChange.bind(this)}
                              value={curItem.emergency_contact}
                              maxLength={500}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="group_info">
                    <h2>{trans.translate('SETTINGS.technical_description')}</h2>
                    <div className="setting_content">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div className="form-group">
                            <FLSelect
                              id="site_type"
                              className="site_type"
                              name="site_type"
                              options={listSiteType}
                              label={trans.translate('SETTINGS.site_type')}
                              selectedValue={curItem.id_site_type}
                              onChange={(e) => { this.handleInputChange(e); }}
                              placeholderText={trans.translate('common.choose')}
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RNumber
                              label={trans.translate('SETTINGS.dc_capacity')}
                              inputClass="form-control"
                              inputId="dc_capacity" inputName="dc_capacity"
                              value={curItem.dc_capacity}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={20} />
                          </div>
                        </div>


                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RNumber
                              label={trans.translate('SETTINGS.ac_capacity')}
                              inputClass="form-control"
                              inputId="ac_capacity" inputName="ac_capacity"
                              value={curItem.ac_capacity}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={20} />
                          </div>
                        </div>



                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div className="form-group">
                            <RTextArea inputClass="form-control"
                              label={trans.translate('SETTINGS.old_data')}
                              inputName="old_data"
                              onChange={this.handleInputChange.bind(this)}
                              value={curItem.old_data}
                              maxLength={500}
                              rows={6}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="group_info">
                    <div className="setting_content">
                      <div className="row">

                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div className="form-group">
                            <LoadScript googleMapsApiKey={Constants.GOOLGE_APP.KEY} >
                              <GoogleMap id='view-map' zoom={5} center={positionCenter} >
                                <Marker position={positionCenter} />
                              </GoogleMap>
                            </LoadScript>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.lat')}
                              inputClass="form-control"
                              inputId="lat" inputName="lat"
                              value={curItem.lat}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={100} />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.lng')}
                              inputClass="form-control"
                              inputId="lng" inputName="lng"
                              value={curItem.lng}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={40} />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <FLSelect
                              id="id_time_zone"
                              className="id_time_zone"
                              name="id_time_zone"
                              options={dataListTimeZone}
                              selectedValue={curItem.id_time_zone}
                              label={trans.translate('SETTINGS.time_zone')}
                              onChange={(e) => { this.handleInputChange(e); }}
                              placeholderText={trans.translate('common.choose')}
                            />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <FLSelect
                              id="id_country"
                              className="id_country"
                              name="id_country"
                              options={dataListCountry}
                              selectedValue={curItem.id_country}
                              label={trans.translate('SETTINGS.country')}
                              onChange={(e) => { this.handleInputChange(e); }}
                              placeholderText={trans.translate('common.choose')}
                            />
                          </div>
                        </div>



                        <div className="col-xl-12 col-lg-6 col-md-12">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.street')}
                              inputClass="form-control"
                              inputId="street" inputName="street"
                              value={curItem.street}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={100} />
                          </div>
                        </div>


                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.number')}
                              inputClass="form-control"
                              inputId="number" inputName="number"
                              value={curItem.number}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={100} />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.postal_code')}
                              inputClass="form-control"
                              inputId="postal_code" inputName="postal_code"
                              value={curItem.postal_code}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={40} />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.city')}
                              inputClass="form-control"
                              inputId="city" inputName="city"
                              value={curItem.city}
                              onChange={(e) => { this.handleInputChange(e); }}
                              maxLength={40} />
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="form-group">
                            <RText
                              label={trans.translate('SETTINGS.state_province')}
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


                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="box-footer">
                    <RButton className="btn btn-save"
                      onClick={this.onSaveAction.bind(this)}
                      text={" " + trans.translate('common.label_save')}
                      title={trans.translate('common.label_save')} />
                  </div>
                </div>








              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}