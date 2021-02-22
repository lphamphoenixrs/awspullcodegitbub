import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // var item = this.props.dataItem;
        return (
            <div className="item-row">
                <div className="item-col width31 text-left">
                    <p className="name">
                        <NavLink to="/client/2a56697349666d444242454b772b71513d" >! Barstow, Nebo - Nebo</NavLink>
                        <NavLink className="mini_site" to="/minisite/2a56697349666d444242454b772b71513d" target="_blank" >Mini site</NavLink>
                    </p>
                    <p className="address">Barstow, CA</p>
                </div>
                <div className="item-col width5 text-center"><div className="middle"><span><img src="/assets/images/charting-tool-icon.png" /></span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>
                    <img src="/assets/images/device-fault-icon.png" />
                    <img src="/assets/images/zero-gen-icon.png" />
                    <img src="/assets/images/perf-yield-icon.png" />
                    <img src="/assets/images/system-disconnect-icon.png" />
                </span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>385.8 kW</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>0 kW</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>0 W/m2</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>2 MWh</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span>3 GWh</span></div></div>
                <div className="item-col width8 text-center"><div className="middle"><span><div className="progress_bar green"><div style={{ width: "85.56769690550883%" }}></div></div> 86%</span></div>  </div>
                <div className="item-col width8 text-center"><div className="middle"><span><div className="progress_bar green"><div style={{ width: "95%" }}></div></div> 95%</span></div> </div>
            </div>
        );
    }
}
export default RowItem;
