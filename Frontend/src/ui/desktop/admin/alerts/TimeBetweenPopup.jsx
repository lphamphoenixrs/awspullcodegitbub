/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { RButton } from '../../../../component/Controls';
import FLDatePicker from '../../../../component/FLDatePicker/FLDatePicker';
export default function () {
    var { curItem } = this.state;
    return (
        <Modal visible={true} className="modal-calendar" dialogClassName="modal-lg modal-dialog-centered">
            <div className="modal-header">
                <div className="header-content">
                    <h5 className="modal-title">Date range</h5>
                </div>
            </div>

            <div className="modal-body">
                <div class="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <FLDatePicker
                            value={curItem.date_from}
                            inputId="date_from"
                            dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                            inputClass=""
                            inputName="date_from"
                            maxDate={curItem.max_date}
                            minDate = {curItem.min_date}
                            handleChange={this.handleDateInputChange.bind(this)}
                            maxLength={20}
                            monthsShown={1}
                            dropdownMode="select"
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            inline={true}
                        />

                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <FLDatePicker
                            value={curItem.date_to}
                            inputId="date_to"
                            minDate = {curItem.min_date}
                            dateFormat={!Libs.isBlank(curItem.localization_format) ? curItem.localization_format : "MM/dd/yyyy"}
                            inputClass=""
                            inputName="date_to"
                            maxDate={curItem.max_date}
                            handleChange={this.handleDateInputChange.bind(this)}
                            maxLength={20}
                            dropdownMode="select"
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            monthsShown={1}
                            inline={true}
                        />
                    </div>

                </div>
            </div>
            <div className="modal-footer">
                <RButton onClick={this.props.onCloseTimeBetweenPopup.bind(this)} className="btn btn-cancel" text="Cancel" title="Cancel" />
                <RButton onClick={this.onSetTimeAction.bind(this)} className="btn btn-save" text="Ok" title="Ok" />
            </div>
        </Modal>
    )
}