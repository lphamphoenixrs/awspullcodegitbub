import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../../utils/Libs';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row">
                <div className="body-col width10 text-center">
                    <p className="alert-count">
                        {!Libs.isBlank(item.total_error) && item.total_error > 0 ?
                            <NavLink to={"/management/alerts/"+item.id} onMouseOver={this.props._onMouseOver.bind(this, this.props.index)} onMouseOut = {this.props._onMouseOut.bind(this, this.props.index)} ><img src={"/assets/images/" + item.icon_alert} style={{ width: "20px" }} /> <span>{item.total_error <= 99 ? item.total_error : (item.total_error + "+")}</span></NavLink>
                            : <NavLink to={"/management/alerts/"+item.id} ><img src="/assets/images/greencheck.png" style={{ width: "20px" }} /></NavLink>}
                    </p>
                </div>
                <div className="body-col width35">
                    <p><strong>{item.name}</strong></p>
                </div>
                <div className="body-col width15">
                    <p>{!Libs.isBlank(item.dc_capacity) ? item.dc_capacity : 0} KW</p>
                </div>

                <div className="body-col width15">
                    <p>{(!Libs.isBlank(item.energy_now) && item.energy_now > 0) ? item.energy_now : 0} KW</p>
                </div>
                <div className="body-col width10 text-center">
                    <p>
                        {!Libs.isBlank(item.weather_icon) ?
                            <img src={"/assets/images/" + item.weather_icon + ".png"} alt={item.weather_description} title={item.weather_description} style={{ width: "30px" }} /> :
                            <span className="unknown">
                                <var>CNC</var>
                                <img src="/assets/images/unknown.png" style={{ width: "30px" }} />
                                <i>Could not caculate</i>
                            </span>
                        }
                    </p>
                </div>

                <div className="body-col width15fix">
                    <p>{!Libs.isBlank(item.irradiance) ? item.irradiance : 0}</p>
                </div>

            </div>
        );
    }
}
export default RowItem;
