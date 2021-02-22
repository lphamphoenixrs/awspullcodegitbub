
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function () {
  var { curItem, curDetail } = this.state;

  return (
    <section className="client-alert">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
              <li className="breadcrumb-item"><NavLink to={"/client/" + curItem.id}>{curItem.name}</NavLink></li>
            </ol>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="title">Alert details</div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="alert-detail">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <table className="table table-bordered table-striped table-hover">
                    <tbody>
                      <tr>
                        <td>Plant</td>
                        <td>{curDetail.site_name}</td>
                      </tr>
                      <tr>
                        <td>Device</td>
                        <td>{curDetail.devicename}</td>
                      </tr>
                      <tr>
                        <td>Erroe code</td>
                        <td>{curDetail.error_code}</td>
                      </tr>
                      <tr>
                        <td>Error message</td>
                        <td>{curDetail.message}</td>
                      </tr>
                      <tr>
                        <td>Severity</td>
                        <td>{curDetail.level}</td>
                      </tr>
                      <tr>
                        <td>Activation Time</td>
                        <td>{curDetail.start_date}</td>
                      </tr>
                      <tr>
                        <td>Deactivation Date</td>
                        <td>{curDetail.end_date}</td>
                      </tr>
                      <tr>
                        <td>Total Incident Time</td>
                        <td>{curDetail.duration}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}