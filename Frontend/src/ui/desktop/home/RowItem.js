import React, { Component } from 'react';

class RowItemProject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <tr key={this.props.index}>
                <th>{item.time}</th>
                <td>{item.error}</td>
                <td>{item.low_alarm}</td>
                <td>{item.high_alarm}</td>
                <td>{item.ion6200_kwh}</td>
                <td>{item.ion6200_demand_kw}</td>
            </tr>
        );
    }
}
export default RowItemProject;
