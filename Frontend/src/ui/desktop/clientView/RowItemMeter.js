import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class RowItemMeter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li className="col-md-12">
                <div className="item">
                    <NavLink to={"/analysis/quick/" + item.id}>
                        <div className="row">
                            <div className="col-md-7">{item.name}</div>
                            <div className="col-md-5 text-right"><strong>{item.value}</strong> {item.label}</div>
                        </div>
                    </NavLink>
                </div>
            </li>
        );
    }
}

export default RowItemMeter;
