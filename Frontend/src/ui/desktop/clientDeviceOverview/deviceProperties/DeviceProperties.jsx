import React from 'react';
import Modal from 'react-bootstrap4-modal';

export default function () {
  var { curItem } = this.state;
  return (
    <React.Fragment>
      <Modal visible={true} className="device-properties" dialogClassName="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-header">
          <h5 className="modal-title">Device: {curItem.name}</h5>
          <button type="button" onClick={this.props.onCloseDeviceProperties.bind(this)} className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <div className="content">
            <h2>Device Characteristics </h2>
            <div className="lists">
              <div className="body">
                <div className="body-row">
                  <div className="body-col width30">Data Collection:</div>
                  <div className="body-col width70"><p>{curItem.data_collection == 1 ? <span className="round on"></span> : <span className="round off"></span>}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Product Group:</div>
                  <div className="body-col width70"><p>{curItem.product_group}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Serial Number:</div>
                  <div className="body-col width70"><p>{curItem.serial_number}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">IP address:</div>
                  <div className="body-col width70"><p>{curItem.ip}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Manufacturer:</div>
                  <div className="body-col width70"><p>{curItem.manufacturer}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Device Name:</div>
                  <div className="body-col width70"><p>{curItem.name}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Description:</div>
                  <div className="body-col width70"><p>{curItem.description}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Irradiation sensor connected:</div>
                  <div className="body-col width70"><p>{curItem.irradiation_sensor == 1 ? <span className="round on"></span> : <span className="round off"></span>}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Module temperature sensor connected:</div>
                  <div className="body-col width70"><p>{curItem.module_temperatur_sensor == 1 ? <span className="round on"></span> : <span className="round off"></span>}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Outside temperature sensor connected:</div>
                  <div className="body-col width70"><p>{curItem.outsite_temerature_sensor == 1 ? <span className="round on"></span> : <span className="round off"></span>}</p></div>
                </div>
              </div>
            </div>

            <h2 className="title-sub">Communication Monitoring </h2>

            <div className="lists">
              <div className="body">
                <div className="body-row">
                  <div className="body-col width30">Monitoring:</div>
                  <div className="body-col width70"><p>{curItem.monitoring == 1 ? <span className="round on"></span> : <span className="round off"></span>}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Alarm after:</div>
                  <div className="body-col width70"><p>{curItem.alarm_after}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Interval:</div>
                  <div className="body-col width70"><p>{curItem.interval}</p></div>
                </div>

                <div className="body-row">
                  <div className="body-col width30">Time Span:</div>
                  <div className="body-col width70"><p>{curItem.time_span}</p></div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}