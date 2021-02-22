import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        var classThisMonth = item.eer_this_month > 70 ? 'green' : (item.eer_this_month > 50 ? "yellow" : "red");
        var classLastMonth = item.eer_last_month > 70 ? 'green' : (item.eer_last_month > 50 ? "yellow" : "red");
        var itemAlerts = null;
        if (!Libs.isBlank(item.alert_list)) {
            var data = JSON.parse(item.alert_list);
            data.sort((a, b) => b['id'] - a['id'])

            if (Libs.isArrayData(data)) {
                itemAlerts = data.map((itemAlert, index) => {
                    return (
                        <li key={index}>
                            <div className="item">
                                <NavLink to={"/client/alerts/" + item.id + "/" + itemAlert.id}>
                                    <p>{itemAlert.start_date} - Device {itemAlert.device_name}</p>
                                    <p>{itemAlert.message}</p>
                                </NavLink>
                            </div>
                        </li>
                    );
                })
            }

        }
        return (
            <div className="item-row">
                <div className="item-col width31 text-left">
                    <p className="name">
                        <NavLink to={"/client/" + item.id} >{item.name}</NavLink>
                        <NavLink className="mini_site" to={"/minisite/" + item.id} target="_blank" >Mini site</NavLink>
                    </p>
                    <p className="address">{item.address_short}</p>
                </div>
                <div className="item-col width5 text-center"><div className="middle"><span><img src="/assets/images/charting-tool-icon.png" /></span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>
                    {item.total_error == 0 ?
                        <img src="/assets/images/no-open-alerts-icon.png" /> :
                        <NavLink to={"/client/alerts/" + item.id}><div className="error_main"><img src="/assets/images/device-fault-icon.png" /> <var>{item.total_error}</var>
                            {itemAlerts ?
                                <div className="error_list">
                                    <div className="error-header"><NavLink to={"/client/alerts/" + item.id}>{item.total_error} Open Alert{item.total_error > 1 ? "s" : ''}</NavLink></div>
                                    <ul>
                                        {itemAlerts}
                                    </ul>
                                </div>
                                : ''}

                        </div></NavLink>}
                </span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>{Libs.formatElectricalPowerUnit(item.dc_capacity)}</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>{Libs.formatElectricalPowerUnit(item.watts_3ph_total)}</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>{item.sensor1_data} W/m2</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>{Libs.formatElectricalPowerUnit(item.today_kwh, 'h')}</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>{Libs.formatElectricalPowerUnit(item.w_hours_received, 'h')}</span></div></div>
                <div className="item-col width8 text-center">
                    <div className="middle">
                        {!Libs.isBlank(item.eer_last_month) && item.eer_last_month > 0 ?
                            <span>
                                <div className={"progress_bar " + classLastMonth}>
                                    <div style={{ width: item.eer_last_month + "%" }}>
                                    </div>
                                </div> {item.eer_last_month}%</span>

                            : <span>-</span>}
                    </div>
                </div>
                <div className="item-col width8 text-center">
                    <div className="middle">
                        {!Libs.isBlank(item.eer_this_month) && item.eer_this_month > 0 ?
                            <span>
                                <div className={"progress_bar " + classThisMonth}>
                                    <div style={{ width: item.eer_this_month + "%" }}>
                                    </div>
                                </div> {item.eer_this_month}%</span>

                            : <span>-</span>}

                    </div>
                </div>
            </div>
        );
    }
}
export default RowItem;
